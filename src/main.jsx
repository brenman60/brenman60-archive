import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ArticlesProvider from "./contexts/ArticlesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ArticlesProvider>
      <App />
    </ArticlesProvider>
  </StrictMode>
);
