import styled from 'styled-components';
export const Tabs = styled.div`
  overflow: hidden;
  font-family: Open Sans;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fad9e2;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;

  margin-right: 0.5em;
  font-size: 1em;
  border: ${(props) => (props.active ? '1px solid #ccc' : '')};
  border-bottom: ${(props) => (props.active ? 'none' : '')};
  background-color: ${(props) => (props.active ? '#e3fdf5' : '#fad9e2')};
  height: ${(props) => (props.active ? '3em' : '2.6em; top:.4em')};
  transition: background-color 0.5s ease-in-out;
  border-radius: 0.5em;

  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')}
`;
