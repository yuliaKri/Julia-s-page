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
  min-height: 100vh;
  padding: 120px 48px 80px;
  overflow: hidden;

  /* Dark gradient background */
  background: radial-gradient(ellipse at 20% 50%, rgba(72, 49, 157, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(29, 78, 137, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(123, 44, 191, 0.2) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #111118 50%, #0a0a0a 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: #ffffff;
  margin-bottom: 24px;

  span {
    background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #c084fc 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const CompaniesSection = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1040px;
  margin-top: 64px;
  text-align: center;
`;

const CompaniesTitle = styled.h2`
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(17px, 2vw, 21px);
  font-weight: 500;
  letter-spacing: 0.02em;
`;

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const CompanyLink = styled.a`
  min-height: 116px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    background: #ffffff;
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.28);
  }

  &:focus-visible {
    outline: 3px solid #a78bfa;
    outline-offset: 3px;
  }
`;

const CompanyLogo = styled.img`
  width: 100%;
  max-width: 170px;
  height: 58px;
  object-fit: contain;

  &.bayer {
    width: 70px;
    height: 70px;
  }
`;

const companies = [
  { name: 'LodgeLink', url: 'https://www.lodgelink.com/', logo: lodgeLinkLogo },
  { name: 'Alberta Energy Regulator', url: 'https://www.aer.ca/', logo: aerLogo },
  { name: 'VERB Interactive', url: 'https://www.verbinteractive.com/', logo: verbLogo },
  { name: 'Bayer', url: 'https://www.bayer.com/', logo: bayerLogo, className: 'bayer' },
];

export const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      {/* Uncomment and set src when background video is ready:
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/path-to-video.mp4" type="video/mp4" />
      </VideoBackground>
      */}
      <Content>
        <Headline>
          I Build <span>Custom Website Solutions</span> That Help Your Business Grow
        </Headline>
        <Subtitle>Turning ideas into elegant, high-performance digital experiences.</Subtitle>
      </Content>
      <CompaniesSection aria-labelledby="companies-title">
        <CompaniesTitle id="companies-title">Companies I’ve Worked At</CompaniesTitle>
        <CompanyGrid>
          {companies.map((company) => (
            <CompanyLink
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name} website`}
            >
              <CompanyLogo
                src={company.logo}
                alt={`${company.name} logo`}
                className={company.className}
              />
            </CompanyLink>
          ))}
        </CompanyGrid>
      </CompaniesSection>
    </PageWrapper>
  );
};
