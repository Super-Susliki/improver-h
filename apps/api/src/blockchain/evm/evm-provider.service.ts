import { Injectable, Inject } from '@nestjs/common';
import {
  createPublicClient,
  http,
  createWalletClient,
  getContract,
  Address,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia } from 'viem/chains';

import { signatureSubmitterAbi } from './abi/signature-submitter';

export const RPC_URL = 'RPC_URL';
export const PRIVATE_KEY = 'PRIVATE_KEY';

@Injectable()
export class EvmProviderService {
  constructor(
    @Inject(RPC_URL) private readonly rpcUrl: string | undefined,
    @Inject(PRIVATE_KEY) private readonly privateKey: `0x${string}`,
  ) {}

  getPublicClient() {
    return createPublicClient({
      chain: baseSepolia,
      transport: http(this.rpcUrl),
    });
  }

  async pushSignatureOnchain({
    merchant,
    user,
    storeId,
    signature,
  }: {
    merchant: Address;
    user: Address;
    storeId: `0x${string}`;
    signature: `0x${string}`;
  }) {
    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: http(this.rpcUrl),
      account: privateKeyToAccount(this.privateKey),
    });

    const contract = getContract({
      address: '0xfbB032b3D4b4756140d35f1ab86e12AB99433EFF',
      abi: signatureSubmitterAbi,
      client: walletClient,
    });

    const txHash = await contract.write.submitSignature(
      [merchant, user, storeId, signature],
      {},
    );

    return txHash;
  }
}
