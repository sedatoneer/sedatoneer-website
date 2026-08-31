import type { Locale, SchematicId } from "@/content/types";
import { Frame, Box, Arrow, Caption, LINE } from "./kit";

type Copy = Record<Locale, string>;
const pick = (c: Copy, l: Locale) => c[l];

/* ── NAC System — RADIUS AAA path ───────────────────────────── */

function NacSystem({ locale }: { locale: Locale }) {
  const t = (tr: string, en: string) => pick({ tr, en }, locale);
  return (
    <Frame width={760} height={300} title={t("RADIUS AAA akış şeması", "RADIUS AAA flow diagram")}>
      <Box x={0} y={30} w={120} label={t("İstemci", "Client")} sub="802.1X" />
      <Box x={170} y={30} w={130} label={t("NAS / Switch", "NAS / Switch")} sub="RADIUS client" />
      <Box x={350} y={30} w={140} label="FreeRADIUS" sub={t("kimlik doğrulama", "authentication")} />
      <Box x={540} y={30} w={150} label="Policy Engine" sub="FastAPI" accent />

      <Arrow d="M 120 53 L 165 53" accent />
      <Caption x={116} y={20} accent anchor="start">
        {t("Access-Request", "Access-Request")}
      </Caption>
      <Arrow d="M 300 53 L 345 53" />
      <Arrow d="M 490 53 L 535 53" />

      {/* Stores */}
      <Box x={350} y={150} w={140} label="PostgreSQL" sub={t("kimlikler, cihazlar", "identities, devices")} />
      <Box x={540} y={150} w={150} label="Redis" sub={t("oturumlar, sayaçlar", "sessions, counters")} />

      <path d="M 420 76 L 420 150" stroke={LINE} strokeWidth={1} fill="none" />
      <path d="M 615 76 L 615 150" stroke={LINE} strokeWidth={1} fill="none" />

      {/* Decision returns to the switch */}
      <Arrow d="M 615 196 L 615 250 L 235 250 L 235 76" accent />
      <Caption x={425} y={241} accent>
        {t("Access-Accept · VLAN ataması", "Access-Accept · VLAN assignment")}
      </Caption>

      <Caption x={0} y={288} anchor="start">
        {t("RFC 2865 / 2866 · 35 birim testi", "RFC 2865 / 2866 · 35 unit tests")}
      </Caption>
    </Frame>
  );
}

/* ── AutoHeal — closed repair loop ──────────────────────────── */

function AutoHeal({ locale }: { locale: Locale }) {
  const t = (tr: string, en: string) => pick({ tr, en }, locale);
  return (
    <Frame width={820} height={280} title={t("AutoHeal onarım döngüsü", "AutoHeal repair loop")}>
      <Box x={0} y={20} w={150} label={t("Test kırılır", "Test fails")} sub="Playwright" accent />
      <Box x={210} y={20} w={160} label={t("DOM anlık görüntüsü", "DOM snapshot")} />
      <Box x={430} y={20} w={160} label={t("Hata bağlamı", "Failure context")} />
      <Box x={620} y={20} w={200} label="LLM" sub="OpenAI · Anthropic · Ollama" />

      <Arrow d="M 150 43 L 205 43" />
      <Arrow d="M 370 43 L 425 43" />
      <Arrow d="M 590 43 L 615 43" />

      {/* down the right side */}
      <Arrow d="M 720 66 L 720 150" />

      <Box x={620} y={150} w={200} label={t("AST yaması", "AST patch")} sub="ts-morph" />
      <Box x={350} y={150} w={190} label={t("Testi yeniden koş", "Re-run the test")} />
      <Box x={70} y={150} w={190} label={t("Doğrulandı", "Verified")} sub={t("yeşilse dur", "stop when green")} accent />

      <Arrow d="M 615 173 L 545 173" />
      <Arrow d="M 345 173 L 265 173" />

      {/* loop back while the test is still red */}
      <Arrow d="M 165 196 L 165 245 L 720 245 L 720 200" dashed />
      <Caption x={445} y={237}>
        {t("hâlâ kırıksa tekrar dene", "retry while still failing")}
      </Caption>
    </Frame>
  );
}

/* ── NAC Gap Analyzer — scan, classify, simulate ────────────── */

