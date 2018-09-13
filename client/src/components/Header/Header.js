import React, { Component } from "react";
import { HeaderDiv, HeaderImg } from "./Header.style.js";
import football from "../../assets/images/football.png";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <HeaderDiv>
        <HeaderImg src={football} alt="Logo" />
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/Signup">Sign Up </Link>
      </HeaderDiv>
    );
  }
}

export default Header;
