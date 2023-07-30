import { useEffect, useState } from "react";

// import useUserContext from "../hooks/useUserContext";

const AllData = () => {
  // const { user } = useUserContext();
  const [user, setUsers] = useState([]);
  useEffect(() => {
    // /account/all

    fetch(`https://badbankbackend-81d3d9e49e8f.herokuapp.com/account/all`)
      // fetch(`http://localhost:5000/account/all`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // setData(data.data);
        setUsers(data.data);
        //("all data===> v", data);
        // formik.resetForm();
        // toast.success(`${data.data}!`);

        return;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any errors that occur during the fetch request
      });
  }, []);
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
