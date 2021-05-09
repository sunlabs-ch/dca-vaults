import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  width: 100%;
  padding: 10px 5px;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  font-size: 1.2rem;
  border: 1px solid #e1e1ef;
  padding: 0.5em 1rem;
  transition: border-color 0.3s ease-in;
  border-radius: 8px;
  color: #000;

  &:focus,
  &:hover {
    border-color: rgb(255, 130, 92);
  }
`;

export const Span = styled.span`
  display: block;
  color: red;
  margin-top: -4px;
`;
