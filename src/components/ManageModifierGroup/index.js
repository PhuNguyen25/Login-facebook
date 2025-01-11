import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Form, Modal, Button, Table, Pagination } from "react-bootstrap";
import Style from "./style.module.scss";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiSearch, CiEdit } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import Swal from "sweetalert2";
const { CreateGroupModifier, deleteGroupModifier, updateGroupModifier } =
  Admin.PostRequests;
const { GetAllGroupModifiers } = Admin.GetRequests;

class ModifierGroup extends React.Component {
  state = {
    modifier_group_name: "",
    modify_group_allow_multiple: false,
    modify_group_choice: 0,
    modify_group_is_required: false,
    showModal: false,
    selectedModified: [],
    selectAll: false,
    isEditMode: false,
    editingModifierId: null,
    currentPage: 1,
    itemsPerPage: 5,
  };

  componentDidMount() {
    this.props.GetAllGroupModifiers();
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    this.setState({ [name]: inputValue });
  };
  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };
  handleNextPage = () => {
    const { currentPage, itemsPerPage } = this.state;
    const { allGroupModifiers } = this.props;
    const totalPages = Math.ceil(
      Object.keys(allGroupModifiers).length / itemsPerPage
    );
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };
  getTotalItems = () => {
    const { allGroupModifiers } = this.props;
    return allGroupModifiers ? Object.keys(allGroupModifiers).length : 0;
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

  handleUpdateModifierGroup = () => {
    const {
      modifier_group_name,
      modify_group_allow_multiple,
      modify_group_choice,
      modify_group_is_required,
      editingModifierId,
    } = this.state;

    const updatedModifierGroupInfo = {
      modifier_group_name,
      modify_group_allow_multiple,
      modify_group_choice,
      modify_group_is_required,
    };

    try {
      this.props.updateGroupModifier(
        editingModifierId,
        updatedModifierGroupInfo
      );
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Nhóm ăn kèm đã được cập nhật thành công.",
      });
      this.props.GetAllGroupModifiers();
      this.setState({
        isEditMode: false,
        editingModifierId: null,
        modifier_group_name: "",
        modify_group_allow_multiple: false,
        modify_group_choice: 0,
        modify_group_is_required: false,
        showModal: false,
      });
      this.handleCloseModal();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi cập nhật nhóm sửa đổi:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi cập nhật nhóm ăn kèm. Vui lòng thử lại sau.",
      });
    }
  };

  handleEditModifierGroup = (modifierId) => {
    const { allGroupModifiers } = this.props;
    const modifierGroup = allGroupModifiers[modifierId];

    this.setState({
      isEditMode: true,
      editingModifierId: modifierId,
      modifier_group_name: modifierGroup.modifier_group_name,
      modify_group_allow_multiple: modifierGroup.modify_group_allow_multiple,
      modify_group_choice: modifierGroup.modify_group_choice,
      modify_group_is_required: modifierGroup.modify_group_is_required,
      showModal: true,
    });
  };

  handleDeleteGroupModifier = () => {
    const { selectedModified } = this.state;

    if (!selectedModified.length) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng chọn ít nhất một nhóm sửa đổi để xóa.",
      });
      return;
    }

    try {
      this.props.deleteGroupModifier(selectedModified);

      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Nhóm ăn kèm đã được xóa thành công.",
      });

      this.props.GetAllGroupModifiers();

      this.setState({
        selectedModified: [],
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xóa nhóm sửa đổi:", error);

      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi xóa nhóm sửa đổi. Vui lòng thử lại sau.",
      });
    }
  };

  handleCreateGroupModifier = async () => {
    const {
      modifier_group_name,
      modify_group_allow_multiple,
      modify_group_choice,
      modify_group_is_required,
    } = this.state;

    const modifyGroupInfo = {
      modifier_group_name,
      modify_group_allow_multiple,
      modify_group_choice,
      modify_group_is_required,
    };
    if (!modifier_group_name) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }

    try {
      await this.props.CreateGroupModifier(modifyGroupInfo);
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Nhóm món ăn kèm đã được tạo thành công.",
      });
      this.props.GetAllGroupModifiers();
      this.setState({
        modifier_group_name: "",
        modify_group_allow_multiple: false,
        modify_group_choice: 0,
        modify_group_is_required: false,
      });
      this.handleCloseModal();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo nhóm sửa đổi:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi tạo nhóm sửa đổi. Vui lòng thử lại sau.",
      });
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({
      modifier_group_name: "",
      modify_group_allow_multiple: false,
      modify_group_choice: 0,
      modify_group_is_required: false,
    });

    this.setState({ showModal: false });
  };
  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedModified = prevState.selectedModified.includes(itemId)
        ? prevState.selectedModified.filter((id) => id !== itemId)
        : [...prevState.selectedModified, itemId];

      return { selectedModified };
    });
  };
  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { allGroupModifiers } = this.props;
      const allItemIds = Object.keys(allGroupModifiers);

      const selectedModified = prevState.selectAll
        ? [] // If "Select All" was checked, uncheck all items
        : allItemIds; // If "Select All" was unchecked, check all items

      return { selectedModified, selectAll: !prevState.selectAll };
    });
  };
  renderTableRows() {
    const { allGroupModifiers } = this.props;
    const { selectedModified, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (!allGroupModifiers) {
      return null;
    }
    const currentGroupModifiers = Object.keys(allGroupModifiers)
      .slice(indexOfFirstItem, indexOfLastItem)
      ?.map((key) => {
        const item = allGroupModifiers[key];
        return (
          <tr key={item._id} className={Style.item_row}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedModified.includes(key)}
                onChange={() => this.handleCheckboxChange(key)}
              />
            </td>
            <td>{item.modifier_group_name}</td>
            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditModifierGroup(key)}
                >
                  <CiEdit />
                </button>
              </div>
            </td>
          </tr>
        );
      });
    return currentGroupModifiers;
  }

  render() {
    const { selectAll, currentPage, itemsPerPage } = this.state;
    const { allGroupModifiers } = this.props;
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(allGroupModifiers).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }
    return (
      <div className={Style.table_container}>
        <h2>Quản lí mục ăn kèm</h2>
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
                  <span>Thêm nhóm đồ ăn kèm</span>
                </div>
              </button>
              <button
                className={Style.header_delete_button}
                onClick={this.handleDeleteGroupModifier}
              >
                <div>
                  <FaRegTrashAlt />
                  <span>Xoá</span>
                </div>
              </button>
            </div>
          </div>

          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.isEditMode
                  ? "Sửa nhóm đồ ăn kèm"
                  : "Tạo nhóm đồ ăn kèm"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Tên nhóm đồ ăn kèm</Form.Label>
                <Form.Control
                  type="text"
                  name="modifier_group_name"
                  value={this.state.modifier_group_name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Check
                className="my-3"
                type="checkbox"
                label="Cho phép chọn nhiều món cùng lúc"
                name="modify_group_allow_multiple"
                checked={this.state.modify_group_allow_multiple}
                onChange={this.handleInputChange}
              />
              {this.state.modify_group_allow_multiple && (
                <Form.Group>
                  <Form.Label>Số lượng được chọn cùng lúc</Form.Label>
                  <Form.Control
                    type="number"
                    name="modify_group_choice"
                    value={this.state.modify_group_choice}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              )}
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  name="modify_group_is_required"
                  label="Bắt buộc chọn món ăn kèm"
                  checked={this.state.modify_group_is_required}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Đóng
              </Button>
              <Button
                className={Style.btn_primary}
                onClick={
                  this.state.isEditMode
                    ? this.handleUpdateModifierGroup
                    : this.handleCreateGroupModifier
                }
              >
                Lưu
              </Button>
            </Modal.Footer>
          </Modal>

          <Table className={Style.table} hover>
            <thead>
              <tr>
                <th>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectAll}
                    onChange={this.handleSelectAllChange}
                  />
                </th>
                <th>Tên nhóm đồ ăn kèm</th>
                <th>Hành động</th>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allGroupModifiers: state.AllGroupModifierReducer.allGroupModifiers,
  };
};

const mapDispatchToProps = {
  updateGroupModifier,
  deleteGroupModifier,
  CreateGroupModifier,
  GetAllGroupModifiers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifierGroup);
