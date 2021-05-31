import Knex from "knex";
import { getDatabaseConfig } from "./config";

export const dbConn = Knex(getDatabaseConfig());
