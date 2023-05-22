import { connectToDatabase } from "../../mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { todoId } = req.query;
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: "Missing title" });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("My_first_db");
    const todos = db.collection("Todos");

    const result = await todos.updateOne(
      { _id: ObjectId(todoId) },
      { $set: { title } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}
