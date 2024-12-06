import { MongoClient } from "mongodb";
import { ERRORS } from "../constants";

let client;
let db;

export const mongo = async () => {
  if (!db) {
    const config = useRuntimeConfig();

    const uri = config.mongodbUri;
    const databaseName = config.mongodbDatabase;

    if (!uri || !databaseName) throw new Error(ERRORS.DB_CONN);

    client = new MongoClient(uri);
    await client.connect();
    db = client.db(databaseName);
  }
  return db;
};
