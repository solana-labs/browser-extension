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

		// Ref. We align on BIP44 as Ledger Live products now do
		// https://medium.com/myetherwallet/hd-wallets-and-derivation-paths-explained-865a643c7bf2
		// >> https://github.com/MyCryptoHQ/MyCrypto/issues/2070#issue-341249164
		// m / purpose' / coin_type' / account'    / change / address_index
		// m / 44'      / 501'       / [VARIABLE]' / 0      / 0
		const bip32DerivationAt_0_0 = bip32.fromSeed(bufSeed).derivePath(`m/44'/501'/0'/0/0`)
		expect(bip32DerivationAt_0_0.publicKey.toString("hex")).toEqual("0371b1c70293709d25ef34b11e9b9fd5d04f99e7716e2266cb43a51f892562e8fa")

		const naclPubKey = nacl.sign.keyPair.fromSeed(new Uint8Array(bip32DerivationAt_0_0.privateKey)).publicKey
		expect(bs58.encode(naclPubKey)).toEqual("78wNUVa5HrESLUKrU2GYu5HWDh1cGuvCnK2Ep4STZ62n")
	})


})
