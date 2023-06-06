import React from 'react';
import ReactLoading from 'react-loading';
 
const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'1%'} width={'5%'} />
);
 
export default Example;