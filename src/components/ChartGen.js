import React from "react";
import styled from "styled-components";
import Chart from "react-simple-chartjs";
import Switch from "react-toggle-switch";
import ColorPicker from "rc-color-picker";
import Theme from "../config/Theme";
import "rc-color-picker/assets/index.css";
import "react-toggle-switch/dist/css/switch.min.css";
import "./ChartGen.css";

class ChartGen extends React.Component {
  state = {
    backgroundColor: "#a3997e",
    borderColor: Theme.primaryDark,
    fill: false,
    responsive: true,
    shouldMaintainAspectRatio: false,
    shouldShowTitle: true,
    titleFontSize: 24,
    showTooltips: true,
    tooltipBackgroundColor: Theme.text,
    tooltipTitleFontSize: 20,
    tooltipTitleFontColor: Theme.primaryDark,
    tooltipBodyFontSize: 18,
    tooltipBodyFontColor: Theme.primaryDark,
    displayXAxis: true,
    displayXAxisGridlines: true,
    displayXAxisTicks: true,
    beginXAxisAtZero: true,
    displayYAxis: true,
    displayYAxisGridlines: true,
    displayYAxisTicks: true,
    beginYAxisAtZero: true,
    width: 500,
    height: 250,
    title: "Very Cool Chart",
    chartType: "Vertical Bar",
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Feb",
      "March",
      "April",
      "May",
      "Feb",
      "March",
      "April",
      "May",
      "Feb",
      "March",
      "April",
      "May",
      "Feb",
      "March",
      "April"
    ],
    data: [1, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 8, 14, 7]
  };

  randomColor = () => {
    let r = this.randomFromRange(0, 255);
    let g = this.randomFromRange(0, 255);
    let b = this.randomFromRange(0, 255);
    let a = this.randomFromRange(0, 9);
    return `rgba(${r},${g},${b},${a / 10})`;
  };

  randomFromRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  randomBool = () => {
    let n = this.randomFromRange(0, 1);
    return !!n;
  };

  generateCode = () => {};

  randomize = () => {
    // Chart Type
    let chartTypeNum = this.randomFromRange(0, 3);
    let chartType =
      chartTypeNum === 0
        ? "Vertical Bar"
        : chartTypeNum === 1
        ? "Horizontal Bar"
        : chartTypeNum === 2
        ? "Simple Line"
        : "Area Chart";
    // Fill
    let fill = this.randomBool();
    if (chartType === "Area Chart") fill = 1;
    if (chartType === "Simple Line") fill = 0;
    // Background Color
    let backgroundColor = this.randomColor();
    // Border Color
    let borderColor = this.randomColor();
    // Responsive
    let responsive = this.randomBool();
    // Aspect Ration
    let shouldMaintainAspectRatio = this.randomBool();
    // Show Legend
    let shouldShowLegend = this.randomBool();

    this.setState({
      chartType,
      fill,
      backgroundColor,
      borderColor,
      responsive,
      shouldMaintainAspectRatio,
      shouldShowLegend
    });
  };

  render() {
    const {
      title,
      fill,
      chartType,
      labels,
      data,
      backgroundColor,
      borderColor,
      responsive,
      shouldMaintainAspectRatio,
      shouldShowLegend
    } = this.state;
    return (
      <Container>
        <FormContainer>
          <Label>Title</Label>
          <TextInput
            type="text"
            placeholder="Enter a Title..."
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <SwitchContainer>
            <Label>Fill</Label>
            <Switch
              onClick={() =>
                this.setState({
                  fill: !fill
                })
              }
              on={fill}
            />
          </SwitchContainer>
          <SwitchContainer>
            <Label>Responsive</Label>
            <Switch
              onClick={() =>
                this.setState({
                  responsive: !responsive
                })
              }
              on={responsive}
            />
          </SwitchContainer>
          <SwitchContainer>
            <Label>Maintain Aspect Ration</Label>
            <Switch
              onClick={() =>
                this.setState({
                  shouldMaintainAspectRatio: !shouldMaintainAspectRatio
                })
              }
              on={shouldMaintainAspectRatio}
            />
          </SwitchContainer>
          <SwitchContainer>
            <Label>Should Show Legend</Label>
            <Switch
              onClick={() =>
                this.setState({
                  shouldShowLegend: !shouldShowLegend
                })
              }
              on={shouldShowLegend}
            />
          </SwitchContainer>
          <SelectContainer>
            <Label>Chart Type</Label>
            <select
              value={chartType}
              onChange={e =>
                this.setState({
                  chartType: e.target.value
                })
              }
            >
              <option value="" selected>
                Select a Chart Type...
              </option>
              <option value={"Vertical Bar"}>Vertical Bar</option>
              <option value={"Horizontal Bar"}>Horizontal Bar</option>
              <option value={"Simple Line"}>Simple Line</option>
              <option value={"Area Chart"}>Area Chart</option>
            </select>
          </SelectContainer>
          <ColorPickerContainer>
            <Label>Background Color</Label>
            <ColorPicker
              animation="slide-up"
              color={backgroundColor}
              onChange={color =>
                this.setState({ backgroundColor: color.color })
              }
            />
          </ColorPickerContainer>
          <ColorPickerContainer>
            <Label>Border Color</Label>
            <ColorPicker
              animation="slide-up"
              color={borderColor}
              onChange={color => this.setState({ borderColor: color.color })}
            />
          </ColorPickerContainer>
          <ButtonsContainer>
            <GenerateCodeContainer>
              <GenerateCode
                onClick={this.generateCode}
              >{`Generate Code`}</GenerateCode>
            </GenerateCodeContainer>
            <GenerateRandomContainer onClick={this.randomize}>
              <GenerateRandom>{`Random Chart`}</GenerateRandom>
            </GenerateRandomContainer>
          </ButtonsContainer>
        </FormContainer>
        <ChartContainer>
          <Chart
            chartType={chartType}
            labels={labels}
            data={data}
            title={title}
            options={this.state}
          />
        </ChartContainer>
      </Container>
    );
  }
}

export default ChartGen;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  width: calc(100% - 100px);
  height: calc(50% - 100px);
  margin: 50px;
  background-color: #72777f;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.h1`
  margin: 20px;
`;

const TextInput = styled.input`
  margin: 20px;
`;

const SwitchContainer = styled.div`
  margin: 20px;
`;

const ButtonsContainer = styled.div``;

const GenerateCodeContainer = styled.div`
  border-color: #937341;
  border-width: 1px;
  :hover {
    cursor: pointer;
  }
`;

const GenerateCode = styled.h1``;

const GenerateRandomContainer = styled.div`
  border-color: #937341;
  border-width: 1px;
  :hover {
    cursor: pointer;
  }
`;

const SelectContainer = styled.div``;

const ColorPickerContainer = styled.div``;

const GenerateRandom = styled.h1``;

const ChartContainer = styled.div`
  width: calc(100% - 100px);
  height: calc(50% - 100px);
  margin: 50px;
  background-color: #937341;
`;
