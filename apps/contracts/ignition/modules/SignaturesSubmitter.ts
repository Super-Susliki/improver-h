// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SignaturesSubmitterModule = buildModule(
  "SignaturesSubmitterModule",
  (m) => {
    const relayer = m.getParameter(
      "relayer",
      "0xF0Db11C80894c0b26681e7Ba035574721012bB7e",
    );

    const signaturesSubmitter = m.contract("SignaturesSubmitter", [relayer]);

    return { signaturesSubmitter };
  },
);

export default SignaturesSubmitterModule;
