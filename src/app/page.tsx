"use client";
import { styled } from "styled-components";

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`;

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button>styled button</Button>
    </div>
  );
}
