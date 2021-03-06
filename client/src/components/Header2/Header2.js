import React, { Component } from "react";
import {
  TopCorner,
  HeaderDiv,
  HeaderImg,
  Links,
  Div
} from "../Header2/Header2.style.js";
import football from "../../assets/images/football.png";

class Header2 extends Component {
  render() {
    return (
      <HeaderDiv>
        <HeaderImg src={football} alt="Logo" />
        <TopCorner>Top Corner</TopCorner>
        <Div>
          <Links to="/profile">Edit Info</Links>
          <Links to="/predictions">Skip</Links>
        </Div>
      </HeaderDiv>
    );
  }
}

export default Header2;
