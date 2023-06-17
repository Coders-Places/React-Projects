// import { useState } fro  m "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";

function App() {
  return (
    <>
      <Navbar
        tittle="Mr.Suffiyan"
        Homepage="Home"
        links="Link"
        Dropdowns="Dropdown"
        Disabled="Disabled"
        Searchengine="Search"
      />
      <div className="container my-3">
        <TextForm heading="Enter the text to analyze" />
      </div>
    </>
  );
}

export default App;
