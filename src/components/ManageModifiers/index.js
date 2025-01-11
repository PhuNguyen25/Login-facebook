import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Form, Table, Button, Modal, Pagination } from "react-bootstrap";
import Style from "./style.module.scss";
import { CiSearch, CiEdit } from "react-icons/ci";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const { CreateModifierForClient, deleteModifier, updateModifier } =
  Admin.PostRequests;
const { GetAllModifiers, GetAllGroupModifiers } = Admin.GetRequests;

class Modifiers extends React.Component {
  state = {
    modifier_name: "",
    modifier_price: 0,
    modifier_description: "",
    modifier_group_key: "",
    showModal: false,
    selectedModified: [],
    isEditMode: false,
    editingModifierId: null,
    searchQuery: "",
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
    const { allModifiers = {} } = this.props;
    const totalPages = Math.ceil(
      Object.keys(allModifiers).length / itemsPerPage
    );
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
    const { allModifiers } = this.props;
    return allModifiers ? Object.keys(allModifiers).length : 0;
  };
  getStartRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    return totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  };
  componentDidMount() {
    this.props.GetAllModifiers();
    this.props.GetAllGroupModifiers();
  }
  handleEditModifier = (modifierId) => {
    const { allModifiers } = this.props;
    const modifier = allModifiers[modifierId];

    this.setState({
      isEditMode: true,
      editingModifierId: modifierId,
      modifier_name: modifier.modifier_name,
      modifier_price: modifier.modifier_price,
      modifier_description: modifier.modifier_description,
      modifier_group_key: modifier.modifier_group_key,
      showModal: true,
    });
  };
  handleClickItem = () => {
    const {
      modifier_name,
      modifier_price,
      modifier_description,
      modifier_group_key,
    } = this.state;

    const modifierInfo = {
      modifier_name,
      modifier_price,
      modifier_description,
      modifier_group_key,
    };
    if (!modifier_name || !modifier_price || !modifier_group_key) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng điền đầy đủ thông tin bắt buộc.',
      });
      return;
    }
    try {
      this.props.CreateModifierForClient(modifierInfo);
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Bổ sung đã được tạo thành công cho khách hàng.",
      });
      this.props.GetAllModifiers();
      this.setState({
        modifier_name: "",
        modifier_price: 0,
        modifier_description: "",
        modifier_group_key: "",
        showModal: false,
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi tạo bổ sung cho khách hàng:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Đã xảy ra lỗi khi tạo bổ sung cho khách hàng. Vui lòng thử lại sau.",
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  handleModifierGroupChange = (e) => {
    const { value } = e.target;
    this.setState({ modifier_group_key: value });
  };
  handleCloseModal = () => {
    this.setState({
      modifier_name: "",
      modifier_price: 0,
      modifier_description: "",
      modifier_group_key: "",
    });
    this.setState({ showModal: false });
  };
  handleUpdateModifier = () => {
    const {
      modifier_name,
      modifier_price,
      modifier_description,
      modifier_group_key,
      editingModifierId,
    } = this.state;
  
    const updatedModifierInfo = {
      modifier_name,
      modifier_price,
      modifier_description,
      modifier_group_key,
    };
    if (!modifier_name || !modifier_price || !modifier_group_key) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng điền đầy đủ thông tin bắt buộc.',
      });
      return;
    }
    try {
      this.props.updateModifier(editingModifierId, updatedModifierInfo);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Bổ sung đã được cập nhật thành công.',
      });
      this.props.GetAllModifiers();
      this.setState({
        isEditMode: false,
        editingModifierId: null,
        modifier_name: "",
        modifier_price: 0,
        modifier_description: "",
        modifier_group_key: "",
        showModal: false,
      });
      this.handleCloseModal();
    } catch (error) {
      console.error('Đã xảy ra lỗi khi cập nhật bổ sung:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Đã xảy ra lỗi khi cập nhật bổ sung. Vui lòng thử lại sau.',
      });
    }
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
      const { allModifiers } = this.props;
      const allItemIds = Object.keys(allModifiers);

      const selectedModified = prevState.selectAll
        ? [] // If "Select All" was checked, uncheck all items
        : allItemIds; // If "Select All" was unchecked, check all items

      return { selectedModified, selectAll: !prevState.selectAll };
    });
  };
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };
  renderTableRows() {
    const { allModifiers, allGroupModifiers } = this.props;
    const { selectedModified, searchQuery, itemsPerPage, currentPage } =
      this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return Object.keys(allModifiers)
      .filter((key) => {
        const modifier = allModifiers[key];
        return (
          modifier.modifier_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          modifier.modifier_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) // Add additional fields as needed
        );
      })
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((key) => {
        const modifier = allModifiers[key];
        const modifier_group_name =
          allGroupModifiers[modifier.modifier_group_key]?.modifier_group_name ||
          "Không có ";
        return (
          <tr key={modifier.modifier_name} className={Style.item_row}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedModified.includes(key)}
                onChange={() => this.handleCheckboxChange(key)}
              />
            </td>
            <td>{modifier.modifier_name}</td>
            <td>{modifier.modifier_description}</td>
            <td>{modifier.modifier_price}</td>
            <td>{modifier_group_name}</td>
            <td>Publish</td>
            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditModifier(key)}
                >
                  <CiEdit />
                </button>
              </div>
            </td>
          </tr>
        );
      });
  }
  handleDeleteModifier = () => {
    const { selectedModified } = this.state;
  
    if (!selectedModified.length) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng chọn ít nhất một bổ sung để xóa.',
      });
      return;
    }
  
    try {
      this.props.deleteModifier(selectedModified);
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Bổ sung đã được xóa thành công.',
      });
      this.props.GetAllModifiers();
      this.setState({
        selectedModified: [],
      });
    } catch (error) {
      console.error('Đã xảy ra lỗi khi xóa bổ sung:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Đã xảy ra lỗi khi xóa bổ sung. Vui lòng thử lại sau.',
      });
    }
  };
  
  render() {
    const { selectAll, currentPage, itemsPerPage } = this.state;
    const { allGroupModifiers, allModifiers = {} } = this.props;
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(allModifiers).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }
    return (
      <div className={Style.table_container}>
        <h2>Quản lí món ăn kèm</h2>
        <div className={Style.header_table}>
          <div className={Style.header_table_container}>
            <div className={`${Style.app_search} d-none d-lg-block mx-3`}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                  value={this.state.searchQuery}
                  onChange={(e) => this.handleSearchChange(e.target.value)}
                />
                <CiSearch />
              </div>
            </div>

            <div className={Style.header_btn_group}>
              <div
                className={`${Style.btn_group} btn-group`}
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className={`${Style.btn_filter} btn dropdown-toggle`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaFilter /> Danh mục
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                </ul>
              </div>
              <button
                className={Style.header_add_button}
                onClick={this.handleShowModal}
              >
                <div>
                  <FaPlus />
                  <span>Thêm món ăn kèm</span>
                </div>
              </button>
              <button
                className={Style.header_delete_button}
                onClick={this.handleDeleteModifier}
              >
                <div>
                  <FaRegTrashAlt />
                  <span>Xoá</span>
                </div>
              </button>
            </div>
          </div>
          <Table hover className={Style.table}>
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
                <th>Tên món ăn kèm</th>
                <th>Mô tả món</th>
                <th>Giá</th>
                <th>Mục đồ ăn kèm</th>
                <th>Trạng thái</th>
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
                {this.state.isEditMode ? "Sửa Modifier" : "Tạo Modifier"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formModifierName" className="mb-3">
                  <Form.Label>Tên món ăn kèm:</Form.Label>
                  <Form.Control
                    type="text"
                    name="modifier_name"
                    value={this.state.modifier_name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formModifierPrice" className="mb-3">
                  <Form.Label>Giá:</Form.Label>
                  <Form.Control
                    type="text"
                    name="modifier_price"
                    value={this.state.modifier_price}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formModifierDescription"
                  className="mb-3"
                >
                  <Form.Label>Mô tả:</Form.Label>
                  <Form.Control
                    type="text"
                    name="modifier_description"
                    value={this.state.modifier_description}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Form>
              <Form.Group controlId="formModifierGroup">
                <Form.Label>Mục đồ ăn kèm</Form.Label>
                <Form.Control
                  as="select"
                  name="modifier_group_key"
                  value={this.state.modifier_group_key}
                  onChange={this.handleModifierGroupChange}
                >
                  <option value="">-- Chọn mục ăn kèm --</option>
                  {Object.keys(allGroupModifiers).map((key) => (
                    <option key={key} value={key}>
                      {allGroupModifiers[key].modifier_group_name}
                    </option>
                  ))}
                </Form.Control>
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
                    ? this.handleUpdateModifier
                    : this.handleClickItem
                }
              >
                {this.state.isEditMode ? "Cập nhật" : "Tạo món ăn kèm"}
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
    allModifiers: state.AllModifierReducer.allModifiers,
    allGroupModifiers: state.AllGroupModifierReducer.allGroupModifiers,
  };
};

const mapDispatchToProps = {
  updateModifier,
  deleteModifier,
  CreateModifierForClient,
  GetAllModifiers,
  GetAllGroupModifiers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modifiers);
