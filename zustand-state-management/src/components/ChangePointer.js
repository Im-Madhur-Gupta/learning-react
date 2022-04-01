import { useCallback } from "react";
import useStore from "../store/pointer-store";

const ChangePointer = () => {
  const pointer = useStore(useCallback((state) => state.pointer, []));
  const incrementPointer = useStore(
    useCallback((state) => state.incrementPointer, [])
  );
  const decrementPointer = useStore(
    useCallback((state) => state.decrementPointer, [])
  );
  const resetPointer = useStore(useCallback((state) => state.resetPointer, []));
  const logPointer = useStore(useCallback((state) => state.logPointer, []));

  // set function se state merge hota he (default behavior)
  // state replace karwa sakte he pura ka pura by passing 2nd argument to set as true -> set(___, true)

  // actions / functions in state can be async as well.

  logPointer();
  return (
    <>
      <div className="pointer">{pointer}</div>
      <div style={{ display: "flex" }}>
        <button onClick={incrementPointer}>+</button>
        <button onClick={decrementPointer}>-</button>
        <button onClick={resetPointer}>0</button>
      </div>
    </>
  );
};

export default ChangePointer;
