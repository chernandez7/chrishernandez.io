import React from "react";
import styled from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

SyntaxHighlighter.registerLanguage("javascript", js);

const CodeModal = ({ close, show, code, copyToClipboard, codeCopied }) => (
  <div style={show ? { display: "block" } : { display: "none" }}>
    <ModalBackground>
      <ModalBody>
        <ModalHeaderContainer>
          <CloseModalContainer>
            <a onClick={close}>
              <span>X</span>
            </a>
          </CloseModalContainer>
        </ModalHeaderContainer>
        <CenteredContainer>
          <CodeContainer>
            <SyntaxHighlighter language="javascript" style={docco}>
              {code}
            </SyntaxHighlighter>
          </CodeContainer>
          <ButtonContainer onClick={copyToClipboard}>
            <Button>{codeCopied ? `Code Copied!` : `Copy Code`}</Button>
          </ButtonContainer>
        </CenteredContainer>
      </ModalBody>
    </ModalBackground>
  </div>
);

export default CodeModal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.67);
  color: #fff;
  z-index: 4;
`;

const ModalBody = styled.div`
  position: fixed;
  background-color: #222;
  width: 40%;
  height: 90%;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%);
  z-index: 5;
  flex-direction: column;
`;

const CenteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalHeaderContainer = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 0px;
`;

const CloseModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  :hover {
    cursor: pointer;
  }
`;

const CodeContainer = styled.div`
  margin-top: 20px;
  height: 80%;
  width: 60%;
  border-radius: 20px;
  font-size: 14px;
  background-color: #a3997e;
  justify-content: center;
  display: flex;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  width: 250px;
  height: 75px;
  background-color: #937341;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }
`;

const Button = styled.h1`
  padding-top: 20px;
  margin: 0px;
`;
