import Button from "@/components/common/Button/Button";
import Card from "@/components/common/Card/Card";
import Input from "@/components/common/Input/Input";
import Spacer from "@/components/common/Spacer/Spacer";
import React from "react";

const index = () => {
  return (
    <>
      <Card
        className=" max-w-xl bg-gradient-to-tr from-gray-400 to-gray-600 "
        noShadow
      >
        <div className=" text-xl font-light uppercase tracking-wide text-white">
          Change Password
        </div>

        <Spacer className="h-12" />
        <div className=" flex flex-col gap-4">
          <Input
            className="w-full"
            name="password"
            autoComplete="current-password"
            // value=""
            // onChange={() => {}}
            placeholder="Password"
            type="password"
            hiddenable
            // error=""
            disabled={false}
          />
          <Input
            className="w-full"
            name="re-password"
            autoComplete="current-password"
            // value=""
            // onChange={() => {}}
            placeholder="Re-Password"
            type="password"
            hiddenable
            error=""
            disabled={false}
          />
          <div className="flex flex-row-reverse">
            <Button className="">Submit</Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default index;
