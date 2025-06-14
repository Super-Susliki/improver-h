export const signatureSubmitterAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_relayer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'merchant',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'storeId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'signature',
        type: 'string',
      },
    ],
    name: 'SignatureSubmitted',
    type: 'event',
  },
  {
    inputs: [],
    name: 'relayer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'signatures',
    outputs: [
      {
        internalType: 'address',
        name: 'merchant',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'storeId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'signature',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'merchant',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'storeId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'signature',
        type: 'string',
      },
    ],
    name: 'submitSignature',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
