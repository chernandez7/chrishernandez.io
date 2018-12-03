import React from "react";
import renderer from "react-test-renderer";
import { Heading } from "../../src/components";

describe("Home Component", () => {
  it("renders correctly", () => {
    const location = {
      pathname: "/"
    };
    const tree = renderer.create(<Heading location={location} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
