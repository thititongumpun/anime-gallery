import { Button } from "./button";

type Props = {
  onClick?: React.MouseEventHandler;
};

import React from "react";

export default function ImageUpload({ onClick }: Props) {
  return (
    <div>
      <Button type="button" onClick={onClick}>
        Upload image
      </Button>
    </div>
  );
}
