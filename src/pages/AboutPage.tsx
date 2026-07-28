import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.main`
  min-height: 100vh;
  padding: 140px 48px 80px;
  background:
    radial-gradient(ellipse at 30% 30%, rgba(72, 49, 157, 0.2) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #111118 100%);
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #ffffff;
  margin-bottom: 32px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 20px;
`;

export const AboutPage: React.FC = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>About</Title>
        <Text>
          I'm Julia — a developer passionate about crafting modern, performant
          websites that solve real business problems. From concept to launch, I
          work closely with clients to deliver solutions that look great and
          drive results.
        </Text>
        <Text>More coming soon.</Text>
      </Container>
    </PageWrapper>
  );
};
