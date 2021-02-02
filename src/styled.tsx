import styled from '@emotion/styled';
import colors from './colors';

export const paraGraphDefaultStyle = {
  fontSize: 14,
  lineHeight: '22px',
};

const Button = styled.button<{ hideBackground?: boolean }>`
  appearance: none;
  margin: 0;
  border: 0;
  color: white;
  padding: 5px !important;
  border-radius: 0 !important;
  background: ${(props: { hideBackground?: boolean }) =>
    props.hideBackground ? `` : `${colors.blue} !important`};
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }
`;

Button.defaultProps = { type: 'button' };

const CircleButton = styled(Button)`
  font-size: 14px;
  font-weight: bold;
  margin: 0 4px 0 auto;
  background: none !important;
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  line-height: 14px !important;
  border-radius: 50% !important;
  padding: 0 !important;
  transition: 0.2s all;

  &:hover {
    background: ${colors.lightBlue};
  }

  &:active {
    background: black;
  }
`;

const Input = styled.input`
  &::placeholder {
    color: #b3b3b3;
  }

  &:focus::placeholder {
    color: white;
  }
`;

const Table = styled.div<{ hasError?: boolean }>`
  transition: 0.3s all;
  display: grid;
  grid-template-columns: 120px 5fr;
  grid-template-rows: auto;
  row-gap: 2px;
  padding: 4px;

  &:hover {
    background: ${colors.primary};
  }

  ${({ hasError }) => `2px solid ${
    hasError ? colors.secondary : colors.buttonBlue
  };
  
  `}
`;

export const Label = styled.div<{ right?: boolean }>`
  padding-right: 5px;

  ${({ right }) =>
    right &&
    `
  font-weight: 500;
  text-align: right;
  `}
`;

export const Value = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export { Button, CircleButton, Input, Table };
