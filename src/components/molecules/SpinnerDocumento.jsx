
import styled, { keyframes } from "styled-components";

const l110 = keyframes`
  0%   {transform:translate(-30px) rotate(0)      translate(0)    rotate(0)}
  25%  {transform:translate( 30px) rotate(0)      translate(0)    rotate(0)}
  50%  {transform:translate( 30px) rotate(180deg) translate(0)    rotate(0)}
  75%  {transform:translate( 30px) rotate(180deg) translate(60px) rotate(0)}
  100% {transform:translate( 30px) rotate(180deg) translate(60px) rotate(180deg)}
`;

const l111 = keyframes` 
  0%,25%,50%,75%,100% {transform: translate(0)}
  12.5%,62.5% {transform: translate(var(--s,15px))}
`;

export const Spinner = styled.div`
  height: ${({ size }) => size || "40px"};
  aspect-ratio: 0.866;
  display: grid;
  background: conic-gradient(
    from -121deg at right,
    #0000,
    #ef552b 1deg 60deg,
    #0000 61deg
  );
  animation: ${l110} 2s infinite;
  transform-origin: 33% 50%;

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    background: conic-gradient(
      from -121deg at right,
      #0000,
      #ffa588 1deg 60deg,
      #0000 61deg
    );
    animation: ${l111} 2s infinite;
  }

  &::after {
    --s: ${({ size }) => (size ? `calc(${size} / 1.3)` : "30px")};
    background: conic-gradient(
      from -121deg at right,
      #0000,
      #52de65 1deg 60deg,
      #0000 61deg
    );
  }
`;


export const Loader = ({ size }) => {
  return <Spinner size={size} />;
};
