import useUserContext from "../hooks/useUserContext";
import Transactions from "./Transactions";

const UserAccount = () => {
  const { loggedInUser } = useUserContext();

  return (
    <>
      <div className="userInfo-container">
        <h5>Name: {loggedInUser.name}</h5>
        <h5>Email: {loggedInUser.email}</h5>
        <h6>Current Balance</h6>
        <h6>${loggedInUser.balance}</h6>
      </div>
      <div className="report-container">
        <div>
          <h5>Transactions</h5>
          <Transactions />
        </div>
      </div>
    </>
  );
};

export default UserAccount;
