import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import Style from "./style.module.scss";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiSearch, CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

const { CreateCategory, UploadImage, deleteCategory, updateCategory } =
  Admin.PostRequests;
const { GetAllCategories } = Admin.GetRequests;

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      group_images: "",
      showModal: false,
      selectAll: false,
      selectedCategory: [],
      currentPage: 1,
      itemsPerPage: 4,
      isEditMode: false,
      editingCategoryId: null,
      isDeleteSuccess: false,
      status: "hidden",
      searchQuery: "",
      selectedStatusFilter: "",
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    this.props.GetAllCategories();
  }
  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  handleUpdateCategory = () => {
    const { name, group_images, editingCategoryId } = this.state;

    const updatedCategoryInfo = {
      name,
      group_images,
    };
    this.props.updateCategory(editingCategoryId, updatedCategoryInfo);
    this.props.GetAllCategories();

    this.setState({
      isEditMode: false,
      editingCategoryId: null,
      name: "",
      group_images: "",
    });

    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleClickCategory = () => {
    const { name, group_images, status } = this.state;

    // Kiểm tra xem các trường dữ liệu có rỗng không
    if (!name || !group_images || !status) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }

    const categoryInfo = {
      name,
      group_images,
      status,
    };
    // Gọi hàm tạo danh mục từ props
    this.props
      .CreateCategory(categoryInfo)
      .then(() => {
        // Hiển thị thông báo thành công nếu thao tác thành công
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Danh mục đã được tạo thành công.",
        });
        // Lấy lại danh sách tất cả các danh mục
        this.props.GetAllCategories();
        // Đóng Modal và reset trạng thái
        this.handleCloseModal();
        this.setState({
          name: "",
          group_images: "",
          status: "",
          error: "",
        });
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi tạo danh mục:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi tạo danh mục. Vui lòng thử lại sau.",
        });
      });
  };

  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedCategory = prevState.selectedCategory.includes(itemId)
        ? prevState.selectedCategory.filter((id) => id !== itemId)
        : [...prevState.selectedCategory, itemId];

      return { selectedCategory };
    });
  };

  handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const path = reader.result;

      await this.props.UploadImage(path);

      this.setState({
        group_images: this.props.path,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  handleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };
  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { allCategories } = this.props;
      const allItemIds = Object.keys(allCategories);

      const selectedCategory = prevState.selectAll ? [] : allItemIds;

      return { selectedCategory, selectAll: !prevState.selectAll };
    });
  };
  handleEditCategory = (categoryId) => {
    const { allCategories } = this.props;
    const category = allCategories[categoryId];

    this.setState({
      isEditMode: true,
      editingCategoryId: categoryId,
      name: category.name,
      group_images: category.group_images,
      showModal: true,
    });
  };
  handleUpdateCategory = () => {
    const { name, group_images, editingCategoryId, status } = this.state;

    if (!name || !group_images || !status) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }

    const updatedCategoryInfo = {
      name,
      group_images,
      status,
    };

    this.props
      .updateCategory(editingCategoryId, updatedCategoryInfo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Danh mục đã được cập nhật thành công.",
        });
        this.props.GetAllCategories();

        this.setState({
          isEditMode: false,
          editingCategoryId: null,
          name: "",
          group_images: "",
          status: "",
        });
        this.handleCloseModal();
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi cập nhật danh mục:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi cập nhật danh mục. Vui lòng thử lại sau.",
        });
      });
  };

  handleDeleteCategory = () => {
    const { selectedCategory } = this.state;
    this.props.deleteCategory(selectedCategory);
    this.props.GetAllCategories();
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  handleNextPage = () => {
    const { currentPage, itemsPerPage } = this.state;
    const { allCategories } = this.props;
    const totalPages = Math.ceil(
      Object.keys(allCategories).length / itemsPerPage
    );
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    } else {
      console.log("Error to click next page");
    }
  };
  getTotalItems = () => {
    const { allCategories } = this.props;
    return allCategories ? Object.keys(allCategories).length : 0;
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
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  renderTableRows() {
    const { allCategories } = this.props;
    const { currentPage, itemsPerPage, selectedCategory } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (!allCategories) {
      return null;
    }
    const currentCategories = Object.keys(allCategories)
      .filter((key) => {
        const categoryName = allCategories[key]?.name || "";
        const statusFilter =
          this.state.selectedStatusFilter &&
          allCategories[key]?.status === this.state.selectedStatusFilter;
        return (
          categoryName
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase()) &&
          (statusFilter || !this.state.selectedStatusFilter)
        );
      })
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((key) => {
        const category = allCategories[key];
        return (
          <tr key={key} className={Style.item_row}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedCategory.includes(key)}
                onChange={() => this.handleCheckboxChange(key)}
              />
            </td>
            <td>
              <img
                src={category.group_images}
                alt={category.group_images}
                style={{
                  maxWidth: "50px",
                  borderRadius: 10,
                  maxHeight: "70px",
                }}
              />
            </td>
            <td>{category.name}</td>

            <td>
              {category.status === "hidden"
                ? "Danh Mục Đang Ẩn"
                : "Danh Mục Đang Hiện"}
            </td>

            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditCategory(key)}
                >
                  <CiEdit />
                </button>
              </div>
            </td>
          </tr>
        );
      });
    return currentCategories;
  }
  andleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };
  handleStatusFilterChange = (status) => {
    this.setState({ selectedStatusFilter: status, currentPage: 1 });
  };

  render() {
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const { selectAll, currentPage, itemsPerPage, selectedCategory } =
      this.state;
    const { allCategories } = this.props;
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(allCategories).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }

    return (
      <div className={Style.table_container}>
        <h2>Quản lí danh mục</h2>
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
                  <FaFilter /> Lọc trạng thái
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.handleStatusFilterChange("")}
                    >
                      Hiện Tất Cả
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.handleStatusFilterChange("hidden")}
                    >
                      Ẩn danh mục
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => this.handleStatusFilterChange("visible")}
                    >
                      Hiện danh mục
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
                  <span>Thêm danh mục</span>
                </div>
              </button>
              <button
                className={`${Style.header_delete_button} ${
                  Array.from(selectedCategory).length === 0 &&
                  `${Style.inactive}`
                }`}
                onClick={this.handleDeleteCategory}
              >
                <div>
                  <FaRegTrashAlt />
                  <span>Xoá</span>
                </div>
              </button>
            </div>
          </div>

          <Table className={Style.table} hover responsive>
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
                <th>Hình Ảnh</th>
                <th>Tên Danh Mục</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{this.renderTableRows()}</tbody>
          </Table>

          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.isEditMode ? "Sửa danh mục" : "Tạo danh mục"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCategoryName">
                  <Form.Label>Tên Danh Mục:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Điền tên danh mục"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formCategoryImages">
                  <Form.Label className={Style.image_cate}>
                    Hình Ảnh Danh Mục:
                  </Form.Label>
                  <div className={Style.file_upload_container}>
                    <div className="input-group mb-3">
                      <label
                        className={`${Style.file_upload_label} input-group-text`}
                        htmlFor="inputGroupFile01"
                      >
                        Chọn ảnh
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="inputGroupFile01"
                        onChange={(e) =>
                          this.handleImageUpload(e.target.files[0])
                        }
                      />
                    </div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={this.state.status}
                      onChange={this.handleStatusChange}
                    >
                      <option value="hidden">Ẩn danh mục</option>
                      <option value="visible">Hiện danh mục</option>
                    </select>
                  </div>
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
                    ? this.handleUpdateCategory
                    : this.handleClickCategory
                }
              >
                Lưu thay đổi
              </Button>
            </Modal.Footer>
          </Modal>
          <div className={`${Style.Pagination_div} mx-4`}>
            <div className={Style.paginationInfo}>
              Hiển thị từ {startRange} đến {endRange} danh mục
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
    allCategories: state.AllCategoryReducer.allCategories,
    categoryInfo: state.deleteCategoryReducer.categoryInfo,
    path: state.UploadImageReducer.path,
    loading: state.UploadImageReducer.loading,
    all: state.UploadImageReducer,
  };
};

const mapDispatchToProps = {
  updateCategory,
  deleteCategory,
  CreateCategory,
  GetAllCategories,
  UploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
