import React, { Component } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: `name@gmail.com`,
        },
        value: "",
        label: `Your E-mail address`,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: `*******`,
        },
        value: "",
        label: `Your password`,
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  signUpHandler = () => {
    this.setState({ isSignup: true });
  };
  signInHandler = () => {
    this.setState({ isSignup: false });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        inputtype={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.label}
        after={formElement.config.after}
        nameId={formElement.id}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation.required}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>
          {this.props.error.charAt(0) +
            this.props.error.substring(1).toLowerCase().replace("_", " ")}
        </p>
      );
    }
    return (
      <div>
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" clicked={this.signUpHandler}>
            SIGN UP
          </Button>
          <Button btnType="Success" clicked={this.signInHandler}>
            SIGN IN
          </Button>
        </form>
        {this.props.loading ? <Spinner /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
