import { mulberry32, gaussian } from './random';

export interface FieldPoint {
  x: number;
  y: number;
  cluster: number;
  edgeFade: number; // 1 = full strength, lower near the avoid-zone boundary
}

export interface ClusterInfo {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface LatentField {
  points: FieldPoint[];
  clusters: ClusterInfo[];
  accentCluster: number;
  link: { x1: number; y1: number; x2: number; y2: number };
}

// Fixed, well-separated centers so clusters never merge into one another.
// Kept clear of the portrait's avoid-zone (top-right quadrant of the 0-100 box).
const CENTERS = [
  { cx: 14, cy: 22 },
  { cx: 16, cy: 76 },
  { cx: 40, cy: 50 },
  { cx: 75, cy: 84 },
];
const STDS = [6, 5.5, 6, 5];

// Seeded, pure: identical output on every build. Space is a 0-100 viewBox.
// `avoid` (in the same 0-100 space) is masked out plus a margin so no point
// renders over the portrait.
export function generateLatentField(
  seed: number,
  count = 320,
  avoid?: { x: number; y: number; w: number; h: number; margin: number },
): LatentField {
  const rng = mulberry32(seed);
  const clusterCount = CENTERS.length;
  const perCluster = Math.floor(count / clusterCount);
  const stds = STDS;

  const FADE_ZONE = 10; // viewBox units over which density softens near the boundary

  const distToAvoidEdge = (x: number, y: number) => {
    if (!avoid) return Infinity;
    const dx = Math.max(avoid.x - x, 0, x - (avoid.x + avoid.w));
    const dy = Math.max(avoid.y - y, 0, y - (avoid.y + avoid.h));
    return Math.hypot(dx, dy);
  };

  const insideAvoidZone = (x: number, y: number) => {
    if (!avoid) return false;
    const m = avoid.margin;
    return x > avoid.x - m && x < avoid.x + avoid.w + m && y > avoid.y - m && y < avoid.y + avoid.h + m;
  };

  const points: FieldPoint[] = [];
  for (let c = 0; c < clusterCount; c++) {
    const std = stds[c];
    let placed = 0;
    let attempts = 0;
    while (placed < perCluster && attempts < perCluster * 6) {
      attempts++;
      const x = CENTERS[c].cx + gaussian(rng, 0, std);
      const y = CENTERS[c].cy + gaussian(rng, 0, std);
      if (x < 0 || x > 100 || y < 0 || y > 100) continue;
      if (insideAvoidZone(x, y)) continue;
      const dist = distToAvoidEdge(x, y);
      const edgeFade = dist >= FADE_ZONE ? 1 : 0.35 + 0.65 * (dist / FADE_ZONE);
      points.push({ x, y, cluster: c, edgeFade });
      placed++;
    }
  }

  const clusters: ClusterInfo[] = CENTERS.map((c, i) => ({
    cx: c.cx,
    cy: c.cy,
    rx: stds[i],
    ry: stds[i] * 0.9,
  }));

  // The cluster nearest the portrait's lower-left corner carries the accent.
  const accentCluster = avoid
    ? clusters.reduce((best, c, i, arr) => {
        const d = Math.hypot(c.cx - avoid.x, c.cy - (avoid.y + avoid.h));
        const bestD = Math.hypot(arr[best].cx - avoid.x, arr[best].cy - (avoid.y + avoid.h));
        return d < bestD ? i : best;
      }, 0)
    : 0;

  // Nearest neighbouring centroid to the accent cluster.
  let nearest = -1;
  let nearestDist = Infinity;
  clusters.forEach((c, i) => {
    if (i === accentCluster) return;
    const d = Math.hypot(c.cx - clusters[accentCluster].cx, c.cy - clusters[accentCluster].cy);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = i;
    }
  });

  return {
    points,
    clusters,
    accentCluster,
    link: {
      x1: clusters[accentCluster].cx,
      y1: clusters[accentCluster].cy,
      x2: clusters[nearest].cx,
      y2: clusters[nearest].cy,
    },
  };
}
