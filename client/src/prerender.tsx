import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export {
  PAGE_METADATA,
  getPageMetadata,
  renderMetadataTags,
  renderSitemap,
} from "./lib/page-metadata";

export function renderPage(path: string): string {
  return renderToString(
    <Router ssrPath={path} ssrSearch="">
      <App />
    </Router>,
  );
}
