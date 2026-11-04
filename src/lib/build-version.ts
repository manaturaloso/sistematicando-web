import { execFileSync } from 'node:child_process';
export interface BuildVersion {
  schemaVersion: 1;
  commit: string | null;
  commitDate: string | null;
  sourceModified: boolean | null;
}
// Build time only. Never inspect environment variables or emit author/credential data.
export function readBuildVersion(cwd = process.cwd()): BuildVersion {
  const unknown: BuildVersion = { schemaVersion: 1, commit: null, commitDate: null, sourceModified: null };
  try {
    const git = (...args: string[]) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 3000 }).trim();
    const commit = git('rev-parse', 'HEAD');
    if (!/^[0-9a-f]{40}$/.test(commit)) return unknown;
    const date = git('show', '-s', '--format=%cI', 'HEAD');
    const status = git('status', '--porcelain', '--untracked-files=normal', '--', 'src', 'content', 'public', 'scripts', 'package.json', 'package-lock.json', 'astro.config.mjs', 'tsconfig.json', 'wrangler.jsonc', '.pages.yml', '.github');
    return { schemaVersion: 1, commit, commitDate: Number.isNaN(Date.parse(date)) ? null : date, sourceModified: status.length > 0 };
  } catch {
    return unknown;
  }
}
export const buildVersion = readBuildVersion();
