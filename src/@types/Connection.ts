import { DataConnection } from "peerjs";

export default interface Connection extends DataConnection {
  status?: string;
}
