import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import classes from "./AddItem.module.scss";

class AddItem extends Component {
  state = {
    form: {
      model: {
        elementType: "input",
        elementConfig: {
          type: "Text",
          placeholder: `iPhone 11`,
        },
        value: "",
        label: `Model`,
        validation: {
          required: true,
          minLength: 4,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      },
      manufacturer: {
        elementType: "input",
        elementConfig: {
          type: "Text",
          placeholder: `Apple`,
        },
        value: "",
        label: `Manufacturer`,
        validation: {
          required: true,
          minLength: 2,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      },
      age: {
        elementType: "select",
        elementConfig: {
          options: [
            "Less than six months.",
            "Between six months and a year.",
            "Between one and three years.",
            "More than three years.",
          ],
        },
        value: "Less than six months.",
        label: `How old is it?`,
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
            "2 GB",
            "4 GB",
            "8 GB",
            "16 GB",
            "32 GB",
            "64 GB",
            "128 GB",
            "256 GB",
            "512 GB",
            "1 TB",
          ],
        },
        value: "2 GB",
        label: `Memory storage capacity`,
        validation: {
          required: true,
        },
        valid: true,
        touched: true,
      },
      ram: {
        elementType: "select",
        elementConfig: {
          options: ["0,5 GB", "1 GB", "2 GB", "4 GB", "8 GB", "16 GB"],
        },
        value: "0,5 GB",
        label: `RAM (Random Access Memory)`,
        validation: {
          required: true,
        },
        valid: true,
        touched: true,
      },
      height: {
        elementType: "input",
        elementConfig: {
          type: "Number",
          placeholder: `1920`,
          min: "320",
          max: "3840",
        },
        value: "",
        label: `Resolution's height`,
        after: "px",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 3,
          maxLength: 4,
        },
        valid: false,
        touched: false,
      },
      width: {
        elementType: "input",
        elementConfig: {
          type: "Number",
          placeholder: `1080`,
          min: "240",
          max: "1644",
        },
        value: "",
        label: `Resolution's width`,
        after: "px",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 3,
          maxLength: 4,
        },
        valid: false,
        touched: false,
        isNumeric: true,
      },
      camera: {
        elementType: "input",
        elementConfig: {
          type: "Number",
          placeholder: `12`,
          min: "1",
          max: "108",
        },
        value: "",
        label: `Camera's resolution`,
        after: "MP",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 3,
        },
        valid: false,
        touched: false,
      },
      price: {
        elementType: "input",
        elementConfig: {
          type: "Number",
          placeholder: `300`,
          min: "10",
          max: "5000",
        },
        value: "",
        label: `Selling price`,
        after: "$",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 2,
          maxLength: 4,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "Email",
          placeholder: `name@gmail.com`,
        },
        value: "",
        label: `Your contact email`,
        validation: {
          required: true,
          isEmail: true,
          minLength: 6,
          maxLength: 30,
        },
        valid: false,
        touched: false,
      },
      phone: {
        elementType: "input",
        elementConfig: {
          type: "Tel",
          placeholder: `85555551234`,
        },
        value: "",
        label: `Your phone number`,
        validation: {
          required: true,
          isNumeric: true,
          minLength: 6,
          maxLength: 20,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "Textarea",
          placeholder: `Tell us about your phone here!`,
          maxLength: "200",
          rows: 5,
        },
        value: "",
        label: `Additional info (optional)`,
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    // checking rule conditions and making input invalid if they are not met
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value.toLowerCase()) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // spreading form from state to update it
    const updatedForm = {
      ...this.state.form,
    };

    // spreading specific element in form from state to update it
    const updatedFormElement = { ...updatedForm[inputIdentifier] };

    // updating form element with input value
    updatedFormElement.value = event.target.value;

    // invoking validity function to check value
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;

    // updating form with new form element
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    // cycling through updated form to check if every element is valid and,therefore, if form is valid
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ form: updatedForm, formIsValid: formIsValid });
  };

  formHandler = async (event) => {
    event.preventDefault();

    // adding image to firebase storage and getting it's link
    if (this.props.file) {
      await this.props.onAddItemFile(this.props.userId, this.props.file);
    }

    // adding image link, user id and date to form
    const formData = {
      userId: this.props.userId,
      fileUrl: this.props.fileUrl,
      date: Date.now(),
    };

    // adding input values to form
    for (let formElementIdentifier in this.state.form) {
      formData[formElementIdentifier] = this.state.form[
        formElementIdentifier
      ].value;
    }

    // sending form data to firebase database
    this.props.onFormSubmit(formData, this.props.token);
  };

  modalClose = () => {
    // directing to market when modal is closed
    this.props.history.push("/");

    this.props.onModalClose();
  };

  componentWillUnmount() {
    // deleting file from form on unmount
    this.props.onFileUnmount();
  }

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
        {this.props.loading ? <Spinner /> : null}
        <Modal
          show={this.props.showModal}
          modalClosed={() => this.modalClose()}
        >
          <h3 style={{ textAlign: "center" }}>
            {this.props.error
              ? `${this.props.error}. Please try again later!`
              : "Phone added to market successfully!"}
          </h3>
        </Modal>
        <h4 className={classes.Header}>
          Enter information about the phone you are selling in the form below
        </h4>
        <form onSubmit={this.formHandler} className={classes.Form}>
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
          <div className={classes.FormBottom}>
            <input
              id={classes.File}
              type="file"
              onChange={(event) => this.props.onFileChange(event)}
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
            />
            <label htmlFor={classes.File} className={classes.File}>
              {this.props.file
                ? "Change the photo of a phone"
                : "Add a photo of a phone (optional)"}
            </label>
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              {this.state.formIsValid
                ? "Add phone to market"
                : "Form is incomplete, add more information"}
            </Button>
          </div>
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
    fileUrl: state.addItem.fileUrl,
    file: state.addItem.file,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmit: (formData, token) =>
      dispatch(actions.addItem(formData, token)),
    onModalClose: () => dispatch(actions.addItemModalClose()),
    onFileChange: (event) => dispatch(actions.addItemFileChange(event)),
    onAddItemFile: (userId, file) =>
      dispatch(actions.addItemFile(userId, file)),
    onFileUnmount: () => dispatch(actions.addItemFileUnmount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
