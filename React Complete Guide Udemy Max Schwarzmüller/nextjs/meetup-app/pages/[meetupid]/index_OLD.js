import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ id, image, title, address, description }) => {
    return (
        <MeetupDetail
            id={id}
            image={image}
            title={title}
            address={address}
            description={description}
        />
    )
}

// Kyoki ye dynamic page he and ismai mai getStaticProps() ka use kar raha hu to mujhe getStaticPaths() bhi dena padega
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://madhur:1234@cluster0.1ezvw.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // Ab collection ka sara data ni chahiye
    // Sirf Id chahiye
    // find(filter obj, konse fields chahiye uska object)
    const data = await meetupsCollection.find({}, { _id: 1 }).toArray();

    return {
        // IMPORTANT -

        // fallback false matlab ki fallback to NORMAL RENDERING is Not allowed.
        // Mai NextJS se ye bol raha ki maine SARE dynamic pages ke corresponding params de diye he (aur in params ke corresponding pages pre-render karwalo), agr in given params ke bahar ki koi page ki request aye to 404 de dena.

        // fallback true matlab ki fallback to NORMAL RENDERING is allowed.
        // fallback true matlab ki maine SARE dynamic pages ke params NHI diye he (to in given params ke corresponding pages pre-render karwalo) aur agr in pages ke alawa kisi page ki request aye to acc. to the URL parameter value, page ko dynamically render kar lena.
        fallback: true,
        // Is case mai maine "m3" ni diya he to mai usko dynamically render kar wa dunga jab uski request ayegi, so, fallback should be true.
        // fallback ki madad se mai kuch specific dynamic pages ko pre-render karwa ke rakh sakta hu mainly jo bohot zyada use ho rahe ho, aur jo zyada use ni ho rahe unko mai on request render karwa dunga.
        paths: [
            {
                params: {
                    meetupid: "m1"
                    // agr aur dynamic parameters hote to mai unko yaha de dunga
                }
            },
            {
                params: {
                    meetupid: "m2"
                }
            },
        ]
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupid; // extracting the meetupid from the URL.
    // fetch....

    return {
        props: {
            id: meetupId,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
            title: 'First Meetup',
            address: 'Some Street 5, Some City',
            description: 'This is a first meetup'
        }
    }
}

export default MeetupDetails;