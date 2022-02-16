// Ab kyoki ye MongoClient sirf getStaticProps() (could have been getServerSideProps()) mai use ho raha he
// to NextJS ye baat dekhke is package ko frontend ke bundle mai ni dale ga.
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
    return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//     const req = context.req; // incoming request ka data access kar sakta hu
//     const res = context.res; // jo response bhejenge usse change etc kar sakta hu

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// A special func. that nextjs will execute before loading the Homepage comp.
export async function getStaticProps() {
    // IMPORTANT - Ab yaha pe alag se ek local API endpoint for a GET req. to mongodb server is NOT required.
    // Seedha hi mongo ke server se data fetch() karlo.
    // Security risk bhi ni hoga as getStaticProps() wala code is only executed on the server side.
    // This is a std. way to work in NextJS.

    const client = await MongoClient.connect("mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // meetupsCollection ka sara data utha lo
    const data = await meetupsCollection.find().toArray();

    // fir is data ko mujhe transform karna padega, kyoki ye abhi aese objects ka array he jismai "_id" name ki field he jismai kuch ObjectId("______") type ka data he, which we want to convert to "id" field with String data.
    const meetupsData = data.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
    }))

    client.close();

    // getStaticProps() mai mujhe return karna padta he ek JS OBJECT jismai ek "props" name ki key honi chahiye which holds my static props.
    // These "props" will be provided to Homepage component,
    // during the pre-rendering ->  build process in case of getStaticProps.
    return {
        props: {
            meetups: meetupsData
        },
        revalidate: 1
    }
}

export default HomePage;