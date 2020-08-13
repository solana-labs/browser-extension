import { Connection } from "@solana/web3.js"
import { createLogger } from "./utils"
const log = createLogger("sol:conn")

export class Web3Connection {
  public conn: Connection
  public networkEndpoint: string

  constructor(networkEndpoint: string) {
    log("Initializing connection network: %s", networkEndpoint)
    this.networkEndpoint = networkEndpoint
    this.conn = new Connection(networkEndpoint)
  }

  changeNetwork(networkEndpoint: string) {
    log("Changing connection network: %s", networkEndpoint)
    this.networkEndpoint = networkEndpoint
    this.conn = new Connection(networkEndpoint)
  }
}