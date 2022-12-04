import React from "react";

function useToggle(initialValue: boolean) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = () => setValue((prev) => !prev);

  return { value, toggle, setValue };
}

export default useToggle;
