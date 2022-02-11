import { render, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"
// userEvent object user events simulate karwata he virtual dom pe.

import Greeting from "./Greeting"

// test suites is just a group of tests.
// test banane ke liye test()
// test suite banane ke liye describe()
describe("Greeting Component", () => {
    test("renders hello as a test", () => {
        // Arrange
        render(<Greeting />); // keh sakte ke ek virtual dom pe mera element render ho gaya he.

        // Act
        // nothing here

        // Assert
        // to check the virtual dom for some element, whether its there or not, correct or not
        const helloElement = screen.getByText("HELLO", { exact: false });

        // checking whether this element is available in the document or not.
        expect(helloElement).toBeInTheDocument();
    })

    test("renders 'good to see you'", () => {
        render(<Greeting />);
        const targetElement = screen.getByText("good to see you", { exact: false });
        expect(targetElement).toBeInTheDocument();
    })

    test("renders 'Changed' if button was clicked", () => {
        render(<Greeting />);

        // Act
        const targetBtn = screen.getByRole("button"); // button select karne ke liye
        userEvent.click(targetBtn);

        const targetElement = screen.getByText("changed", { exact: false });
        expect(targetElement).toBeInTheDocument();
    })

    test("does not render 'good to see you' if button was clicked", () => {
        render(<Greeting />);

        // Act
        const targetBtn = screen.getByRole("button"); // button select karne ke liye
        userEvent.click(targetBtn);

        // queryBytext se ye agr element ni milega to null return ho jaega.
        const targetElement = screen.queryByText("good to see you", { exact: false });
        // checking whether target element is null or not
        // we are expecting it to not be on the virtual dom
        expect(targetElement).toBeNull();
    })
})