import { DataConnection } from "peerjs";
import { createContext } from "react";

const ConnectionContext = createContext<DataConnection | null>(null);

export default ConnectionContext;
