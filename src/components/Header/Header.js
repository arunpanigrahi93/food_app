/* eslint-disable jsx-a11y/img-redundant-alt */
import "./Header.css";
import background from "../../assets/header_img.png";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        {/* <h2>Order your favouritr food here</h2>
        <p>Choose from a wide variety of dishes</p> */}
        <img
          src={background}
          alt="Description of the image"
          className="header-image"
        />
        {/* <button>View Menu</button> */}
      </div>
    </div>
  );
};

export default Header;
