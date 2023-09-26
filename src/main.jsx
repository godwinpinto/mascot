import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from "@mantine/core";
import { CharacterAnimationsProvider } from "./contexts/CharacterAnimations";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (_theme) => ({
          body: {
            width: "80vw",
            height: "80vh",
          },
          "#root": {
            width: "80%",
            height: "80%",
          },
        }),
      }}
    >
      <CharacterAnimationsProvider>
        <App />
      </CharacterAnimationsProvider>
    </MantineProvider>
  </React.StrictMode>
);