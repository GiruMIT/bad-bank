import { useState, useEffect } from "react";
import { useFormik } from "formik";
import useUserContext from "../../hooks/useUserContext";
import { toast } from "react-toastify";
import User from "../../models/userModel";

import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";

const CreateAccountPopUp = ({ handleClose }) => {
  //Users context
  const { user, setUser } = useUserContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [otherAccount, setOtherAccount] = useState(false);

  //Registration validation schema using yup
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      const isDuplicate = user.find(
        (user) => user.email === formik.values.email
      );

      if (isDuplicate) {
        toast.error("Email already in use");
        return;
      }

      const isDuplicateName = user.find((user) => {
        user.name === formik.values.name, ("testing name", user, formik.values);
      });

      if (isDuplicateName) {
        toast.error("Name already in use");
        return;
      }

      //Using a custom class as a model / schema
      const persona = new User();
      persona.userPic = formik.values.userPic;
      persona.name = formik.values.name;
      persona.email = formik.values.email;
      persona.password = formik.values.password;
      persona.balance = 0;
      persona.transactionHistory = [];

      setUser((prev) => [...prev, persona]);
      formik.resetForm();
      setOtherAccount((prev) => !prev);
      toast.success("Successfully Registered");
      return;
    },
  });

  const handleSubmit = () => {
    const { name, email, password } = formik.values;
    //("formik.values.", name, email, password);

    const url = `https://badbankbackend-81d3d9e49e8f.herokuapp.com/account/create/${name}/${email}/${password}`;
    // const url = `http://localhost:5000/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      if (data.data == "User already in exists") {
        toast.error("Email already in use");
      } else {
        toast.success("Successfully created");
      }
      //("api call res", data);
    })();
    // props.setShow(false);

    const isDuplicate = user.find((user) => user.email === formik.values.email);

    if (isDuplicate) {
      toast.error("Email already in use");
      return;
    }
    // const isDuplicateName = user.find((user) => {
    //   //("testing name", user, formik.values);

    //   return user.name === formik.values.name;
    // });

    // if (isDuplicateName) {
    //   toast.error("Name already in use");
    //   return;
    // }
    // const persona = new User();
    // persona.name = formik.values.name;
    // persona.email = formik.values.email;
    // persona.password = formik.values.password;
    // persona.balance = 0;
    // persona.transactionHistory = [];

    // setUser((prev) => [...prev, persona]);
    formik.resetForm();
    // setOtherAccount((prev) => !prev);
    // toast.success("Successful user registration");
    return;
  };

  //Listen for Form inputs
  useEffect(() => {
    const { name, email, password } = formik.values;

    if (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 8
      // confirmPassword.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const handleClosePopUp = () => {
    handleClose();
    setOtherAccount(false);
  };

  const handleClickYes = () => {
    setOtherAccount((prev) => !prev);
  };

  const cancelButtonStyles = {
    backgroundColor: "#495057",
  };

  return (
    <>
      {/* <div className="popup-box"> */}
      <div className="box">
        {otherAccount ? (
          <div className="card">
            <div className="card-body">
              <p>Would you like to add another account?</p>
              <Box m={2} className="custom-btn-group">
                <Button
                  variant="contained"
                  style={cancelButtonStyles}
                  type="submit"
                  onClick={handleClosePopUp}
                >
                  No
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleClickYes}
                >
                  Yes
                </Button>
              </Box>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <hr />
              <div>
                <Box m={2}>
                  <TextField
                    className="text-box custom-input-box"
                    id="name"
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  {formik.values.name.length == 0 ? (
                    <p style={{ color: "red" }}> Name field can't be empty</p>
                  ) : null}
                </Box>

                <Box m={2}>
                  <TextField
                    className="text-box custom-input-box"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  {formik.values.email.length == 0 ? (
                    <p style={{ color: "red" }}> Email field can't be empty</p>
                  ) : null}
                </Box>

                <Box m={2}>
                  <TextField
                    className="text-box custom-input-box"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  {formik.values.password.length < 8 ? (
                    <p style={{ color: "red" }}>
                      {" "}
                      Password field can't be less than 8 characters
                    </p>
                  ) : null}
                </Box>

                <Box m={2} className="custom-btn-group">
                  <Button
                    variant="contained"
                    style={cancelButtonStyles}
                    type="submit"
                    onClick={handleClosePopUp}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={formik.handleSubmit}
                    onClick={handleSubmit}
                    disabled={isDisabled}
                  >
                    Create Account
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
};

export default CreateAccountPopUp;
