import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";
import { Formik, isInputEvent, useFormik} from 'formik';
import * as Yup from 'yup';


export  function AddUser() {


  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  
  const [phonenumber, setPhoneNumber] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");

  const [error, setError] = useState("");
   

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);


  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleDateOfBirth = (e) => setDateOfBirth(e.target.value);
  const usersAmount = useSelector((state) => state.users.entities.length);
  
  const initialValues= { 
    name:'',
  email:'',
  phonenumber:'',
  dateofbirth:""
  }
  const onSubmit = values =>{
    console.log('Form data', values)
  }
  const validate =  values => {
    let error = {}

    if(!values.name) {
      setError("name", { message: "Name cant be empty" })
    }
    if(!values.email){
      setError("email", { message: "Email cant be empty" })
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      setError("email", { message: "Invalid email format" })
     
    }
    if(!values.phonenumber){
      setError("phonenumber", { message: "PhoneNumber cant be empty" })
    }
    if(/^\d{10}$/i.test(values.phonenumber)){
      setError("phonenumber", { message: "Invalid PhoneNumber" })
   }
    if(!values.dateofbirth){
      setError("dateofbirth", { message: "Date of birth cant be empty" })
    }
  

    return error();
  }

  const formik = useFormik({
    initialValues,
   onSubmit, 
   validate

  })
  console.log('Form values', formik.values)
  
 const handleClick = () => {
    if (name && phonenumber && dateofbirth) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          name,
          email,
          phonenumber,
          dateofbirth,

        })
      );
     

      

     setError(null);
     history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
    setPhoneNumber("");
    setDateOfBirth("");
  };


  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
      </div>
      <div className="row">
        <div className="four columns">
          <form onSubmit={formik.handleSubmit}></form>
          <label htmlFor="nameInput">Name</label>
          <input
          className="u-full-width"
                  value={name}
                   onChange={handleName}
                    type="text"
                     placeholder="enter name"
                     id="nameInput"
            //className="u-full-width"
            //type="text"
            //placeholder="Your Name"
            //id="nameInput"
            //onChange={formik.handleName}
            //value={formik.values.name}
          />
          {formik.seterror.name ? <div>{formik.seterror.name}</div>: null}
          
          <label htmlFor="emailInput">Email</label>

          <input
            className=""
            type="email"
            placeholder="test@gmailbox.com"
            id="emailInput"
            onChange={handleEmail}
            
            value={email}
          />
          {formik.seterror.email? <div>{formik.seterror.email}</div>: null}
          
          <label htmlFor="phonenumberInput">Phone Number</label>
          <input
            className="u-full-width"
            type="phonenumber"
            placeholder='8676046896'
            id="phonenumberInput"
            onChange={handlePhoneNumber}
            value={phonenumber}
          />
            {formik.seterror.phonenumber ? <div>{formik.seterror.phonenumber}</div>: null}
          <label htmlFor="dateofbirthInput">Date Of Birth</label>

          <input
            className=""
            type="date"

            id="dateofbirthInput"
            onChange={handleDateOfBirth}
            value={dateofbirth}
          />
            {formik.seterror.dateofbirth ? <div>{formik.seterror.dateofbirth}</div>: null}
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}

