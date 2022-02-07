import type { NextPage } from "next";
import Head from "next/head";

import {Container,Footer,NameContainer,Name,Subtitle,SocialIcons,Social} from "../styles/index.style"

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>{`Christopher Hernandez`}</title>
        <meta name={`description`} content={`Personal site and playground.`} />
        <link rel={`icon`} href={`/favicon.ico`} />
      </Head>
      <main>
      </main>
      <Footer>
        <NameContainer>
        <Name>{`Christopher Hernandez`}</Name>
        <a 
        href={`https://www.tempus.com`} 
        style={{textDecoration:`none`}} 
        target={`_blank`} 
        rel={`noopener noreferrer`}
        >
          <Subtitle>{`Senior Software Engineer @ Tempus`}</Subtitle>
        </a>
        </NameContainer>
        <SocialIcons>
        <a 
        href={`https://github.com/chernandez7`} 
        style={{textDecoration:`none`}} 
        target={`_blank`} 
        rel={`noopener noreferrer`}
        ><Social src={`/github.svg`} alt={`GitHub`}  /></a>
        <a 
        href={`https://www.linkedin.com/in/chernandez0/`} 
        style={{textDecoration:`none`}} 
        target={`_blank`} 
        rel={`noopener noreferrer`}
        ><Social src={`/linkedin.svg`} alt={`LinkedIn`}  /></a>
        <a 
        href={`https://twitter.com/_chernandez7`} 
        style={{textDecoration:`none`}} 
        target={`_blank`} 
        rel={`noopener noreferrer`}
        ><Social src={`/twitter.svg`} alt={`Twitter`}  /></a>
        <a 
        href={`https://www.youtube.com/channel/UC_gqo1mdnGCVYuNlZ5xCKTw`} 
        style={{textDecoration:`none`}} 
        target={`_blank`} 
        rel={`noopener noreferrer`}
        ><Social src={`/youtube.svg`} alt={`youtube`}  /></a></SocialIcons>
      </Footer>
    </Container>
  );
};

export default Home;
