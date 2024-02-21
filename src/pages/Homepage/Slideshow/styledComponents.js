import styled, { keyframes, css } from "styled-components";

const moveSlideVert = (offset) => keyframes`
0% {
  transform: translateY(0);
  opacity: 0;
}
1%{
  opacity: 0;
}
16%{
  opacity: 0.5;
}
81%{
  opacity: 0.5;
}
96%{
  opacity: 0;
}
100% {
  transform: translateY(${offset}px);
  opacity: 0;
}
`;

const moveSlideHor = (offset) => keyframes`
0% {
  transform: translateX(0);
  opacity: 0;
}
1%{
  opacity: 0;
}
15%{
  opacity: 0.5;
}
85%{
  opacity: 0.5;
}
95%{
  opacity: 0;
}
100% {
  transform: translateX(${offset}px);
  opacity: 0;
}
`;

const AnimatedImageVert = styled.img`
  width: 100%;
  min-height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: 0;
  ${({ offset, $stime }) => css`
    animation: ${moveSlideVert(offset)} ${$stime + 1}s linear infinite;
  `}
`;

const AnimatedImageHor = styled.img`
  height: 100%;
  objectfit: cover;
  position: absolute;
  opacity: 0;
  ${({ offset, $stime }) => css`
    animation: ${moveSlideHor(offset)} ${$stime + 1}s linear infinite;
  `}
`;

export {AnimatedImageVert, AnimatedImageHor}