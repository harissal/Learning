import { connectToDatabase } from "../../mongo";

export default async function handler(req, res) {
  /*const client = await connectToDatabase();
  const db = client.db("My_first_db");
  const todos = db.collection("Todos");
  chatgpt says to move these declarations under, why?*/

  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: "Missing title" });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("My_first_db");
    const todos = db.collection("Todos");

    const newTodo = { title };
    const result = await todos.insertOne({ title });

    res.status(200).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: "Fail" });
  }
}
