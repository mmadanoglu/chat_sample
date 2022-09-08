import { render } from "react-dom";
import { StateProvider } from "../context";
import WebChat from "./WebChat/WebChat";
import "./index.css";

const rootElement = document.getElementById("root");
render(
  <StateProvider>
    <WebChat />
  </StateProvider>,
  rootElement
);
