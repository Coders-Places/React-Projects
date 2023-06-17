import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormDialog from '../Components/FormDialog';
import TodosContainer from '../Components/TodosContainer';
import Cookies  from "js-cookie";
import ContextStore from '../Context/ContextStore';




const Notes = () => {
  const { IsLoggedIn, setIsLoggedIn } = useContext(ContextStore);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(IsLoggedIn, Cookies.get())
    if (!Cookies.get("authToken")) {
      setIsLoggedIn(false);
      navigate("/signup");
    }else{
      setIsLoggedIn(true)
    }
    //  else {
    //   setIsLoggedIn(false)
    //   navigate("/signup")
    // }
  }, [])
  return (
    IsLoggedIn ?
      <>
        <FormDialog />
        <TodosContainer />
      </> : <></>
  )
}

export default Notes