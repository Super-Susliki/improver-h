import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { SignatureSubmitted } from "../generated/schema"
import { SignatureSubmitted as SignatureSubmittedEvent } from "../generated/SignaturesSubmitter/SignaturesSubmitter"
import { handleSignatureSubmitted } from "../src/signatures-submitter"
import { createSignatureSubmittedEvent } from "./signatures-submitter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let merchant = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let storeId = Bytes.fromI32(1234567890)
    let signature = "Example string value"
    let newSignatureSubmittedEvent = createSignatureSubmittedEvent(
      merchant,
      user,
      storeId,
      signature
    )
    handleSignatureSubmitted(newSignatureSubmittedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("SignatureSubmitted created and stored", () => {
    assert.entityCount("SignatureSubmitted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SignatureSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "merchant",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SignatureSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SignatureSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "storeId",
      "1234567890"
    )
    assert.fieldEquals(
      "SignatureSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "signature",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
