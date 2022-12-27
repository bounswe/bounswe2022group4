import React, { useRef } from 'react';
import { Recogito } from '@recogito/recogito-js';
import '@recogito/recogito-js/dist/recogito.min.css';

const TextAnnotation = ({ text, id }) => {
  const r = new Recogito({ content: document.getElementById(id) });
  console.log(text, 'text');
  return <div>{text}</div>;
};
export default TextAnnotation;
