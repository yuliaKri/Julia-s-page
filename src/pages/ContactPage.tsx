import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.main`
  min-height: calc(100svh - 190px);
  padding: 116px 48px 46px;
  background:
    radial-gradient(ellipse at 70% 40%, rgba(29, 78, 137, 0.2) 0%, transparent 50%),
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

const EmailLink = styled.a`
  color: transparent;
  background-image: linear-gradient(90deg, #e879a5 50%, #a78bfa 50%);
  background-position: 100%;
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: 500;
  transition: background-position 0.5s linear;

  &:hover,
  &:focus-visible {
    background-position: 0;
  }
`;

export const ContactPage: React.FC = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>Contact</Title>
        <Text>
          Have a project in mind? I'd love to hear about it. Reach out and
          let's talk about how I can help your business grow.
        </Text>
        <Text>
          Email: <EmailLink href="mailto:juliya.krivorotko@gmail.com">juliya.krivorotko@gmail.com</EmailLink>
        </Text>
        <Text>
          Phone: <EmailLink href="tel:+14033692188">+1 (403) 369-2188</EmailLink>
        </Text>
      </Container>
    </PageWrapper>
  );
};
