import useUserContext from "../hooks/useUserContext";

const AllData = () => {
  const { user } = useUserContext();
  const usersList = user.map((user, i) => {
    return (
      <tr key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <td style={{ color: "white" }}>{user.name}</td>
        <td style={{ color: "white" }}>{user.email}</td>
        <td style={{ color: "white" }}>{user.password}</td>
        <td style={{ color: "white" }}>${user.balance}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>AllData</h1>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </>
  );
};

export default AllData;
