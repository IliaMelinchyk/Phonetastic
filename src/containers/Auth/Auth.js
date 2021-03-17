import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";
import classes from "./Auth.module.scss";

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
          isEmail: true,
          minLength: 6,
          maxLength: 30,
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
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  inputChangedHandler = (event, controlName) => {
    // spreading state, updating controls with input value and checking their validity
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
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
    // sending authorization request to firebase
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

  sentenceCase = (message) => {
    message = message === undefined || message === null ? "" : message;
    return message
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/(^|\. *)([a-z])/g, (_, separator, char) => {
        return separator + char.toUpperCase();
      });
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
    return (
      <div>
        {this.props.loading ? <Spinner /> : null}
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
        {this.props.error ? (
          <h4 className={classes.Error}>
            {this.sentenceCase(this.props.error)}
          </h4>
        ) : null}
        <form onSubmit={this.submitHandler} className={classes.Form}>
          <div className={classes.FormElement}>{form}</div>
          <div className={classes.Buttons}>
            <Button btnType="Success" clicked={this.signInHandler}>
              SIGN IN
            </Button>
            <Button btnType="Success" clicked={this.signUpHandler}>
              SIGN UP
            </Button>
          </div>
        </form>
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
