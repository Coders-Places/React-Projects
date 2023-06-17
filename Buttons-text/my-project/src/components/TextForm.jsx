import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("UpperCase was Clicked" + text);
    const text1 = text.toUpperCase();
    settext(text1);
  };

  const handleloclick = () => {
    // console.log("LowerCase Was Clicked");
    const text2 = text.toLowerCase();
    settext(text2);
  };

  const handleFirstLetterCapital = () => {
    console.log("Clicked To Capitalized Case");
    const text4 = text();
    settext(text4);
  };

  const handleClearText = () => {
    // console.log("Clicked To Clear Text");
    const text3 = "";
    settext(text3);
  };

  const handleToTrim = () => {
    console.log("Clicked To Trim");
    const text5 = text.trim();
    settext(text5);
  };

  const handleOnChange = (event) => {
    // console.log("On change");
    settext(event.target.value);
  };

  const [text, settext] = useState("");

  // text = "send text"; . wrong way to change the state
  // settext("send text"); correct way to change the state

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="mybox"
            rows="7"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert To Uppercase
        </button>
        <button className="btn btn-success mx-2" onClick={handleloclick}>
          Convert To Lowercase
        </button>
        <button className="btn btn-secondary mx-2" onClick={handleClearText}>
          Clear Text
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={handleFirstLetterCapital}
        >
          Capitalized Case
        </button>
        <button className="btn btn-light mx-2" onClick={handleToTrim}>
          Clicked To Trim
        </button>
      </div>
      <div className="container my-3">
        <h2> Summary </h2>
        <p>
          {text.split(" ").length} words and {text.length} characters{" "}
        </p>
        <p>{0.008 * text.split(" ").length} Read Time In Minutes</p>
        <h3>Priview</h3>
        <p>{text}</p>
      </div>
    </>
  );
}
