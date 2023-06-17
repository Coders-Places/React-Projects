import { useState } from "react";

const State = () => {
  const [Increasenum, setincreser] = useState(1);

  const [Counter, setCounter] = useState(0);

  let hi = 354;
  let he = 12;
  const click = () => {
    // he++     ya he = he + 1
    // ++he    ya he = he + 1
    // he + 1;

    // = is k bagher variable change nhi hoga
    // he++, he = he + 1,  ++he ->  ek he

    // -----------
    // hi = he + 1

    he = he + 2;
    console.log(he);
    setCounter(Counter + 1);
    setincreser(Increasenum + 1);
  };

  return (
    <>
      <h1> 0 </h1>
      <button className="bg-gray-500 text-white" onClick={click}>
        Click Me &nbsp;{hi} {(he = he + 1)} {Counter} {Increasenum}
      </button>
    </>
  );
};

export default State;
