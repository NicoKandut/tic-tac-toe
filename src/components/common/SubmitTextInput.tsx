import React, { useCallback } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  filter: drop-shadow(0 5px 0 var(--shadow));
  transition: all 0.2s linear;
  color: var(--text1);
  overflow: hidden;
`;

const Input = styled.input`
  display: flex;
  height: 32px;
  padding: 0 10px;
  align-items: center;
  border: var(--bg2) solid 1px;
  border-radius: 5px 0 0;
`;

const Button = styled.button`
  display: flex;
  height: 32px;
  padding: 0 10px;
  align-items: center;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: var(--bg2);

  :hover {
    opacity: 0.75;
  }
`;

interface SubmitTextInputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  submitText: string;
}

export default function SubmitTextInput(props: SubmitTextInputProps) {
  const { value, setValue, onSubmit, submitText } = props;

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <InputWrapper>
      <Input type="text" value={value} onChange={onChange} />
      <Button onClick={onSubmit}>{submitText}</Button>
    </InputWrapper>
  );
}
