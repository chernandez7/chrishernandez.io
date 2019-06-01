import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { Layout } from "../components";
import "./index.css";

const ALLOWED_BANKS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class sp404 extends React.Component {
  state = {
    files: [],
    currentBank: "A",
    playing: null
  };

  componentDidMount() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
  }

  handleFileSelect = e => {
    let files = e.target.files;
    let fileArray = [];
    Object.values(files).forEach(f => {
      if (f.type === "audio/wav") fileArray.push(f);
    });
    this.setState({ files: fileArray });
  };

  generateFileName = (bank, pad) => {
    if (pad < 10) return `${bank}000000${pad}.WAV`;
    return `${bank}00000${pad}.WAV`;
  };

  handleClickBank = (bank, pad) => {
    const { files } = this.state;
    console.log(bank, pad);
    if (ALLOWED_BANKS.indexOf(bank) !== -1) {
      let fileName = this.generateFileName(bank, pad);

      files.forEach(f => {
        if (f.name === fileName) {
          this.playSample(f);
          this.setState({ playing: `${bank}${pad}` });
        }
      });
    }
  };

  playSample = sample => {
    let audio = document.getElementById("audioPlayer");
    audio.src = URL.createObjectURL(sample);
    audio.play();

    audio.addEventListener(
      "ended",
      () => {
        this.stopSample();
      },
      false
    );
  };

  stopSample = () => {
    let audio = document.getElementById("audioPlayer");
    audio.pause();
    audio.currentTime = 0;
    this.setState({ playing: null });
  };

  render() {
    const { files, currentBank, playing } = this.state;
    return (
      <React.Fragment>
        <audio id="audioPlayer">audio not supported on this browser :(</audio>
        <Link to="/">
          <DontClickThis>
            <Dont>{`back home`}</Dont>
          </DontClickThis>
        </Link>
        <Layout>
          <OuterContainer>
            <InfoContainer>
              <Instructions>{`Instructions:`}</Instructions>
              <Instructions>{`Find your SP404 SD Card folder (ex. H:\\ROLAND\\SP-404SX\\SMPL), then load all the samples. They should look something like A0000002.WAV, F0000002.WA, etc.`}</Instructions>
              <Instructions>{`Now you should be able to switch between the banks and play your samples!`}</Instructions>
              <Warning>{`My original intent was to make a simple tool where you can add and copy samples with ease. Unfortunately this isn't allowed because it's a security issue on web :(`}</Warning>
            </InfoContainer>
            <Container>
              <Sidebar>
                <FileInput
                  type="file"
                  onChange={this.handleFileSelect}
                  multiple
                  accept="audio/*"
                />
                <CurrentBank>Files Loaded:</CurrentBank>
                {files.map(f => (
                  <CurrentBank key={f.name}>{f.name}</CurrentBank>
                ))}
              </Sidebar>
              <MainContentContainer>
                <SPContainer
                  currentBank={currentBank}
                  stopSample={this.stopSample}
                  handleClickBank={this.handleClickBank}
                  playing={playing}
                  updateBank={e =>
                    this.setState({
                      currentBank: e.target.value
                    })
                  }
                />
              </MainContentContainer>
            </Container>
          </OuterContainer>
        </Layout>
      </React.Fragment>
    );
  }
}

export default sp404;

const SPContainer = ({
  currentBank,
  updateBank,
  handleClickBank,
  playing,
  stopSample
}) => (
  <Bank>
    <BankContainer>
      <CurrentBank>{`Current Bank`}</CurrentBank>
      <FileSelect onChange={e => updateBank(e)} value={currentBank}>
        {ALLOWED_BANKS.map(b => (
          <option value={b} key={b}>
            {b}
          </option>
        ))}
      </FileSelect>
    </BankContainer>
    <Row>
      {[1, 2, 3, 4].map(i => {
        let isPlaying = playing === `${currentBank}${i}`;
        return (
          <Pad
            onClick={
              isPlaying
                ? () => stopSample()
                : () => handleClickBank(currentBank, i)
            }
            isPlaying={isPlaying}
            key={i}
          >
            <span>{i}</span>
          </Pad>
        );
      })}
    </Row>
    <Row>
      {[5, 6, 7, 8].map(i => {
        let isPlaying = playing === `${currentBank}${i}`;
        return (
          <Pad
            onClick={
              isPlaying
                ? () => stopSample()
                : () => handleClickBank(currentBank, i)
            }
            isPlaying={isPlaying}
            key={i}
          >
            <span>{i}</span>
          </Pad>
        );
      })}
    </Row>
    <Row>
      {[9, 10, 11, 12].map(i => {
        let isPlaying = playing === `${currentBank}${i}`;
        return (
          <Pad
            onClick={
              isPlaying
                ? () => stopSample()
                : () => handleClickBank(currentBank, i)
            }
            isPlaying={isPlaying}
            key={i}
          >
            <span>{i}</span>
          </Pad>
        );
      })}
    </Row>
  </Bank>
);

const FileInput = styled.input`
  margin-top: 10px;
  color: #a3997e;
  font-size: 1rem;
`;

const FileSelect = styled.select`
  color: #a3997e;
  font-size: 1rem;
`;

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  max-width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  border: solid 1px #a3997e;
  overflow-y: auto;

  @media (max-width: 900px) {
    width: 80%;
    height: 100px;
  }
`;

const Bank = styled.div`
  width: 500px;
  max-width: 500px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  border: solid 1px #a3997e;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

const Row = styled.div`
  width: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Pad = styled.div`
  width: 50px;
  height: 50px;
  border: solid 1px #a3997e;
  margin: 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  background-color: ${props => (props.isPlaying ? "green" : "")};

  & span {
    color: #a3997e;
    font-size: 1rem;
  }

  :hover {
    cursor: pointer;
    background-color: #a3997e;

    & span {
      color: #222;
    }
  }
`;

const BankContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const CurrentBank = styled.h1`
  color: #a3997e;
  font-size: 1rem;
`;

const Instructions = styled.h1`
  color: #a3997e;
  font-size: 1.2rem;

  @media (max-width: 900px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Warning = styled.h1`
  color: #937341;
  font-size: 1.2rem;

  @media (max-width: 900px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
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
