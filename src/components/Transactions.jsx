import useUserContext from "../hooks/useUserContext";

const Transactions = () => {
  const { loggedInUser } = useUserContext();

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
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>

          {transactionList.length === 0 ? (
            <>
              <tbody>
                <tr>
                  <td>No Transactions to show</td>
                </tr>
              </tbody>
            </>
          ) : (
            <tbody style={{ color: "white" }}>{transactionList}</tbody>
          )}
        </table>
      )}
    </>
  );
};

export default Transactions;
