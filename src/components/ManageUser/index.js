import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import Style from "./style.module.scss";

import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiSearch, CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

const { CreateUser, deleteAccount, updateUser } = Admin.PostRequests;
const { GetAllUser } = Admin.GetRequests;

class User extends React.Component {
  state = {
    user_name: "",
    password: "",
    name: "",
    phone: null,
    email: "",
    showModal: false,
    selectedUser: [],
    selectAll: false,
    isEditMode: false,
    editingUserId: null,
    currentPage: 1,
    itemsPerPage: 5,
  };
  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };
  handleNextPage = () => {
    const { currentPage, itemsPerPage } = this.state;
    const { allUser = {} } = this.props;
    const totalPages = allUser.ceil(Object.keys(allUser).length / itemsPerPage);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };
  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  getStartRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    return totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  };

  getEndRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    const calculatedEndRange = currentPage * itemsPerPage;
    return Math.min(calculatedEndRange, totalItems);
  };

  getTotalItems = () => {
    const { allUser } = this.props;
    return allUser ? Object.keys(allUser).length : 0;
  };
  getStartRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    return totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  };
  componentDidMount() {
    this.props.GetAllUser();
  }
  handleEditUser = (userId) => {
    const { allUser } = this.props;
    const user = allUser[userId];

    this.setState({
      isEditMode: true,
      editingUserId: userId,
      user_name: user.user_name,
      name: user.name,
      password: user.password,
      phone: user.phone,
      email: user.email,
      showModal: true,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({
      isEditMode: false,
      editingUserId: null,
      user_name: "",
      name: "",
      password: "",
      phone: null,
      email: "",
      showModal: false,
    });
    this.setState({ showModal: false });
  };
  handleUpdateUser = async () => {
    const { user_name, name, password, phone, email, editingUserId } =
      this.state;
    if (!user_name || !name || !password || !phone || !email) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin bắt buộc.",
      });
      return;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Số điện thoại phải chứa đúng 10 chữ số.",
      });
      return;
    }

    if (!/^\w+([\.-]?\w+)*@gmail.com$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Email phải theo định dạng của Gmail.",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Mật khẩu phải có ít nhất 8 ký tự.",
      });
      return;
    }

    const updatedUserInfo = {
      user_name,
      name,
      password,
      phone,
      email,
    };

    try {
      await this.props.updateUser(editingUserId, updatedUserInfo);
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Thông tin người dùng đã được cập nhật thành công.",
      });
      this.props.GetAllUser();
      this.setState({
        isEditMode: false,
        editingUserId: null,
        user_name: "",
        name: "",
        password: "",
        phone: null,
        email: "",
        showModal: false,
      });
      this.handleCloseModal();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật người dùng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại sau.",
      });
    }
  };

  handleClickUser = () => {
    const { user_name, password, name, phone, email } = this.state;
    if (!user_name || !password || !name || !phone || !email) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin bắt buộc.",
      });
      return;
    }
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng nhập số điện thoại hợp lệ (10 chữ số).",
      });
      return;
    }

    if (!email || !/^\w+([\.-]?\w+)*@gmail.com$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng nhập email theo định dạng của Gmail.",
      });
      return;
    }
    if (!password || password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng nhập mật khẩu có ít nhất 8 ký tự.",
      });
      return;
    }

    const userInfo = {
      user_name,
      password,
      name,
      phone,
      email,
      role: "employee",
    };

    this.props.CreateUser(userInfo);
    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Người dùng đã được tạo thành công.",
    });
    this.props.GetAllUser();
    this.handleCloseModal();
    this.setState({
      user_name: "",
      password: "",
      name: "",
      phone: null,
      email: "",
    });
  };

  handleDeleteAccount = () => {
    const { selectedUser } = this.state;
    this.props.deleteAccount(selectedUser);
    this.props.GetAllUser();
  };
  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedUser = prevState.selectedUser.includes(itemId)
        ? prevState.selectedUser.filter((id) => id !== itemId)
        : [...prevState.selectedUser, itemId];

      return { selectedUser };
    });
  };

  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { allUser } = this.props;
      const allItemIds = Object.keys(allUser);

      const selectedUser = prevState.selectAll ? [] : allItemIds;

      return { selectedUser, selectAll: !prevState.selectAll };
    });
  };

  renderTableRows() {
    const { allUser = {} } = this.props;
    const { selectedUser, itemsPerPage, currentPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return Object.keys(allUser)
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((key) => {
        const user = allUser[key];
        return (
          <tr key={key} className={Style.item_row}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedUser.includes(key)}
                onChange={() => this.handleCheckboxChange(key)}
              />
            </td>

            <td>{user.user_name}</td>
            <td>{user.email}</td>
            <td>Admin</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>

            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditUser(key)}
                >
                  <CiEdit />
                </button>
              </div>
            </td>
          </tr>
        );
      });
  }

  render() {
    const { selectAll, currentPage, itemsPerPage } = this.state;
    const { allUser = {} } = this.props;
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(allUser).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }

    return (
      <div className={Style.table_container}>
        <h2>Quản lí nhân viên</h2>
        <div className={Style.header_table}>
          <div className={Style.header_table_container}>
            <div className={`${Style.app_search} d-none d-lg-block mx-3`}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                />
                <CiSearch />
              </div>
            </div>
            <div className={Style.header_btn_group}>
              <button
                className={Style.header_add_button}
                onClick={this.handleShowModal}
              >
                <div>
                  <FaPlus />
                  <span>Thêm người dùng</span>
                </div>
              </button>
              <button
                className={Style.header_delete_button}
                onClick={this.handleDeleteAccount}
              >
                <div>
                  <FaRegTrashAlt />
                  <span>Xoá</span>
                </div>
              </button>
            </div>
          </div>

          <Table className={Style.table} hover>
            <thead className={`custom-thead`}>
              <tr>
                <th>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectAll}
                    onChange={this.handleSelectAllChange}
                  />
                </th>
                <th>Nhân viên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Nickname</th>
                <th>Điện thoại</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderTableRows()}</tbody>
          </Table>
          <div className={`${Style.Pagination_div} mx-4`}>
            <div className={Style.paginationInfo}>
              Hiển thị từ {startRange} đến {endRange} sản phẩm
            </div>
            <Pagination className={Style.pagination}>
              <Pagination.Prev onClick={this.handlePreviousPage} />
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => this.handlePageChange(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={this.handleNextPage} />
            </Pagination>
          </div>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.isEditMode ? "Sửa Người Dùng" : "Tạo Người Dùng"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCategoryName" className="mb-3">
                  <Form.Label>Tên Đăng Nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    placeholder="Điền tên đăng nhập"
                    value={this.state.user_name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryName" className="mb-3">
                  <Form.Label>Nickname:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Điền tên"
                    ar
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryName" className="mb-3">
                  <Form.Label>Mật Khẩu</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Điền mật khẩu"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCategoryName" className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Điền số điện thoại"
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCategoryName" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Điền email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Đóng
              </Button>
              <Button
                className={Style.btn_primary}
                onClick={
                  this.state.isEditMode
                    ? this.handleUpdateUser
                    : this.handleClickUser
                }
              >
                {this.state.isEditMode ? "Cập nhật" : "Lưu"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUser: state.AllUserReducer.allUser,
  };
};

const mapDispatchToProps = {
  updateUser,
  GetAllUser,
  CreateUser,
  deleteAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
