import { SignatureSubmitted as SignatureSubmittedEvent } from "../generated/SignaturesSubmitter/SignaturesSubmitter"
import { SignatureSubmitted } from "../generated/schema"

export function handleSignatureSubmitted(event: SignatureSubmittedEvent): void {
  let entity = new SignatureSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.merchant = event.params.merchant
  entity.user = event.params.user
  entity.storeId = event.params.storeId
  entity.signature = event.params.signature

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
