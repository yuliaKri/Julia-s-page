import React from 'react';
import styled, { keyframes } from 'styled-components';
import aerLogo from '../assets/logos/aer.png';
import bayerLogo from '../assets/logos/bayer.svg';
import lodgeLinkLogo from '../assets/logos/lodgelink.svg';
import verbLogo from '../assets/logos/verb.svg';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 94px 48px 30px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(72, 49, 157, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(29, 78, 137, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(123, 44, 191, 0.2) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #111118 50%, #0a0a0a 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;

  @media (max-width: 640px) {
    padding: 92px 20px 52px;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 960px;
  text-align: center;
`;

const Kicker = styled.p`
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Headline = styled.h1`
  margin-bottom: 24px;
  color: #ffffff;
  font-size: clamp(32px, 4.5vw, 56px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -1.8px;

  span {
    background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #c084fc 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  max-width: 620px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.64);
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 300;
  line-height: 1.65;
`;

const CompaniesSection = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  margin-top: 34px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const CompaniesHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

const CompaniesTitle = styled.h2`
  color: #ffffff;
  font-size: clamp(24px, 3vw, 38px);
  font-weight: 600;
  letter-spacing: -0.035em;
`;

const CompaniesHint = styled.p`
  color: rgba(255, 255, 255, 0.42);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
`;

const CompanyLink = styled.a<{ $mobileOrder: number }>`
  min-height: 78px;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 170px 28px;
  align-items: center;
  gap: 22px;
  padding: 10px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  color: #ffffff;
  transition: padding 0.25s ease, background 0.25s ease;

  &:hover {
    padding-right: 18px;
    padding-left: 18px;
    background: rgba(255, 255, 255, 0.055);
  }

  &:hover > span:last-child {
    transform: translate(4px, -4px);
  }

  &:focus-visible {
    outline: 2px solid #a78bfa;
    outline-offset: -2px;
  }

  @media (max-width: 620px) {
    order: ${(p) => p.$mobileOrder};
    min-height: 82px;
    grid-template-columns: minmax(0, 1fr) 104px;
    gap: 14px;
    padding: 14px 4px;
  }
`;

const CompanyNumber = styled.span`
  color: rgba(255, 255, 255, 0.34);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;

  @media (max-width: 620px) {
    display: none;
  }
`;

const CompanyName = styled.span`
  font-size: clamp(19px, 2.3vw, 30px);
  font-weight: 500;
  letter-spacing: -0.035em;
  text-align: left;
`;

const LogoFrame = styled.span`
  width: 170px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: end;
  padding: 11px 18px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);

  @media (max-width: 620px) {
    width: 112px;
    height: 56px;
    padding: 9px 12px;
  }
`;

const CompanyLogo = styled.img`
  width: 100%;
  max-width: 138px;
  height: 38px;
  object-fit: contain;

  &.bayer {
    width: 52px;
    height: 44px;
  }
`;

const CompanyArrow = styled.span`
  justify-self: end;
  color: rgba(255, 255, 255, 0.74);
  font-size: 20px;
  transition: transform 0.2s ease;

  @media (max-width: 620px) {
    display: none;
  }
`;

const companies = [
  { name: 'LodgeLink', url: 'https://www.lodgelink.com/', logo: lodgeLinkLogo, mobileOrder: 2 },
  { name: 'Alberta Energy Regulator', url: 'https://www.aer.ca/', logo: aerLogo, mobileOrder: 1 },
  { name: 'VERB Interactive', url: 'https://www.verbinteractive.com/', logo: verbLogo, mobileOrder: 3 },
  { name: 'Bayer', url: 'https://www.bayer.com/', logo: bayerLogo, className: 'bayer', mobileOrder: 4 },
];

export const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <Content>
        <Kicker>Senior Software Engineer · Calgary, Canada</Kicker>
        <Headline>
          I Build <span>Custom Website Solutions</span> That Help Your Business Grow
        </Headline>
        <Subtitle>
          Turning ideas into elegant, high-performance digital experiences.
        </Subtitle>
      </Content>

      <CompaniesSection aria-labelledby="companies-title">
        <CompaniesHeader>
          <CompaniesTitle id="companies-title">Companies I’ve Worked At</CompaniesTitle>
          <CompaniesHint>Explore experience</CompaniesHint>
        </CompaniesHeader>
        <CompanyList>
          {companies.map((company, index) => (
            <CompanyLink
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name} website`}
              $mobileOrder={company.mobileOrder}
            >
              <CompanyNumber>0{index + 1}</CompanyNumber>
              <CompanyName>{company.name}</CompanyName>
              <LogoFrame>
                <CompanyLogo
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className={company.className}
                />
              </LogoFrame>
              <CompanyArrow aria-hidden="true">↗</CompanyArrow>
            </CompanyLink>
          ))}
        </CompanyList>
      </CompaniesSection>
    </PageWrapper>
  );
};
