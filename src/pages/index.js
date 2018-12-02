import React from "react";
import Link from "gatsby-link";
import Layout from "../components/layout";
import styled from "styled-components";
import "./index.css";

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

const Heading = () => (
  <HeadingContainer>
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
      {`Engineer @ `}
      <StyledAnchor href="https://alluxo.com">Alluxo, Inc.</StyledAnchor>
    </Subtitle>
    <br />
    <Subtitle>
      {`Under Construction... Being rebuilt with `}
      <StyledAnchor href="https://www.gatsbyjs.org">GatsbyJS</StyledAnchor>
    </Subtitle>
  </HeadingContainer>
);

const IndexPage = () => (
  <Layout>
    <Heading />
  </Layout>
);

export default IndexPage;
