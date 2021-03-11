import {Form } from "react-bootstrap";
import React from "react";
export const Input =(props)=>{
  const {label,name,value,eventHandle,validation,type,placeholder,disabled}=props;
  return(
  // <Form.Group>
  //           <Form.Label>{label}</Form.Label>
  //           <Form.Control
  //             type={type?type:"text"}
  //             name={name}
  //             value={value}
  //             placeholder={placeholder}
  //             style={{
  //               borderColor: value === "" && validation ? "red" : "",
  //             }}
  //             onChange={eventHandle}
  //             disabled ={disabled && disabled}
  //           />
  //         </Form.Group>
  <input type="text" name="choice" value={value} onChange={eventHandle}></input>
  )
}