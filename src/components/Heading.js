import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { SimpleIcon } from "../components";

import Gitlab from "../images/gitlab.svg";
import Me from "../images/me.png";

const Heading = () => (
  <React.Fragment>
    <DontClickThis>
      <Link to="/chartjs">
        <Dont>{`don't click this`}</Dont>
      </Link>
      <Link to="/sp404">
        <Dont>{`or this`}</Dont>
      </Link>
    </DontClickThis>
    <HeadingContainer>
      <ImageContainer>
        <Myself src={Me} alt="Chris" />
      </ImageContainer>
      <StyledLink to="/">
        <Name>{`Christopher Hernandez`}</Name>
      </StyledLink>
      <Subtitle>
        {`Co-Founder, CTO @ `}
        <StyledAnchor href="https://own-the-spot.com">
          Own It Technologies, Inc.
        </StyledAnchor>
      </Subtitle>
      <Subtitle>
        {`Front End Engineer @ `}
        <StyledAnchor href="https://alluxo.com">Alluxo, Inc.</StyledAnchor>
      </Subtitle>
      <IconContainer>
        <SimpleIcon icon={"github"} href={"https://github.com/chernandez7"} />
        <a href={"https://gitlab.com/chernandez7"}>
          <GitlabIcon src={Gitlab} alt="gitlab" />
        </a>
        <SimpleIcon
          icon={"twitter"}
          href={"https://twitter.com/_chernandez7"}
        />
        <SimpleIcon
          icon={"linkedin"}
          href={"https://www.linkedin.com/in/chernandez0/"}
        />
      </IconContainer>
    </HeadingContainer>
  </React.Fragment>
);

export default Heading;

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
`;

const Name = styled.h1`
  color: #937341;
  margin: 0rem;
  font-size: 3rem;
  :hover {
    color: #a3997e;
  }

  @media (max-width: 500px) {
    margin: 0rem;
    font-size: 2rem;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Subtitle = styled.p`
  color: #72777f;
  font-size: 1.4rem;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const StyledAnchor = styled.a`
  color: #937341;
  font-size: 1.4rem;
  text-decoration: none;
  :hover {
    color: #a3997e;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  margin-top: 20px;
  width: 500px;
  text-align: center;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const GitlabIcon = styled.img`
  width: 36px;
  height: 36px;
  padding-left: 28px;
  padding-right: 28px;
  margin: 0px;

  @media (max-width: 500px) {
    padding-left: 14px;
    padding-right: 14px;
  }
`;

const DontClickThis = styled.div`
  position: absolute;
  padding: 10px;
  top: 0;
  right: 0;
`;

const Dont = styled.h1`
  color: #937341;
  font-size: 1rem;
  text-decoration: none;
  :hover {
    color: #a3997e;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Myself = styled.img`
  width: 400px;
  opacity: 0.05;
  margin-top: 30px;
  margin-bottom: 50px;

  @media (max-width: 500px) {
    width: 90%;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;
