import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetup = () => {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch("http://localhost:3000/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push("/")
    }
    return (
        <>
            <Head>
                <title>Add a Meetup</title>
                <meta name="description" content="Add your meetups." />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetup;