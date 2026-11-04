import type { APIRoute } from 'astro';
import { buildVersion } from '../lib/build-version';
export const prerender = true;
export const GET: APIRoute = () => new Response(JSON.stringify(buildVersion, null, 2) + '\n', {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});
