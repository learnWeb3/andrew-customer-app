import { useState } from "react";

export function useToggledState(initialState = false) {
  const [toggled, setToggled] = useState(initialState);
  return {
    open: () => setToggled(true),
    close: () => setToggled(false),
    toggled,
  };
}
