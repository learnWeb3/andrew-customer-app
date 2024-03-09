import { createPortal } from "react-dom";

export function Portal({ children = null }) {
  return createPortal(children, document.body);
}
