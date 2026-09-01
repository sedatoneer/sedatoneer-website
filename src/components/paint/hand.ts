/**
 * Mouse-drawn stroke generator.
 *
 * A Paint drawing is not a bezier curve — it is a list of points sampled off a
 * moving mouse, every few pixels, with the hand shaking the whole way. So these
 * helpers emit `M x y L x y L x y …` paths at roughly mouse-sampling density
 * and push each point off course with a damped random walk: the offset carries
 * over from the previous sample and decays, which is what makes a real tremor
 * wobble slowly rather than buzz.
 *
 * Everything is seeded, so the same drawing comes out on the server and in the
 * browser, and it never changes between renders.
 */

/** Small deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Point {
  x: number;
  y: number;
}

/** Damped random walk — the hand drifts, then pulls back. */
function tremor(points: Point[], seed: number, amount: number): Point[] {
  const random = rng(seed);
  let ox = 0;
  let oy = 0;
  return points.map(({ x, y }) => {
    ox = ox * 0.82 + (random() - 0.5) * amount;
    oy = oy * 0.82 + (random() - 0.5) * amount;
    return { x: x + ox, y: y + oy };
  });
}

function toPath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/** Roughly one sample every 5px, the way a mouse gets polled. */
const samples = (length: number) => Math.max(4, Math.round(length / 5));

export function stroke(
  from: Point,
  to: Point,
  seed: number,
  { shake = 2.2, bow = 0 } = {},
): string {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const n = samples(length);
  const nx = -(to.y - from.y) / length;
  const ny = (to.x - from.x) / length;

  const points: Point[] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    // Nobody drags a mouse in a straight line; let it sag a little.
    const arc = Math.sin(t * Math.PI) * bow;
    points.push({
      x: from.x + (to.x - from.x) * t + nx * arc,
      y: from.y + (to.y - from.y) * t + ny * arc,
    });
  }
  return toPath(tremor(points, seed, shake));
}

/**
 * A hand-drawn ring. It is never round: the radius breathes, and the stroke
 * runs past where it started instead of meeting it.
 */
export function ring(
  cx: number,
  cy: number,
  r: number,
  seed: number,
  { shake = 2.2, start = -2.2, sweep = Math.PI * 2 + 0.3, lumps = 0.07 } = {},
): string {
  const n = samples(r * sweep);
  const random = rng(seed ^ 0x9e37);
  const phase = random() * Math.PI * 2;
  const lean = 1 + (random() - 0.5) * 0.09;

  const points: Point[] = [];
  for (let i = 0; i <= n; i += 1) {
    const angle = start + sweep * (i / n);
    // Slow radius wobble makes it lumpy rather than geometric.
    const radius = r * (1 + Math.sin(angle * 3 + phase) * lumps);
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * lean,
    });
  }
  return toPath(tremor(points, seed, shake));
}

/** An open arc — a mouth, a motion line. */
export function arc(
  cx: number,
  cy: number,
  r: number,
  from: number,
  to: number,
  seed: number,
  { shake = 2, squash = 1 } = {},
): string {
  const n = samples(r * Math.abs(to - from));
  const points: Point[] = [];
  for (let i = 0; i <= n; i += 1) {
    const angle = from + (to - from) * (i / n);
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * squash });
  }
  return toPath(tremor(points, seed, shake));
}
