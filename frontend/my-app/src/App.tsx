import { IStackStyles, IStackTokens, Stack } from "@fluentui/react";
import React from "react";
import "./App.css";
import { ProfileCards } from "./ProfileCards";

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: "#605e5c",
  },
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={stackStyles}
      tokens={stackTokens}>
      <Stack>
        <Stack horizontal tokens={stackTokens}>
          <ProfileCards />
        </Stack>
      </Stack>
    </Stack>
  );
};
