import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, IconProvider } from "@okshaun/components";
import "@okshaun/components/styles.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/500-italic.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-sans/700-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource-variable/piazzolla/index.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <IconProvider spritePath="/assets/sprite.svg">
        <App />
      </IconProvider>
    </ThemeProvider>
  </StrictMode>,
);
