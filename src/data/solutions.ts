import data from '../../content/solutions.json' with { type: 'json' };
export const solutions = data.items.map(solution => ({
  ...solution, needs: solution.needs.map(need => [need.title, need.text] as [string, string]),
}));
