import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #ffffff;

  &:hover {
    opacity: 0.85;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const Header: React.FC = () => {
  return (
    <Nav>
      <Logo to="/">Yulia Krivorotko</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/places">Places</NavLink>
        <NavLink to="/stocks">Stocks</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </Nav>
  );
};
