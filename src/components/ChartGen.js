import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Chart from "react-simple-chartjs";
import Switch from "react-toggle-switch";
import ColorPicker from "rc-color-picker";

import CodeModal from "./CodeModal";
import SimpleIcon from "./SimpleIcon";
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
    shouldShowLegend: false,
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
    data: [1, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 8, 14, 7],
    code: "",
    showModal: false,
    codeCopied: false
  };

  copyToClipboard = () => {
    const { code } = this.state;
    const el = document.createElement("textarea");
    el.value = code;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ codeCopied: true });
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

  getQuotedTemplateString = s => {
    return `"${s}"`;
  };

  generateCode = () => {
    const {
      title,
      chartType,
      backgroundColor,
      fill,
      borderColor,
      responsive,
      shouldMaintainAspectRatio,
      shouldShowLegend,
      shouldShowTitle,
      titleFontSize,
      showTooltips,
      tooltipBackgroundColor,
      tooltipTitleFontSize,
      tooltipTitleFontColor,
      tooltipBodyFontSize,
      tooltipBodyFontColor,
      displayXAxis,
      displayXAxisGridlines,
      displayXAxisTicks,
      beginXAxisAtZero,
      displayYAxis,
      displayYAxisGridlines,
      displayYAxisTicks,
      beginYAxisAtZero,
      width,
      height
    } = this.state;

    let code = `import Chart from "react-simple-chartjs";

<Chart
  chartType={${this.getQuotedTemplateString(chartType)}}
  title={${this.getQuotedTemplateString(title)}}
  labels={ENTER_YOUR_LABELS_HERE}
  data={ENTER_YOUR_DATA_HERE}
  options={{
    backgroundColor: ${this.getQuotedTemplateString(backgroundColor)}
    fill: ${fill}
    borderColor: ${this.getQuotedTemplateString(borderColor)}
    responsive: ${responsive}
    shouldMaintainAspectRatio: ${shouldMaintainAspectRatio}
    shouldShowLegend: ${shouldShowLegend}
    shouldShowTitle: ${shouldShowTitle}
    titleFontSize: ${titleFontSize}
    showTooltips: ${showTooltips}
    tooltipBackgroundColor: ${this.getQuotedTemplateString(
      tooltipBackgroundColor
    )}
    tooltipTitleFontSize: ${tooltipTitleFontSize}
    tooltipTitleFontColor: ${this.getQuotedTemplateString(
      tooltipTitleFontColor
    )}
    tooltipBodyFontSize: ${tooltipBodyFontSize}
    tooltipBodyFontColor: ${this.getQuotedTemplateString(tooltipBodyFontColor)}
    displayXAxis: ${displayXAxis}
    displayXAxisGridlines: ${displayXAxisGridlines}
    displayXAxisTicks: ${displayXAxisTicks}
    beginXAxisAtZero: ${beginXAxisAtZero}
    displayYAxis: ${displayYAxis}
    displayYAxisGridlines: ${displayYAxisGridlines}
    displayYAxisTicks: ${displayYAxisTicks}
    beginYAxisAtZero: ${beginYAxisAtZero}
    width: ${width}
    height: ${height}
  }}
/>;`;
    this.setState({ showModal: true, code });
  };

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
    if (chartType === "Area Chart") fill = true;
    if (chartType === "Simple Line") fill = false;
    // Background Color
    let backgroundColor = this.randomColor();
    // Border Color
    let borderColor = this.randomColor();
    // Show Legend
    let shouldShowLegend = this.randomBool();
    // Show Title
    let shouldShowTitle = this.randomBool();
    // Title Size
    let titleFontSize = this.randomFromRange(0, 72);
    // Show Title
    let showTooltips = this.randomBool();
    // Border Color
    let tooltipBackgroundColor = this.randomColor();
    // Tooltip Title Size
    let tooltipTitleFontSize = this.randomFromRange(0, 72);
    // Tooltip Title Color
    let tooltipTitleFontColor = this.randomColor();
    // Tooltip Body Size
    let tooltipBodyFontSize = this.randomFromRange(0, 72);
    // Tooltip Body Color
    let tooltipBodyFontColor = this.randomColor();
    // Show X-Axis
    let displayXAxis = this.randomBool();
    // Show X-Axis Gridlines
    let displayXAxisGridlines = this.randomBool();
    // Show X-Axis Ticks
    let displayXAxisTicks = this.randomBool();
    // Begin X-Axis at 0
    let beginXAxisAtZero = this.randomBool();
    // Show Y-Axis
    let displayYAxis = this.randomBool();
    // Show Y-Axis Gridlines
    let displayYAxisGridlines = this.randomBool();
    // Show Y-Axis Ticks
    let displayYAxisTicks = this.randomBool();
    // Begin Y-Axis at 0
    let beginYAxisAtZero = this.randomBool();

    this.setState({
      chartType,
      fill,
      backgroundColor,
      borderColor,
      shouldShowLegend,
      shouldShowTitle,
      titleFontSize,
      showTooltips,
      tooltipBackgroundColor,
      tooltipTitleFontSize,
      tooltipTitleFontColor,
      tooltipBodyFontSize,
      tooltipBodyFontColor,
      displayXAxis,
      displayXAxisGridlines,
      displayXAxisTicks,
      beginXAxisAtZero,
      displayYAxis,
      displayYAxisGridlines,
      displayYAxisTicks,
      beginYAxisAtZero,
      codeCopied: false
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
      shouldShowLegend,
      shouldShowTitle,
      titleFontSize,
      showTooltips,
      tooltipBackgroundColor,
      tooltipTitleFontSize,
      tooltipTitleFontColor,
      tooltipBodyFontSize,
      tooltipBodyFontColor,
      displayXAxis,
      displayXAxisGridlines,
      displayXAxisTicks,
      beginXAxisAtZero,
      displayYAxis,
      displayYAxisGridlines,
      displayYAxisTicks,
      beginYAxisAtZero,
      width,
      height,
      showModal,
      code,
      codeCopied
    } = this.state;
    return (
      <React.Fragment>
        <CodeModal
          close={() =>
            this.setState({
              showModal: false
            })
          }
          show={showModal}
          code={code}
          copyToClipboard={() => this.copyToClipboard()}
          codeCopied={codeCopied}
        />
        <Container>
          <Link to="/">
            <DontClickThis>
              <Dont>{`back home`}</Dont>
            </DontClickThis>
          </Link>
          <FormContainer>
            <SelectContainer>
              <Label>Chart Type</Label>
              <Select
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
              </Select>
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
              <Color>{backgroundColor}</Color>
            </ColorPickerContainer>
            <ColorPickerContainer>
              <Label>Border Color</Label>
              <ColorPicker
                animation="slide-up"
                color={borderColor}
                onChange={color => this.setState({ borderColor: color.color })}
              />
              <Color>{borderColor}</Color>
            </ColorPickerContainer>
            <ColorPickerContainer>
              <Label>Tooltip Background Color</Label>
              <ColorPicker
                animation="slide-up"
                color={tooltipBackgroundColor}
                onChange={color =>
                  this.setState({ tooltipBackgroundColor: color.color })
                }
              />
              <Color>{tooltipBackgroundColor}</Color>
            </ColorPickerContainer>
            <ColorPickerContainer>
              <Label>Tooltip Title Color</Label>
              <ColorPicker
                animation="slide-up"
                color={tooltipTitleFontColor}
                onChange={color =>
                  this.setState({ tooltipTitleFontColor: color.color })
                }
              />
              <Color>{tooltipTitleFontColor}</Color>
            </ColorPickerContainer>
            <ColorPickerContainer>
              <Label>Tooltip Body Color</Label>
              <ColorPicker
                animation="slide-up"
                color={tooltipBodyFontColor}
                onChange={color =>
                  this.setState({ tooltipBodyFontColor: color.color })
                }
              />
              <Color>{tooltipBodyFontColor}</Color>
            </ColorPickerContainer>
            <InputContainer>
              <Label>Title</Label>
              <TextInput
                type="text"
                placeholder="Enter a Title..."
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Title Size</Label>
              <TextInput
                type="number"
                placeholder="Enter a Title Font Size..."
                value={titleFontSize}
                onChange={e => this.setState({ titleFontSize: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Tooltip Title Size</Label>
              <TextInput
                type="number"
                placeholder="Enter a Tooltip Title Font Size..."
                value={tooltipTitleFontSize}
                onChange={e =>
                  this.setState({ tooltipTitleFontSize: e.target.value })
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Tooltip Body Size</Label>
              <TextInput
                type="number"
                placeholder="Enter a Tooltip Body Font Size..."
                value={tooltipBodyFontSize}
                onChange={e =>
                  this.setState({ tooltipBodyFontSize: e.target.value })
                }
              />
            </InputContainer>
            <InputContainer>
              <Label>Width</Label>
              <TextInput
                type="number"
                placeholder="Enter Width..."
                value={width}
                onChange={e => this.setState({ width: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Height</Label>
              <TextInput
                type="number"
                placeholder="Enter Height..."
                value={height}
                onChange={e => this.setState({ height: e.target.value })}
              />
            </InputContainer>
            <SwitchContainer>
              <Label>Fill Chart?</Label>
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
              <Label>Responsive?</Label>
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
              <Label>Maintain Aspect Ratio?</Label>
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
              <Label>Show Legend?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    shouldShowLegend: !shouldShowLegend
                  })
                }
                on={shouldShowLegend}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show Title?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    shouldShowTitle: !shouldShowTitle
                  })
                }
                on={shouldShowTitle}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show Tooltips?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    showTooltips: !showTooltips
                  })
                }
                on={showTooltips}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show X-Axis?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayXAxis: !displayXAxis
                  })
                }
                on={displayXAxis}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show X-Axis Gridlines?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayXAxisGridlines: !displayXAxisGridlines
                  })
                }
                on={displayXAxisGridlines}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show X-Axis Ticks?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayXAxisTicks: !displayXAxisTicks
                  })
                }
                on={displayXAxisTicks}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Begin X-Axis At 0?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    beginXAxisAtZero: !beginXAxisAtZero
                  })
                }
                on={beginXAxisAtZero}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show Y-Axis?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayYAxis: !displayYAxis
                  })
                }
                on={displayYAxis}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show Y-Axis Gridlines?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayYAxisGridlines: !displayYAxisGridlines
                  })
                }
                on={displayYAxisGridlines}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Show Y-Axis Ticks?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    displayYAxisTicks: !displayYAxisTicks
                  })
                }
                on={displayYAxisTicks}
              />
            </SwitchContainer>
            <SwitchContainer>
              <Label>Begin Y-Axis At 0?</Label>
              <Switch
                onClick={() =>
                  this.setState({
                    beginYAxisAtZero: !beginYAxisAtZero
                  })
                }
                on={beginYAxisAtZero}
              />
            </SwitchContainer>
          </FormContainer>
          <MainContent>
            <ButtonsContainer>
              <ButtonContainer onClick={this.randomize}>
                <Button>{`Random Chart`}</Button>
              </ButtonContainer>
              <IconContainer>
                <SimpleIcon
                  size={60}
                  icon={"github"}
                  href={"https://github.com/chernandez7/react-simple-chartjs"}
                />
              </IconContainer>
              <ButtonContainer>
                <Button onClick={this.generateCode}>{`Generate Code`}</Button>
              </ButtonContainer>
            </ButtonsContainer>
            <ChartContainer>
              <Chart
                chartType={chartType}
                labels={labels}
                data={data}
                title={title}
                options={this.state}
              />
            </ChartContainer>
          </MainContent>
        </Container>
      </React.Fragment>
    );
  }
}

