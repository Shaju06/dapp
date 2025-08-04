"use client";

import { ConnectButton as RKConnectButton } from "@rainbow-me/rainbowkit";

const ConnectButton = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <RKConnectButton />
    </div>
  );
};
export default ConnectButton;
