import React, { useState } from "react";

const Contact = () => {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Description, setDescription] = useState('');



  // Handling State-Inputs 
  const HandleChange = (e) => {

    console.log(e.target.name)
    if (e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "phone") setPhone(e.target.value);
    else if (e.target.name === "description") setDescription(e.target.value);
  }


  // Onclick Submit, Call API..!
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/contact", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        name: Name,
        email: Email,
        description: Description,
        phone: Phone
      }) // body data type must match "Content-Type" header
    })
    const json = await res.json();

    console.log(json)

    // Showing Alert, As A response from 'Server'
    if (json.success) {
      alert("Successfully Sent, ThankYou For Contacting US")
      setName(''), setDescription(''), setPhone(''), setEmail('');
    } else {
      alert("Error! Internal Server Error Couldn't Sent")
    }




  }
  return <>
    <h1>Mr. Blogger</h1>
    <h2>Contact Us</h2>

    <div style={{ padding: '2rem' }}>
      <form >

        Your Name:
        <input type="text" name="name" onChange={HandleChange} value={Name} style={{ display: 'block' }} />
        Email:
        <input type="email" name="email" onChange={HandleChange} value={Email} style={{ display: 'block' }} />

        Phone:
        <input type="text" name="phone" onChange={HandleChange} value={Phone} style={{ display: 'block' }} />

        Message:
        <textarea name="description" onChange={HandleChange} cols="30" rows="4" value={Description} style={{ display: 'block' }}></textarea>

        <input type="submit" onClick={HandleSubmit} value="Send" />
      </form>
    </div>


  </>;
};

export default Contact;
