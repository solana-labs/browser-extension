import { mnemonicToSeed } from "../../../app/popup/utils/wallet-seed"
import nacl from "tweetnacl"
import bs58 from "bs58"

const bip32 = require("bip32")

const MNEMONIC_001 = "iron language purpose cargo access peanut insane pencil still burst sing nurse"

describe("Wallet", () => {
  it("should derive the same seed from the mnemonic", async () => {
    await mnemonicToSeed(MNEMONIC_001).then((seed) => {
      expect(seed).toEqual("55830e41db976a04df5775aeebf7751b3f599bec8f9d56568092b467aa64dad5698c828878ea5cdf84c10259bbe58f380ffddc94c5a1d868f55405429ea27c52")
    })
  })

  it("should derive a Solana Account from test mnemonic using legacy derivation path", function() {
    const bufSeed = Buffer.from("55830e41db976a04df5775aeebf7751b3f599bec8f9d56568092b467aa64dad5698c828878ea5cdf84c10259bbe58f380ffddc94c5a1d868f55405429ea27c52", "hex")
    const bip32Derivation = bip32.fromSeed(bufSeed).derivePath(`m/501'/0'/0/0`)

    const bip32PubKey = bip32Derivation.publicKey
    expect(bip32PubKey.toString("hex")).toEqual("0388d48fc3ece7ab82491f596e9951be3f9046dfc1c4fe2ac8d7a0cf4cb0e069a6")

    const naclPubKey = nacl.sign.keyPair.fromSeed(new Uint8Array(bip32Derivation.privateKey)).publicKey
    expect(bs58.encode(naclPubKey)).toEqual("FTTRznSXjgQg8CxfvsgxbKCNTYCZ3m6kNVTxaXyj2zNC")
  })

  it("should derive the right Solana Account", function() {
    const bufSeed = Buffer.from("55830e41db976a04df5775aeebf7751b3f599bec8f9d56568092b467aa64dad5698c828878ea5cdf84c10259bbe58f380ffddc94c5a1d868f55405429ea27c52", "hex")

    // We align on BIP44 like the Ledger support in Solana
    // All path components are hardened (i.e with ')
    // https://github.com/solana-labs/ledger-app-solana/blob/c66543976aa8171be6ea0c0771b1e9447a857c40/examples/example-sign.js#L57-L83v
    //
    // m/44'/501'/${accountIndex}'/0'
    //
    // m / purpose' / coin_type' / account'    / change / address_index
    // m / 44'      / 501'       / [VARIABLE]' / 0'      / [ABSENT]

    const assertDerivation = function(account, expectedSeed, expectedAccount) {
      const bip32Path_0 = bip32.fromSeed(bufSeed).derivePath(`m/44'/501'/${account}'/0'`)
      expect(bip32Path_0.publicKey.toString("hex")).toEqual(expectedSeed)
      const naclPubKey = nacl.sign.keyPair.fromSeed(new Uint8Array(bip32Path_0.privateKey)).publicKey
      expect(bs58.encode(naclPubKey)).toEqual(expectedAccount)
    }

    assertDerivation(0, "02e562aad7d744da37474d3440c5716d664683e6410a611cea22b7f07983840809", "FrJPDJphtfZzgobT7b2CG9Mp79D6gVHR8L66T9mQ59Hu")
    assertDerivation(1, "0319db2418212a1b7e749d293e5c21467975592f6cf95c9e8195aa813d841cac30", "59dqcH5gJr6M2R5hFtmmXUfNmgGJWfQh8Gx33fnAReKo")
    assertDerivation(2, "02bd93b853e311ff67c5a2309ecce2d3b79c92434f0cbaf801e7546196a24471ad", "EUprufj4shLXPRmdcwqD9WVSuqzKk3TcZhbfEGKWB6Q8")
  })


})
