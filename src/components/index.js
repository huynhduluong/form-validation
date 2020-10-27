import React, { Component } from "react";
import { connect } from "react-redux";
import { actSubmit } from "../redux/action";
import ListUser from "./ListUser";

class FormValidation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { id: "", manv: "", tennv: "", email: "" },
      errors: { manv: "", tennv: "", email: "" },
      formValid: false,
      tennvValid: false,
      manvValid: false,
      emailValid: false,
      submitFlag: false,
    };
  }
  handleOnchange = (e) => {
    const { name, value } = e.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };
  handleErrors = (e) => {
    const { name, value } = e.target;
    let { tennvValid, manvValid, emailValid } = this.state;
    let mess = value === "" ? name + " không được trống" : "";
    switch (name) {
      case "manv":
        manvValid = mess !== "" ? false : true;
        if (value && value.length < 4) {
          manvValid = false;
          mess = "Độ dài phải lớn hơn 3";
        }
        break;
      case "tennv":
        tennvValid = mess !== "" ? false : true;
        break;
      case "email":
        emailValid = mess !== "" ? false : true;
        if (value && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = false;
          mess = "Email không đúng định dạng";
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        errors: { ...this.state.errors, [name]: mess },
        tennvValid,
        manvValid,
        emailValid,
      },
      () => {
        this.handleFormValid();
      }
    );
  };

  handleFormValid = () => {
    const { tennvValid, manvValid, emailValid } = this.state;
    this.setState({
      formValid: tennvValid && manvValid && emailValid,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmitForm(this.state.values);
    this.setState({
      submitFlag: true,
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    console.log(newProps, currentState);
    if (
      newProps &&
      newProps.userEdit &&
      newProps.userEdit.id !== currentState.values.id
    ) {
      return { values: newProps.userEdit };
    } else if (
      (newProps.userEdit === null && currentState.values.id !== "") ||
      currentState.submitFlag
    ) {
      return {
        values: { id: "", manv: "", tennv: "", email: "" },
        submitFlag: false,
      };
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <h3 className="title">*FormValidation</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Mã nhân viên</label>
            <input
              type="text"
              className="form-control"
              name="manv"
              onChange={this.handleOnchange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              value={this.state.values.manv}
            />
            {this.state.errors.manv !== "" ? (
              <div className="alert alert-danger">{this.state.errors.manv}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Tên nhân viên</label>
            <input
              type="text"
              className="form-control"
              name="tennv"
              onChange={this.handleOnchange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              value={this.state.values.tennv}
            />
            {this.state.errors.tennv !== "" ? (
              <div className="alert alert-danger">
                {this.state.errors.tennv}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.handleOnchange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              value={this.state.values.email}
            />
            {this.state.errors.email !== "" ? (
              <div className="alert alert-danger">
                {this.state.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!this.state.formValid}
          >
            Submit
          </button>
        </form>
        <ListUser />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitForm: (user) => {
      dispatch(actSubmit(user));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userEdit: state.formValidationReducer.userEdit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormValidation);
