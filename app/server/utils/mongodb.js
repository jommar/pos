import { MongoClient } from "mongodb";

let client;
let db;

export const mongo = async () => {
  if (!db) {
    const config = useRuntimeConfig();

    const uri = config.mongodbUri;
    const databaseName = config.mongodbDatabase;

    if (!uri || !databaseName) {
      throw new Error(
        "MongoDB connection details are missing in runtime config"
      );
    }

    client = new MongoClient(uri);
    await client.connect();
    db = client.db(databaseName);
  }
  return db;
};
