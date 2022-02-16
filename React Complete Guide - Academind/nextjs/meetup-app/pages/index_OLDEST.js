import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "Meetup 1",
        image: "http://prod-upp-image-read.ft.com/15da1136-474c-11e3-b4d3-00144feabdc0",
        address: "address 1",
    },
    {
        id: "m2",
        title: "Meetup 2",
        image: "http://prod-upp-image-read.ft.com/15da1136-474c-11e3-b4d3-00144feabdc0",
        address: "address 2",
    },
    {
        id: "m3",
        title: "Meetup 3",
        image: "http://prod-upp-image-read.ft.com/15da1136-474c-11e3-b4d3-00144feabdc0",
        address: "address 3",
    }
]

// Ye wale index.js code se jo Nextjs pre-rendered (server-side rendering wala) page bheje ga wo 1st render ke baad wala hoga matlab ki wo jismai loadedMeetups empty array he.
// Is config mai Nextjs won't wait for the useEffect func. to execute (fetch request) after the first render. Wo pehle hi server pe render karke page frontend ko serve kardega.

// Basically, mujhe Nextjs ki built-in page pre-rendering ko batana padega ki "this" particular render/stage ke baad frontend ko page serve karna he.

const HomePage = () => {
    const [loadedMeetups, setLoadedMeetups] = useState([]);
    useEffect(()=>{
        // fetch("")
        setLoadedMeetups(DUMMY_MEETUPS);
    },[])
    return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;