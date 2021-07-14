import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";
import {  Formik} from 'formik';
import * as Yup from 'yup';
export function EditUser() {
  const { pathname } = useLocation();
  const userId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.id === userId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phonenumber, setPhoneNumber] = useState(user.phonenumber);
  const[dateofbirth, setDate_Of_Birth] = useState(user.dateofbirth);
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleDate_Of_Birth = (e) => setDate_Of_Birth(e.target.value);

  const handleClick = () => {
    if (name && email && phonenumber && dateofbirth) {
      dispatch(
        userUpdated({
          id: userId,
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
    <Formik
    intialvalue={{ email: "", phonenumber: "" }}

    validationSchema={Yup.object().shape({

      name: Yup.string()
      
      .required("name will be not same"),

      email: Yup.string()
        .email()
        .required("Required"),
        //.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)),
      

      phonenumber: Yup.string()
        .required("Required")
        .min(10, "ten digit is required in phone number"),

      dateofbirth: Yup.string()
      
      .required("yyyy/mm/dd")
    })}

  >

  </Formik>
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          <label htmlFor="phonenumberInput">PhoneNumber</label>
          <input
            className="u-full-width"
            type="phonenumber"
            placeholder='8676046896'
            id="phonenumberInput"
            onChange={handlePhoneNumber}
            value={phonenumber}
          />
          <label htmlFor="dateofbirthInput">DateOfBirth</label>
          <input
            className="u-full-width"
            selected={dateofbirth}
            onChange={handleDate_Of_Birth}
            type='date'
            id="dateofbirth"
            value={dateofbirth}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Save user
          </button>
        </div>
      </div>
    </div>
  );
}
