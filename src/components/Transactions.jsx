import { useEffect, useState } from "react";
import useUserContext from "../hooks/useUserContext";

const Transactions = () => {
  const { loggedInUser } = useUserContext();
  const [data, setData] = useState({});
  useEffect(() => {
    //("helloo loggedInUser", loggedInUser);
    // /account/all
    fetch(
      `https://badbankbackend-81d3d9e49e8f.herokuapp.com/account/findOne/${loggedInUser.email}`
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setData(data.data);
        //("all data===>", data);
        // formik.resetForm();
        // toast.success(`${data.data}!`);

        return;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the fetch request
      });
  }, []);
  //("all data===>x", data);

  const transactionList = loggedInUser?.transactionHistory?.map(
    (transaction, i) => {
      return (
        <tr key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <td component="th" scope="row">
            {transaction.date}
          </td>
          <td align="right">{transaction.type}</td>
          <td align="right">{transaction.amount}</td>
        </tr>
      );
    }
  );

  return (
    <>
      {!loggedInUser ? (
        <p>Please login to your account</p>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Remaining Balance</th>
            </tr>
          </thead>

          {data === null ? (
            <>
              <tbody>
                <tr>
                  <td>No Transactions to show</td>
                </tr>
              </tbody>
            </>
          ) : (
            <tbody style={{ color: "white" }}>
              <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.balance}</td>
              </tr>
            </tbody>
          )}
        </table>
      )}
    </>
  );
};

export default Transactions;
