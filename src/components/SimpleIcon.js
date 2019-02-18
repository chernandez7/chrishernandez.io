import React from "react";
import Icon from "react-simple-icons";
import styled from "styled-components";

const StyledAnchor = styled.a`
  padding: 28px;
`;

const SimpleIcon = ({ icon, href, color, size }) => (
  <StyledAnchor href={href}>
    <Icon name={icon} fill={color || "#937341"} size={size || 36} />
  </StyledAnchor>
);

export default SimpleIcon;
