import React from "react";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";

export function Form({}) {
  return (
    <section className="space-y-2">
      <Input placeholder="Twitter name" />
      <Button>
        <span>Fetch tweets</span>
      </Button>
    </section>
  );
}
