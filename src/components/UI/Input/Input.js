import React from "react";
import classes from "./Input.module.scss";

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched)
    inputClasses.push(classes.Invalid);
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.nameId}
          name={props.nameId}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.nameId}
          name={props.nameId}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          id={props.nameId}
          name={props.nameId}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          id={props.nameId}
          name={props.nameId}
          onChange={props.changed}
        />
      );
  }
  return (
    <div>
      <label htmlFor={props.nameId}>{props.label}</label>
      {inputElement}
      {props.after ? <span>{props.after}</span> : null}
    </div>
  );
};

export default Input;
