"use strict";
import { config } from "dotenv";
config();
import t from "./tools/database_connection";

console.log(process.env.DATABASE_USER);
