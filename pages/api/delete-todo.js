import { connectToDatabase } from "../../mongo";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { todoId } = req.query;

  try {
    const client = await connectToDatabase();
    const db = client.db("My_first_db");
    const todos = db.collection("Todos");

    const result = await todos.deleteOne({ _id: ObjectId(todoId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
}
