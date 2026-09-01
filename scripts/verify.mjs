/**
 * Browser verification for the site.
 *
 *   node scripts/verify.mjs            # against http://localhost:3000
 *   BASE=https://... node scripts/verify.mjs
 *
 * Asserts the things that were actually broken before, so they stay fixed:
 * content present on first paint, zero console errors, no contrast or a11y
 * violations, a visible focus ring, and no animation under reduced motion.
 * Screenshots land in .verify/.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", ".verify");
const AXE = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";

const ROUTES = [
  ["home", ""],
  ["projects", "/projects"],
  ["about", "/about"],
  ["contact", "/contact"],
];
const VIEWPORTS = [
  ["mobile", 390, 844],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
];

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`  FAIL  ${msg}`);
};
const pass = (msg) => console.log(`  ok    ${msg}`);

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

/* 1 ─ Content is in the DOM immediately (the blank-screen regression) */
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/tr`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  const h1 = page.locator("h1").first();
  const visible = await h1.isVisible().catch(() => false);
  const text = visible ? (await h1.innerText()).trim() : "";
  if (visible && text.length > 0) pass(`h1 visible 300ms after load: "${text.split("\n")[0]}"`);
  else fail("h1 not visible 300ms after load — content is being gated again");

  const ssr = await fetch(`${BASE}/tr`).then((r) => r.text());
  if (ssr.includes("<h1")) pass("h1 present in server-rendered HTML");
  else fail("h1 missing from server HTML — page is client-only again");
  if (/<html[^>]*lang="tr"/.test(ssr)) pass('server HTML has lang="tr"');
  else fail("server HTML is missing the correct lang attribute");

  const en = await fetch(`${BASE}/en`).then((r) => r.text());
  if (/<html[^>]*lang="en"/.test(en)) pass('/en serves lang="en"');
  else fail("/en does not serve lang=\"en\"");
  if (/<meta name="description"/.test(en)) pass("meta description present");
  else fail("meta description missing");
}

/* 1b ─ SEO surface */
{
  const check = async (path, locale) => {
    const html = await fetch(`${BASE}${path}`).then((r) => r.text());
    const has = (re, what) =>
      re.test(html) ? pass(`${what} · ${path}`) : fail(`${what} missing on ${path}`);

    has(/<title>[^<]{10,}<\/title>/, "title");
    has(/<meta name="description" content="[^"]{50,}"/, "description");
    has(new RegExp(`<link rel="canonical" href="[^"]*${path}"`), "canonical");
    has(/hreflang="x-default"/i, "x-default hreflang");
    has(/hreflang="tr"/i, "tr hreflang");
    has(/hreflang="en"/i, "en hreflang");
    has(/<meta property="og:title"/, "og:title");
    has(/<meta property="og:image"/, "og:image");
    has(/<meta name="twitter:card"/, "twitter:card");
    has(new RegExp(`<html[^>]*lang="${locale}"`), "html lang");
    has(/<h1[^>]*>/, "h1");
  };

  await check("/tr", "tr");
  await check("/en/projects", "en");

  const home = await fetch(`${BASE}/tr`).then((r) => r.text());
  const blocks = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (blocks.length === 0) {
    fail("no JSON-LD on /tr");
  } else {
    for (const [, raw] of blocks) {
      try {
        const parsed = JSON.parse(raw);
        const types = JSON.stringify(parsed);
        if (types.includes("Person") && types.includes("WebSite")) {
          pass("JSON-LD Person + WebSite parse cleanly");
        } else {
          fail(`JSON-LD present but missing Person/WebSite: ${types.slice(0, 80)}`);
        }
      } catch (error) {
        fail(`JSON-LD does not parse: ${error.message}`);
      }
    }
  }

  const projects = await fetch(`${BASE}/tr/projects`).then((r) => r.text());
  const projectBlocks = [
    ...projects.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map(([, raw]) => JSON.parse(raw));
  const itemList = projectBlocks.find((block) => block["@type"] === "ItemList");
  if (itemList && itemList.itemListElement.length > 0) {
    pass(`projects expose an ItemList of ${itemList.itemListElement.length}`);
  } else {
    fail("projects page has no ItemList structured data");
  }

  for (const [path, expect] of [
    ["/robots.txt", /Sitemap:/],
    ["/sitemap.xml", /<loc>.*\/tr<\/loc>/],
    ["/manifest.webmanifest", /"start_url"/],
    ["/icon.svg", /<svg/],
  ]) {
    const body = await fetch(`${BASE}${path}`).then((r) => r.text());
    if (expect.test(body)) pass(`${path} served`);
    else fail(`${path} is missing or malformed`);
  }

  const missing = await fetch(`${BASE}/tr/does-not-exist`);
  if (missing.status === 404) pass("unknown page returns 404");
  else fail(`unknown page returned ${missing.status}`);
}

/* 2 ─ Screenshots, console errors, and axe across every page */
for (const [tag, width, height] of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  for (const locale of ["tr", "en"]) {
    for (const [name, path] of ROUTES) {
      await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(700);

      if (locale === "tr") {
        await page.screenshot({ path: `${OUT}/${tag}-${name}.png`, fullPage: true });
      }

      await page.addScriptTag({ url: AXE });
      const result = await page.evaluate(async () =>
        // eslint-disable-next-line no-undef
        await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
        }),
      );
      const violations = result.violations.filter((v) => v.impact !== "minor");
      if (violations.length === 0) {
        pass(`axe clean · ${tag} /${locale}${path}`);
      } else {
        for (const v of violations) {
          fail(`axe [${v.impact}] ${v.id} on ${tag} /${locale}${path} — ${v.nodes.length}× ${v.help}`);
          for (const node of v.nodes.slice(0, 2)) {
            console.log(`        ${node.target.join(" ")}`);
          }
        }
      }
    }
  }

  if (errors.length === 0) pass(`no console errors · ${tag}`);
  else errors.forEach((e) => fail(`console · ${tag} · ${e}`));

  await context.close();
}

/* 3 ─ Focus ring is actually visible */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/tr`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const s = getComputedStyle(el);
    return { width: s.outlineWidth, style: s.outlineStyle, tag: el.tagName };
  });
  if (outline && outline.style !== "none" && parseFloat(outline.width) >= 1) {
    pass(`focus ring visible on first tab stop (${outline.tag}, ${outline.width})`);
  } else {
    fail(`no visible focus ring on first tab stop: ${JSON.stringify(outline)}`);
  }
  await page.close();
}

/* 4 ─ Reduced motion is honoured */
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/tr`, { waitUntil: "domcontentloaded" });
  const longest = await page.evaluate(() =>
    Math.max(
      0,
      ...[...document.querySelectorAll("*")].map((el) => {
        const d = getComputedStyle(el).animationDuration;
        return d === "none" ? 0 : Math.max(...d.split(",").map((v) => parseFloat(v) || 0));
      }),
    ),
  );
  if (longest <= 0.01) pass("reduced motion: no animation runs");
  else fail(`reduced motion: animation still running for ${longest}s`);

  await page.waitForTimeout(200);
  const opacity = await page.locator("h1").first().evaluate((el) => getComputedStyle(el).opacity);
  if (parseFloat(opacity) > 0.99) pass("reduced motion: h1 fully opaque");
  else fail(`reduced motion: h1 opacity is ${opacity}`);

  await context.close();
}

await browser.close();

console.log("");
if (failures.length) {
  console.log(`${failures.length} failure(s).`);
  process.exit(1);
}
console.log(`All checks passed. Screenshots in ${OUT}`);
