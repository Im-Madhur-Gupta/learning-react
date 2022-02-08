import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ id, image, title, address, description }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
            </Head>
            <MeetupDetail
                id={id}
                image={image}
                title={title}
                address={address}
                description={description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // Ab collection ka sara data ni chahiye
    // Sirf Id chahiye
    // find(filter obj, konse fields chahiye uska object)
    const data = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    const pathsArr = data.map(meetup => ({
        params: {
            meetupid: meetup._id.toString()
        }
    }));

    return {
        fallback: false,
        paths: pathsArr
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupid; // extracting the meetupid from the URL.

    const client = await MongoClient.connect("mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // Ab mai wo document get karna chahta hu jiska _id mere URL ke id ke sath match kare
    // Below code will not work as _id is NOT a simple string.
    // const data = await meetupsCollection.findOne({ _id: meetupId });
    // So, we have to convert our meetupId to ObjectId type
    const data = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    const selectedMeetup = {
        id: meetupId,
        image: data.image,
        title: data.title,
        address: data.address,
        description: data.description
    }

    return {
        props: selectedMeetup
    }
}

export default MeetupDetails;