import { useState, useEffect } from "react";
import useUserContext from "../hooks/useUserContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import LoginPopUp from "./popups/LoginPopup";

import createTransaction from "../helpers/createTransaction";

const Deposit = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser, loggedInUser, setLoggedInUser } = useUserContext();
  const [balance, setBalance] = useState();

  const [isLoginPopUp, setIsLoginPopUp] = useState(false);

  const toggleLoginPopUp = () => {
    setIsLoginPopUp(!isLoginPopUp);
  };

  const validationSchema = yup.object({
    depositAmount: yup
      .number()
      .min(1, "Must be greater or equal than $1")
      .required("Deposit Amount is required")
      .typeError("The deposit amount must be a number"),
  });

  function handle() {
    const depAmount = parseFloat(formik.values.depositAmount);
    // //("depAmount===>", depAmount, "email", loggedInUser);
    fetch(
      `https://badbankbackend-81d3d9e49e8f.herokuapp.com/account/update/${loggedInUser.email}/${depAmount}`
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        //("login new", data);
        formik.resetForm();
        toast.success(`${data.data}!`);

        return;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the fetch request
      });
  }

  const formik = useFormik({
    initialValues: {
      depositAmount: "",
    },

    validationSchema: validationSchema,

    onSubmit: () => {
      //Verify if there's logged in user
      if (!loggedInUser) {
        toast.error("Please login to make a successful transaction");
        return;
      }

      const depAmount = parseFloat(formik.values.depositAmount);
      let newBalance = 0;
      const newData = user.map((u) => {
        if (u.email === loggedInUser.email) {
          u.balance += depAmount;
          newBalance = u.balance;
          const newTransaction = createTransaction("Deposit", depAmount);
          u.transactionHistory.push(newTransaction);
          setBalance(u.balance);
        }
        return u;
      });

      setUser(newData);
      setLoggedInUser((prev) => ({ ...prev, balance: newBalance }));
      formik.resetForm();
      toast.success("Deposit successful");
      return;
    },
  });

  //Get initial balance
  useEffect(() => {
    if (loggedInUser) {
      setBalance(loggedInUser.balance);
    }
  }, [loggedInUser]);

  //Listen for formik values changes
  useEffect(() => {
    const { depositAmount } = formik.values;

    if (depositAmount.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formik.values]);

  const customStyles = {
    width: "fit-content",
  };

  return (
    <>
      {isLoginPopUp && <LoginPopUp handleClose={toggleLoginPopUp} />}
      {!loggedInUser ? (
        <>
          <h3>Deposit</h3>
          <p>Please login to your account</p>
          {/* <a onClick={toggleLoginPopUp()}></a> */}
          <span
            onClick={toggleLoginPopUp}
            className="nav-link clickable"
            style={{ color: "red" }}
          >
            LogIn
          </span>
        </>
      ) : (
        <div className="card" style={customStyles}>
          <div className="card-body">
            <div className="row">
              <h4>Deposit</h4>
              <h5 className="card-title">
                Your Balance <span>${balance}</span>
              </h5>
            </div>
            <div>
              <Box m={2}>
                <TextField
                  className="text-box custom-input-box"
                  id="depositAmount"
                  name="depositAmount"
                  label="Deposit Amount"
                  value={formik.values.depositAmount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.depositAmount &&
                    Boolean(formik.errors.depositAmount)
                  }
                  helperText={
                    formik.touched.depositAmount && formik.errors.depositAmount
                  }
                />
              </Box>
              <Box m={2}>
                <Button
                  variant="contained"
                  onClick={handle}
                  disabled={isDisabled}
                >
                  Deposit
                </Button>
              </Box>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Deposit;
