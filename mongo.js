import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://salkanovich:9A_S_u5%40MNFMc8f@cluster0.qktmew4.mongodb.net/My_first_db?retryWrites=true&w=majority";

// Replace with your MongoDB connection string

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedClient = client;
  return client;
}
