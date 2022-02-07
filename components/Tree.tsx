import * as React from "react";

import { Container, Line } from "./Tree.style";

const colors = [`red`, `white`, `blue`];
const minLength = 1;
const angleRatio = Math.PI / 4;
const ratio = 2 / 3;

function chooseColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function Tree() {
  const [lines, setLines] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    addLine(
      <Line length={`100px`} color={`red`} angle={0} bottom={0} left={50} />
    );

    // createBranches({
    //   length: 100 * ratio,
    //   angle: 180 * angleRatio,
    //   bottom: 100,
    //   left: 50,
    // });
    // createBranches({
    //   length: 100 * ratio,
    //   angle: 180 * angleRatio,
    //   bottom: 100,
    //   left: 50,
    // });
  }, []);

  function addLine(line: React.ReactNode) {
    const temp = lines.slice();
    temp.push(line);
    setLines(temp);
  }

  function createBranches({
    length,
    angle,
    bottom,
    left,
  }: {
    length: number;
    angle: number;
    bottom: number;
    left: number;
  }) {
    if (length > minLength) {
      const newLengthS = `${length * ratio}px`;
      const newLength = length * ratio;

      // Left
      addLine(
        <Line
          length={newLengthS}
          color={`white`}
          angle={angle * angleRatio}
          bottom={bottom + newLength}
          left={left - newLength}
        />
      );
      createBranches({
        length: newLength,
        angle: angle * angleRatio,
        bottom: bottom + newLength,
        left: left - newLength,
      });
      
      // Right
      addLine(
        <Line
          length={newLengthS}
          color={`white`}
          angle={-angle * angleRatio}
          bottom={bottom + newLength}
          left={left + newLength}
        />
      );
      createBranches({
        length: newLength,
        angle: angle * angleRatio,
        bottom: bottom + length,
        left: left + length,
      });
    }
  }

  return (
    <Container>
      {lines.map((l) => (
        <React.Fragment>{l}</React.Fragment>
      ))}
    </Container>
  );
}
