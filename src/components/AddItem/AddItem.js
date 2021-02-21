import React, { Component } from "react";
import axios from "../../axios-orders";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { app } from "../../base";

class AddItem extends Component {
  state = {
    form: {
      model: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: `phone's model`,
        },
        value: "",
        label: `Phone's model`,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      manufacturer: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: `phone's manufacturer`,
        },
        value: "",
        label: `Phone's manufacturer`,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      age: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "sixMonths", displayValue: "Less than six months." },
            {
              value: "oneYear",
              displayValue: "Between six months and a year.",
            },
            {
              value: "threeYears",
              displayValue: "Between one year and three years.",
            },
          ],
        },
        value: "sixMonths",
        label: `How old is this phone?`,
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
      },
      memory: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "twoGb", displayValue: "2 GB" },
            {
              value: "fourGb",
              displayValue: "4 GB",
            },
            {
              value: "eightGb",
              displayValue: "8 GB",
            },
            {
              value: "sixteenGb",
              displayValue: "16 GB",
            },
            {
              value: "thirtytwoGb",
              displayValue: "32 GB",
            },
            {
              value: "sixtyfourGb",
              displayValue: "64 GB",
            },
            {
              value: "hundredtwentyeightGb",
              displayValue: "128 GB",
            },
            {
              value: "twohundredfiftysixGb",
              displayValue: "256 GB",
            },
            {
              value: "fivehundredtwelveGb",
              displayValue: "512 GB",
            },
            {
              value: "oneTb",
              displayValue: "1 TB",
            },
          ],
        },
        value: "twoGb",
        label: `Phone's memory size`,
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
      },
      ram: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "halfGb", displayValue: "0,5 GB" },
            { value: "oneGb", displayValue: "1 GB" },
            { value: "twoGb", displayValue: "2 GB" },
            {
              value: "fourGb",
              displayValue: "4 GB",
            },
            {
              value: "eightGb",
              displayValue: "8 GB",
            },
            {
              value: "sixteenGb",
              displayValue: "16 GB",
            },
          ],
        },
        value: "halfGb",
        label: `Phone's RAM size`,
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
      },
      height: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: `320`,
          min: "320",
          max: "3840",
        },
        value: "",
        label: `Resolution's height`,
        after: "px",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      width: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: `240`,
          min: "240",
          max: "1644",
        },
        value: "",
        label: `Resolution's width`,
        after: "px",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      camera: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: `8`,
          min: "1",
          max: "108",
        },
        value: "",
        label: `Phone's camera resolution`,
        after: "MP",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: `Tell us about your phone here!`,
          maxLength: "252",
          rows: "5",
          cols: "40",
        },
        value: "",
        label: `Describe your phone's condition`,
        validation: {
          required: true,
          minLength: 10,
          maxLength: 252,
        },
        valid: false,
        touched: false,
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: `200`,
          min: "10",
          max: "3000",
        },
        value: "",
        label: `How much money do you sell this phone for?`,
        after: "$",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: `name@gmail.com`,
        },
        value: "",
        label: `Enter your email, where you can be contacted by the buyer`,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "tel",
          placeholder: `85555551234`,
        },
        value: "",
        label: `Enter your phone number, where you can be contacted by the buyer`,
        validation: {
          required: true,
          minLength: 6,
          maxLength: 15,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };
  formHandler = (event) => {
    event.preventDefault();
    const formData = { userId: this.props.userId };
    for (let formElementIdentifier in this.state.form) {
      formData[formElementIdentifier] = this.state.form[
        formElementIdentifier
      ].value;
    }
    this.props.onFormSubmit(formData, this.props.token);
    console.log(this.props.error);
  };
  fileChange = (event) => {
    const file = event.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("uploaded file", file.name);
    });
  };
  modalClose = () => {
    this.props.showModal = false;
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.form,
    };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    console.log(updatedFormElement);
    updatedForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid: formIsValid });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }
    return (
      <div>
        <Modal
          show={this.props.showModal}
          modalClosed={this.props.onModalClose}
        >
          <h3>
            {this.props.error
              ? `${this.props.error}. Please try again later!`
              : "Phone added to market successfully! You can add another one in a form below, or browse our market to find yourself a new one."}
          </h3>
        </Modal>
        {this.props.loading ? <Spinner /> : null}
        <h4>
          Enter information about the phone you are selling in the form below
        </h4>
        <form onSubmit={this.formHandler}>
          {formElementsArray.map((formElement) => (
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
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          ))}
          <input type="file" onChange={this.fileChange} />
          <Button
            btnType="Success"
            disabled={!this.state.formIsValid}
            // clicked={this.fileChange}
          >
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.addItem.loading,
    showModal: state.addItem.showModal,
    error: state.addItem.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formData, token) =>
      dispatch(actions.addItem(formData, token)),
    onModalClose: () => dispatch(actions.addItemModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
