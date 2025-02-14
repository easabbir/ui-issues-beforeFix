import AppRoutes from "@/routes";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";

const App = () => <AppRoutes />;
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
