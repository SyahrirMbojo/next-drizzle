"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export default function BtnAddNew() {
  return (
    <Button size={"lg"}>
      <PlusIcon /> Add New
    </Button>
  );
}
