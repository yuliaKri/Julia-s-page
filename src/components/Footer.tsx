import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterShell = styled.footer`
  position: relative;
  z-index: 2;
  padding: 24px clamp(20px, 5vw, 72px) 14px;
  background: #08080a;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  color: #ffffff;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
`;

const ConnectLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 14px;
  font-family: Georgia, 'Times New Roman', serif;

  strong {
    color: transparent;
    background-image: linear-gradient(90deg, #e879a5 50%, #ffffff 50%);
    background-position: 100%;
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: clamp(21px, 1.8vw, 24px);
    font-weight: 600;
    line-height: 24px;
    transition: background-position 0.5s linear;
  }

  span {
    display: inline-block;
    flex: 0 0 auto;
    width: 25px;
    height: 8px;
    background-image: linear-gradient(90deg, #e879a5 50%, #ffffff 50%);
    background-position: 100%;
    background-size: 200% 100%;
    clip-path: polygon(
      0 38%,
      77% 38%,
      68% 0,
      75% 0,
      100% 50%,
      75% 100%,
      68% 100%,
      77% 62%,
      0 62%
    );
    transition: background-position 0.2s linear 0.4s;
  }

  &:hover strong,
  &:focus-visible strong,
  &:hover span,
  &:focus-visible span {
    background-position: 0;
  }
`;

const FooterDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) repeat(3, auto);
  gap: 14px 36px;
  align-items: end;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 22px;
  }
`;

const FooterBrand = styled(Link)`
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 750;
  letter-spacing: 0.08em;
`;

const Detail = styled.div`
  display: grid;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.78);

  span {
    color: rgba(255, 255, 255, 0.38);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  a:hover {
    color: #ffffff;
  }

  a,
  p {
    overflow-wrap: anywhere;
  }
`;

const Copyright = styled.p`
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 11px;
`;

export const Footer: React.FC = () => (
  <FooterShell>
    <FooterInner>
      <ConnectLink to="/contact">
        <strong>Let's Connect</strong>
        <span aria-hidden="true" />
      </ConnectLink>

      <FooterDetails>
        <FooterBrand to="/">YULIA</FooterBrand>
        <Detail>
          <span>Email</span>
          <a href="mailto:juliya.krivorotko@gmail.com">juliya.krivorotko@gmail.com</a>
        </Detail>
        <Detail>
          <span>Phone</span>
          <a href="tel:+14033692188">+1 (403) 369-2188</a>
        </Detail>
        <Detail>
          <span>Based in</span>
          <p>Calgary, Alberta, Canada</p>
        </Detail>
      </FooterDetails>

      <Copyright>© {new Date().getFullYear()} YULIA. All rights reserved.</Copyright>
    </FooterInner>
  </FooterShell>
);
