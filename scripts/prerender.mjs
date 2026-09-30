import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist", "public");
const rendererPath = path.join(projectRoot, "dist", ".prerender.mjs");

// Vite creates the production asset references first. Reuse that exact shell for
// every route, then add the HTML rendered from the same React application.
const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
if (!/<div\s+id="root"\s*>\s*<\/div>/.test(template)) {
  throw new Error("Expected an empty root element in Vite's built index.html. Run vite build before prerendering.");
}

await build({
  absWorkingDir: projectRoot,
  entryPoints: ["client/src/prerender.tsx"],
  outfile: rendererPath,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  jsx: "automatic",
  tsconfig: path.join(projectRoot, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});

try {
  const { PAGE_METADATA, renderPage, renderMetadataTags, renderSitemap } = await import(
    pathToFileURL(rendererPath).href
  );

  const cleanShell = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*\b(?:name|property)=["'](?:description|robots|og:(?:type|site_name|title|description|url)|twitter:(?:card|title|description))["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi, "");

  for (const route of [...Object.keys(PAGE_METADATA), "/404"]) {
    const content = renderPage(route);
    if (!content.includes("<h1")) {
      throw new Error(`Prerendered ${route} has no page heading; check that the page rendered successfully.`);
    }
    if (route !== "/404" && content.includes("Page Not Found")) {
      throw new Error(`Metadata includes ${route}, but App rendered its fallback. Add the corresponding route to App.tsx.`);
    }

    const html = cleanShell
      .replace("</head>", () => `    ${renderMetadataTags(route)}\n  </head>`)
      .replace(/<div\s+id="root"\s*>\s*<\/div>/, () => `<div id="root">${content}</div>`);
    const routeDirectory = route === "/" ? outputDirectory : path.join(outputDirectory, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, "index.html"), html);

    if (route === "/404") {
      await writeFile(path.join(outputDirectory, "404.html"), html);
    }
  }

  await writeFile(path.join(outputDirectory, "sitemap.xml"), renderSitemap());
  console.log(`Prerendered ${Object.keys(PAGE_METADATA).length} pages and a noindex 404; generated sitemap.xml.`);
} finally {
  await rm(rendererPath, { force: true });
}
