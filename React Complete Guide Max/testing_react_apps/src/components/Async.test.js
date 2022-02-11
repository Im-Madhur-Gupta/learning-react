import { render, screen } from "@testing-library/react"
import Async from "./Async"

describe("Async Component", () => {
    // test("renders posts if requests succeeds", async () => {
    //     render(<Async />);
    //     // async call ho rahi he api pe listitems ke data ke liye
    //     // to mai asynchronously hi find karunga listitems ko.
    //     // find___() wale methods promise return karte he ie are asynchronous
    //     const listItemElements = await screen.findAllByRole("listitem");
    //     expect(listItemElements).not.toHaveLength(0);

    //     // ISSUE - Yaha async requests server pe bhejne ki zaroorat ni he. Faltu uspai load padega and data bhi change ho sakta he.
    // })

    test("renders posts if requests succeeds", async () => {
        // Modifying the fetch() function to not send a real request instead send only a MOCK request
        // basically I will try to mock the behaviour shown by fetch() without sending a request, by creating a mock function
        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: "p1", title: "First Post" }]
        });
        // ab ye mocked fetch func will be used during the remaining of the testing.
        render(<Async />);
        const listItemElements = await screen.findAllByRole("listitem");
        expect(listItemElements).not.toHaveLength(0);
    })
})