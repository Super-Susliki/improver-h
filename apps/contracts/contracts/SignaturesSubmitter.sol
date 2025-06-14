// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/**
 * @title SignaturesSubmitter
 * @notice Contract for submitting and storing digital signatures for merchant-user interactions
 * @dev This contract allows merchants to submit signatures for specific store-user interactions
 */
contract SignaturesSubmitter {
  /**
   * @notice Structure representing a digital signature submission
   * @param merchant Address of the merchant submitting the signature
   * @param user Address of the user associated with the signature
   * @param storeId Unique identifier for the store
   * @param signature The actual signature string
   */
  struct Signature {
    address merchant;
    address user;
    bytes32 storeId;
    string signature;
  }

  /** @notice Address of the relayer that has permission to submit signatures */
  address public immutable relayer;

  /** @notice Array storing all submitted signatures */
  Signature[] public signatures;

  /**
   * @notice Event emitted when a new signature is submitted
   * @param merchant Address of the merchant submitting the signature
   * @param user Address of the user associated with the signature
   * @param storeId Unique identifier for the store
   * @param signature The actual signature string
   */
  event SignatureSubmitted(
    address indexed merchant,
    address indexed user,
    bytes32 indexed storeId,
    string signature
  );

  /**
   * @notice Constructor to initialize the contract with a relayer address
   * @param _relayer Address of the relayer that will submit signatures
   */
  constructor(address _relayer) {
    relayer = _relayer;
  }

  /**
   * @notice Submit a new signature for a merchant-user interaction
   * @param merchant Address of the merchant submitting the signature
   * @param user Address of the user associated with the signature
   * @param storeId Unique identifier for the store
   * @param signature The actual signature string to be stored
   */
  function submitSignature(
    address merchant,
    address user,
    bytes32 storeId,
    string memory signature
  ) public {
    signatures.push(Signature(merchant, user, storeId, signature));
    emit SignatureSubmitted(merchant, user, storeId, signature);
  }
}
