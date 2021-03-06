import { ConnectionOptions } from "node:tls";

export interface User {
    id: number;
    name: string;
    pnumber: number;
    email: string;
    country: string;
    connection: string;
    password: string;
  }