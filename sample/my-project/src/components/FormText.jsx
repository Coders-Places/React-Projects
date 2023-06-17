import React, { useState } from "react";

export default function FormText(props) {
  const clickHandle = () => {
    console.log("UpperCase Clicked");
    settext("Note Book");
  };

  const OnChangeHandler = (event) => {
    console.log("OnChanged Clicked");
    settext(event.target.value);
  };

  const [text, settext] = useState("Write A Text");
  //   settext(""); sahi tareka text ko update krne ka tareka

  return (
    <div>
      <h1>{props.header}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={OnChangeHandler}
          id="mybox"
          rows="7"
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={clickHandle}>
        Capitalize Button
      </button>
    </div>
  );
}
