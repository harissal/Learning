import { connectToDatabase } from "../../mongo";
export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db("My_first_db");
  const todos = db.collection("Todos");

  const result = await todos.find({}).toArray();

  // setTimeout(() => {
  res.status(200).json({ result });
  // }, 5000);
}
