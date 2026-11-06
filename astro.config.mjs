import { defineConfig } from 'astro/config';
import visualEditor from './integrations/visual-editor.mjs';
export default defineConfig({ integrations: [visualEditor()], output: 'static', devToolbar: { enabled: false } });