function NacGapAnalyzer({ locale }: { locale: Locale }) {
  const t = (tr: string, en: string) => pick({ tr, en }, locale);
  const tiers = [
    { y: 30, label: t("yüksek risk", "high risk"), accent: true },
    { y: 95, label: t("orta risk", "medium risk"), accent: false },
    { y: 160, label: t("düşük risk", "low risk"), accent: false },
  ];

  return (
    <Frame width={980} height={250} title={t("Ağ analiz akışı", "Network analysis flow")}>
      <Box x={0} y={95} w={120} label={t("Alt ağ", "Subnet")} sub="CIDR" />
      <Box x={160} y={95} w={140} label={t("Tarama", "Scan")} sub="ARP · port · mDNS" />
      <Box x={340} y={95} w={140} label={t("Parmak izi", "Fingerprint")} sub={t("cihaz sınıfı", "device class")} />

      <Arrow d="M 120 118 L 155 118" />
      <Arrow d="M 300 118 L 335 118" />

      {tiers.map((tier) => (
        <g key={tier.label}>
          <Box x={520} y={tier.y} w={140} h={40} label={tier.label} accent={tier.accent} />
          {/* fan out by risk level, then converge on the policy decision */}
          <Arrow
            d={`M 480 118 C 500 118, 500 ${tier.y + 20}, 515 ${tier.y + 20}`}
            accent={tier.accent}
          />
          <Arrow
            d={`M 660 ${tier.y + 20} C 675 ${tier.y + 20}, 675 118, 695 118`}
            accent={tier.accent}
          />
        </g>
      ))}

      <Box x={700} y={95} w={170} label={t("Politika simülasyonu", "Policy simulation")} accent />
      <Box x={890} y={95} w={90} label={t("PDF rapor", "PDF report")} />
      <Arrow d="M 870 118 L 885 118" />

      <Caption x={0} y={240} anchor="start">
        {t("hiçbir altyapı kurmadan", "without deploying any infrastructure")}
      </Caption>
    </Frame>
  );
}

/* ── eQualiter — gesture signal chain ───────────────────────── */

function Equaliter({ locale }: { locale: Locale }) {
  const t = (tr: string, en: string) => pick({ tr, en }, locale);
  return (
    <Frame width={760} height={220} title={t("Jest sinyal zinciri", "Gesture signal chain")}>
      <Box x={0} y={40} w={130} label={t("Kamera", "Camera")} sub="30 fps" />
      <Box x={175} y={40} w={160} label="MediaPipe" sub={t("21 el noktası", "21 hand landmarks")} />
      <Box x={380} y={40} w={150} label="OpenCV" sub={t("kare işleme", "frame ops")} />
      <Box x={575} y={40} w={185} label={t("Sistem ses seviyesi", "System volume")} accent />

      <Arrow d="M 130 63 L 170 63" />
      <Arrow d="M 335 63 L 375 63" />
      <Arrow d="M 530 63 L 570 63" accent />

      {/* the actual mapping */}
      <path d="M 455 86 L 455 130" stroke={LINE} strokeWidth={1} fill="none" />
      <Box x={330} y={130} w={250} h={40} label={t("başparmak–işaret mesafesi", "thumb–index distance")} />
      <Arrow d="M 580 150 L 660 150 L 660 90" accent />
      <Caption x={668} y={168} anchor="start">
        0 → 100
      </Caption>

      <Caption x={0} y={210} anchor="start">
        {t("C++ ile hızlandırılmış kare işleme", "frame processing accelerated in C++")}
      </Caption>
    </Frame>
  );
}

/* ── WhatsControl — message to device ───────────────────────── */

function WhatsControl({ locale }: { locale: Locale }) {
  const t = (tr: string, en: string) => pick({ tr, en }, locale);
  return (
    <Frame width={760} height={210} title={t("Mesajdan cihaza komut yolu", "Message to device command path")}>
      <Box x={0} y={40} w={150} label="WhatsApp Web" sub={t("gelen mesaj", "incoming message")} />
      <Box x={195} y={40} w={155} label="Selenium" sub={t("DOM dinleyici", "DOM listener")} />
      <Box x={395} y={40} w={155} label={t("Komut ayrıştırıcı", "Command parser")} />
      <Box x={595} y={40} w={165} label="Mi Box" sub="ADB" accent />

      <Arrow d="M 150 63 L 190 63" />
      <Arrow d="M 350 63 L 390 63" />
      <Arrow d="M 550 63 L 590 63" accent />
      <Caption x={570} y={54} accent>
        shell input
      </Caption>

      {/* rejected path */}
      <Arrow d="M 472 86 L 472 135" dashed />
      <Box x={370} y={135} w={205} h={40} label={t("eşleşmezse yok say", "ignore when unmatched")} />

      <Caption x={0} y={200} anchor="start">
        {t("uzaktan kumandayı kaybettiğim için", "written because I lost the remote")}
      </Caption>
    </Frame>
  );
}

/* ── Registry ───────────────────────────────────────────────── */

const SCHEMATICS: Record<SchematicId, (p: { locale: Locale }) => React.JSX.Element> = {
  "nac-system": NacSystem,
  autoheal: AutoHeal,
  "nac-gap-analyzer": NacGapAnalyzer,
  equaliter: Equaliter,
  whatscontrol: WhatsControl,
};

export default function Schematic({ id, locale }: { id: SchematicId; locale: Locale }) {
  const Component = SCHEMATICS[id];
  if (!Component) return null;
  return <Component locale={locale} />;
}
