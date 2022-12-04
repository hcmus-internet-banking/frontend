import React from "react";

function useInput(initialValue: string) {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
}

export default useInput;
