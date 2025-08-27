import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { X, MinusSquare, Square } from "lucide-react";

export default function Titlebar() {
  const handleMinimize = async () => {
    const appWindow = await getCurrentWebviewWindow();
    appWindow.minimize();
  };

  const handleMaximize = async () => {
    const appWindow = await getCurrentWebviewWindow();
    appWindow.toggleMaximize();
  };

  const handleClose = async () => {
    const appWindow = await getCurrentWebviewWindow();
    appWindow.close();
  };

  return (
    <div className="titlebar flex justify-between items-center bg-gray-900 text-white px-2 py-1 select-none cursor-default">
      <div className="buttons flex gap-2">
        <button onClick={handleMinimize} className="hover:bg-gray-700 px-2 rounded">
          <MinusSquare size={16} />
        </button>
        <button onClick={handleMaximize} className="hover:bg-gray-700 px-2 rounded">
          <Square size={16} />
        </button>
        <button onClick={handleClose} className="hover:bg-red-700 px-2 rounded">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Titlebar />
    <App />
  </React.StrictMode>,
);
