import styled from "styled-components";

export const Container = styled.div`
overflow: hidden;
`;


export const ContentContainer = styled.div`
width: 100%;
height: calc(100vh - 72px);
`;

export const Footer = styled.footer`
position:fixed;
bottom:0;
width: calc(100% - 32px);
max-width: calc(100% - 32px);
height: 72px;
display:flex;
flex-direction: row;
align-items: flex-end;
justify-content: space-between;
overflow: hidden;
margin: 8px 16px;
`;

export const NameContainer = styled.div`
display:flex;
flex-direction: row;
align-items: flex-end;
`;

export const Name = styled.h1`
color:white;
font-weight: 400;
margin: 0px;
padding:0px;
`;

export const Subtitle = styled.h3`
color:lightgray;
font-weight: 400;
margin: 0px;
padding:0px;
text-decoration: none;
margin: 0px 0px 0px 16px;

:hover {
    cursor:pointer;
    color:gold;
}
`;

export const SocialIcons = styled.div`
display:flex;
flex-direction:row;
justify:flex-end;
`;

export const Social = styled.img`
width:50px;
height:50px;
border-radius: 50%;
background-color:gold;
border: 2px solid gold;
margin: 0px 8px;
`;