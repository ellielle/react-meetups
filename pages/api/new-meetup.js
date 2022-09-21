import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const uri = "mongodb+srv://nlamour:kx8Ow7IYZgD9XspZ@cluster0.61irxnk.mongodb.net/?retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);
    const db = client.db("meetups");

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    await client.close();

    res.status(201).json({ message: "Meetup Added" });
  }
}

export default handler;