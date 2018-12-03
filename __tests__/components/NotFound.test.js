import React from "react";
import renderer from "react-test-renderer";
import { NotFound } from "../../src/components";

describe("404 Component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
