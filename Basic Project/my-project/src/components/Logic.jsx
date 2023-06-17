import React, { useState } from "react";

const Logic = () => {
  const [Inc, setInc] = useState(1);

  let he = 23;

  const clicked = () => {
    he = he + 1;

    setInc(Inc + 2);
  };

  return (
    <>
      <h1> 0 </h1>
      <button className="bg-gray-500 text-blue" onClick={clicked}>
        Clicked &nbsp; {(he = he + 1)} {Inc}
      </button>
    </>
  );
};

export default Logic;
