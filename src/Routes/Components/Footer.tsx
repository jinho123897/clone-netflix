import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Wrapper = styled.footer`
  width: 100%;
  padding: 0 70px 50px;
  color: #666;
  p {
    margin: 20px 0 10px;
  }
`;

const Sns = styled.div`
  display: flex;
  gap: 10px;
  font-size: 30px;
  color: white;
`;

function Footer() {
  return (
    <Wrapper>
      <Sns>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </Sns>
      <p>copyright © Nonflix clone</p>
      <address>주소 : 서울특별시</address>
    </Wrapper>
  );
}

export default Footer;
