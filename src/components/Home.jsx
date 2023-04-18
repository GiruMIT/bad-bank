import { useState } from "react";

const Home = () => {
  const [isAboutPopUp, setIsAboutPopUp] = useState(false);

  const toggleAboutPopUp = () => {
    setIsAboutPopUp(!isAboutPopUp);
  };

  const customStyles = {
    width: "25rem",
    padding: "10px",
    zIndex: "-1",
  };

  return (
    <>
      <div className="card-container">
        <div className="card" style={customStyles}>
          <h5 className="card-title">Bad & Bank</h5>
          {/* <img src="/images/imageBank2.png" className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <p className="card-text">A Bank you can always rely on!</p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Home;
