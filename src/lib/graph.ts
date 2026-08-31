import { PROJECTS } from "@/content/projects";

export interface TechNode {
  name: string;
  /** Slugs of every project that uses it. */
  projects: string[];
}

/**
 * Technologies grouped by how much they connect the work together.
 *
 * `shared` are used in more than one project — they're the load-bearing parts
 * of the stack, and the only ones worth drawing edges for. `specialist` are
 * used exactly once; listing them separately is itself the honest signal.
 */
export interface StackGraph {
  shared: TechNode[];
  specialist: TechNode[];
}

function index(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const project of PROJECTS) {
    for (const tech of project.tech) {
      const list = map.get(tech);
      if (list) list.push(project.slug);
      else map.set(tech, [project.slug]);
    }
  }
  return map;
}

export function buildStackGraph(): StackGraph {
  const nodes: TechNode[] = [...index()].map(([name, projects]) => ({ name, projects }));

  const byReach = (a: TechNode, b: TechNode) =>
    b.projects.length - a.projects.length || a.name.localeCompare(b.name);

  return {
    shared: nodes.filter((n) => n.projects.length > 1).sort(byReach),
    specialist: nodes.filter((n) => n.projects.length === 1).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** Every technology, most-used first — used by the mobile filter list. */
export function allTech(): TechNode[] {
  return [...index()]
    .map(([name, projects]) => ({ name, projects }))
    .sort((a, b) => b.projects.length - a.projects.length || a.name.localeCompare(b.name));
}

/**
 * Barycentre ordering: place each project next to the average position of the
 * technologies it connects to. One pass is enough to turn the edge bundle from
 * spaghetti into a readable fan.
 */
export function orderForGraph<T extends { slug: string }>(
  projects: T[],
  shared: TechNode[],
): T[] {
  const position = new Map(shared.map((tech, i) => [tech.name, i]));
  const reach = new Map<string, number[]>();

  shared.forEach((tech) => {
    for (const slug of tech.projects) {
      const at = position.get(tech.name);
      if (at === undefined) continue;
      const list = reach.get(slug);
      if (list) list.push(at);
      else reach.set(slug, [at]);
    }
  });

  const centre = (slug: string) => {
    const list = reach.get(slug);
    if (!list || list.length === 0) return Number.POSITIVE_INFINITY;
    return list.reduce((a, b) => a + b, 0) / list.length;
  };

  return [...projects].sort((a, b) => centre(a.slug) - centre(b.slug));
}
