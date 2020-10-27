import React, { Component } from "react";
import { connect } from "react-redux";
import { actEdit } from "../redux/action";

class ListUser extends Component {
  renderTable = () => {
    const { listUser, handleEdit } = this.props;
    return listUser.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.manv}</td>
          <td>{item.tennv}</td>
          <td>{item.email}</td>
          <td>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleEdit(item);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ tên NV</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.formValidationReducer.listUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEdit: (user) => {
      dispatch(actEdit(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
