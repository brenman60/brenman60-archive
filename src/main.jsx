import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ArticlesProvider from "./contexts/ArticlesContext.jsx";

// Replace window history so that React router uses correct path
try {
  const params = new URLSearchParams(window.location.search);
  const p = params.get("p");
  if (p) {
    const decoded = decodeURIComponent(p);
    if (decoded.startsWith("/")) {
      window.history.replaceState({}, "", decoded);
    }
  }
} catch (e) {
  
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArticlesProvider>
      <App />
    </ArticlesProvider>
  </StrictMode>
);