export default ChartGen;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  color: #222;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  width: 80%;
  height: 100%;
  background-color: #d8d5cf;

  @media (max-width: 1000px) {
    width: 100%;
    height: 75%;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const IconContainer = styled.div`
  width: 250px;
  height: 100%;
  margin-top: -10px;
  display: flex;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #a3997e;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    margin-left: 15px;
    margin-right: 15px;
    width: 40%;
  }
`;

const Button = styled.h1`
  padding-top: 5px;
  margin: 0px;

  @media (max-width: 1000px) {
    font-size: 11px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 95%;
`;

const FormContainer = styled.div`
  width: 20%;
  height: 100%;
  background-color: #a3997e;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  overflow-y: scroll;

  @media (max-width: 1000px) {
    flex-direction: row;
    width: 100%;
    height: 30%;
    overflow-x: scroll;
  }
`;

const Label = styled.h1`
  margin: 5px;
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin: 5px;
`;

const InputContainer = styled.div`
  margin: 5px;
`;

const SwitchContainer = styled.div`
  margin: 5px;
  padding: 5px;
`;

const SelectContainer = styled.div`
  margin: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  margin: 5px;
`;

const ColorPickerContainer = styled.div`
  margin: 5px;
`;

const Color = styled.h1`
  padding: 10px;
  font-size: 18px;
  margin: 5px;
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
