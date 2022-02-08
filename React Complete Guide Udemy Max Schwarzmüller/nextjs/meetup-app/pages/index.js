import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return (
        <>
            <Head>
                {/* title */}
                <title>React Meetups</title>
                {/* meta */}
                <meta name="description" content="Browse a huge list of React meetups in your area." />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const data = await meetupsCollection.find().toArray();
    client.close();

    const meetupsData = data.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
    }))

    return {
        props: {
            meetups: meetupsData
        },
        revalidate: 1
    }
}

export default HomePage;