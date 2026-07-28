import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  background:
    radial-gradient(ellipse at 20% 50%, rgba(72, 49, 157, 0.35) 0%, transparent 50%),
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
        <Subtitle>
          Turning ideas into elegant, high-performance digital experiences.
        </Subtitle>
      </Content>
    </PageWrapper>
  );
};
