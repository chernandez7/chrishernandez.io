import styled from "styled-components";

export const Container = styled.div`
position:relative;
width: 100%;
height: 100%;
max-width:100%;
max-height:100%;
display:flex;
justify-content: center;
align-items: center;
align-content: center;
`;

type Line = {
    color?: string;
    length: string;
    angle: number;
    bottom: number;
    left: number;
}
export const Line = styled.div<Line>`
position:absolute;
bottom: ${({bottom}) => bottom ?bottom: 0};
left: ${({left}) => left ?left: `50%`};
width: 1px;
height: ${({length}) => length ?length: `50px`};
background-color: ${({color}) => color ?color: `white`};
transform: ${({angle}) => angle ? `rotate(${angle}deg)` : ``};
`;