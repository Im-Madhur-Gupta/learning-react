import { MongoClient } from "mongodb";

// URL - /api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
        // Ye API POST wali he
        // new meetup ka data db pe Post kiya jana he.
        const data = req.body;

        // Following code will connect to the mongo db
        // So, it should never execute on the frontend aur it would never as well, kyoki ye sara code server-side ka he.
        const client = await MongoClient.connect(
            "mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority"
        );
        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();
        res.status(201).json({ message: "Meetup inserted!" });
    }
}

export default handler;