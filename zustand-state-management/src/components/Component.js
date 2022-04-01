import { useEffect, useRef } from "react"
import useStore from "../store/pointer-store"

const Component = () => {
    console.log("Component got re-rendered. :(")

    // initial copy of state
    const pointerRef = useRef(useStore.getState().pointer);

    // subscribe function se latest state ke updates milte rahenge without re-render
    useEffect(() => useStore.subscribe(state => { console.log(state.pointer === pointerRef.current) }), [])

    return (
        <div>Im a Component.</div>
    )
}

export default Component;