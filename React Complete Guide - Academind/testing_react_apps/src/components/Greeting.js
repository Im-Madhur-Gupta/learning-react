import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
    const [changedText, setChangedText] = useState(false);
    const changedTextHandler = () => {
        setChangedText(true);
    }
    return (
        <div>
            <h1>Hello</h1>
            {
                changedText
                    ? <Output>Changed</Output>
                    : <Output>Its good to see you.</Output>
            }
            <button onClick={changedTextHandler}>Change Text</button>
        </div>
    )
}

export default Greeting;