import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import { SimpleIcon } from "../components";

const Heading = () => (
  <HeadingContainer>
    <StyledLink to="/">
      <Name>{`Christopher Hernandez`}</Name>
    </StyledLink>
    <Subtitle>
      {`Co-Founder, CTO   @ `}
      <StyledAnchor href="https://own-the-spot.com">
        Own It Technologies, Inc.
      </StyledAnchor>
    </Subtitle>
    <Subtitle>
      {`Front End Engineer @ `}
      <StyledAnchor href="https://alluxo.com">Alluxo, Inc.</StyledAnchor>
    </Subtitle>
    <Subtitle>
      {`Front End Engineer  @ `}
      <StyledAnchor href="https://www.hyfyconcerts.com/">
        The Authentic Company, Inc.
      </StyledAnchor>
    </Subtitle>
    <IconContainer>
      <SimpleIcon icon={"github"} href={"https://github.com/chernandez7"} />
      {/* <SimpleIcon icon={"gitlab"} href={"https://gitlab.com/chernandez7"} /> */}
      <SimpleIcon icon={"twitter"} href={"https://twitter.com/_chernandez7"} />
      <SimpleIcon
        icon={"linkedin"}
        href={"https://www.linkedin.com/in/chernandez0/"}
      />
    </IconContainer>
  </HeadingContainer>
);

export default Heading;

const HeadingContainer = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 40%;
  transform: translateY(-40%);
`;

const Name = styled.h1`
  color: #937341;
  margin: 0rem;
  font-size: 3rem;
  :hover {
    color: #a3997e;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Subtitle = styled.p`
  color: #72777f;
  font-size: 1.4rem;
`;

const StyledAnchor = styled.a`
  color: #937341;
  font-size: 1.4rem;
  text-decoration: none;
  :hover {
    color: #a3997e;
  }
`;

const IconContainer = styled.div`
  margin-top: 48px;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
