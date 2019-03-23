import React from "react";
import styled from "styled-components";
import Chart from "react-simple-chartjs";
import Theme from "../config/Theme";

let OPTIONS = {
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
  height: 250
};

const IndexPage = () => (
  <Container>
    <ChartContainer>
      <Chart
        chartType={"Vertical Bar"}
        labels={[
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
        ]}
        data={[1, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 5, 8, 14, 7, 8, 14, 7]}
        title={"Very cool chart"}
        options={OPTIONS}
      />
    </ChartContainer>
  </Container>
);

export default IndexPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const ChartContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  padding-bottom: 50px;
  background-color: #937341;
`;
