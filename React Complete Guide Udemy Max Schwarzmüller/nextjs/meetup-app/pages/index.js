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

const HomePage = () => {
    return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;