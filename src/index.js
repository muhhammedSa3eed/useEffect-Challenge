import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UseEffectChallenge from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UseEffectChallenge />
  </StrictMode>
);
