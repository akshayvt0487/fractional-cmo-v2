import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// Load visionTool dynamically so the Next build won't fail if @sanity/vision
// isn't installed (studio runs separately). We use require in a try/catch
// to avoid a hard TypeScript import that fails the root build.
declare const require: any;
let visionTool: any;
try {
  visionTool = require('@sanity/vision').visionTool;
} catch (e) {
  visionTool = undefined;
}
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'fractional-cmo',

  projectId: 'rw513uhe',
  dataset: 'production',

  plugins: [
    structureTool(),
    // Only include visionTool when available (local studio dev)
    ...(visionTool ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
})
