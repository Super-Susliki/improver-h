import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes } from "@graphprotocol/graph-ts"
import { SignatureSubmitted } from "../generated/SignaturesSubmitter/SignaturesSubmitter"

export function createSignatureSubmittedEvent(
  merchant: Address,
  user: Address,
  storeId: Bytes,
  signature: string
): SignatureSubmitted {
  let signatureSubmittedEvent = changetype<SignatureSubmitted>(newMockEvent())

  signatureSubmittedEvent.parameters = new Array()

  signatureSubmittedEvent.parameters.push(
    new ethereum.EventParam("merchant", ethereum.Value.fromAddress(merchant))
  )
  signatureSubmittedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  signatureSubmittedEvent.parameters.push(
    new ethereum.EventParam("storeId", ethereum.Value.fromFixedBytes(storeId))
  )
  signatureSubmittedEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromString(signature))
  )

  return signatureSubmittedEvent
}
