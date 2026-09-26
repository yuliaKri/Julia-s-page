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
  gap: 24px;
  padding: 22px clamp(20px, 4vw, 48px);
  background: rgba(10, 10, 10, 0.82);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);

  @media (max-width: 560px) {
    gap: 12px;
    padding: 17px 16px;
  }
`;

const Logo = styled(Link)`
  flex: 0 0 auto;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 560px) {
    font-size: 16px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(14px, 2.5vw, 32px);

  @media (max-width: 560px) {
    gap: 10px;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 400;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

const ExternalNavLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 400;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const corporationUrl = 'https://corporation.juliya-krivorotko.workers.dev/';

export const Header: React.FC = () => {
  return (
    <Nav>
      <Logo to="/">YULIA KRIVOROTKO</Logo>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/places">Places</NavLink>
        <NavLink to="/stocks">Stocks</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <ExternalNavLink
          href={corporationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          2755269 Alberta Inc. ↗
        </ExternalNavLink>
      </NavLinks>
    </Nav>
  );
};
