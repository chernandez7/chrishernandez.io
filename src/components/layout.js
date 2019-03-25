import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const Container = styled.div`
  background-color: #222;
  height: 100vh;
  width: 100vw;

  @media (max-width: 500px) {
    overflow-y: auto;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: "Personal site for Christopher Hernandez"
            },
            {
              name: "keywords",
              content: "Christopher, Hernandez, software, engineer"
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        {children}
      </Container>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
