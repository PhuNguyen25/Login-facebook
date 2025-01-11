import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import {
  Table,
  Form,
  Button,
  Col,
  Row,
  Modal,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Style from "./style.module.scss";
import "./Uploader.scss";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiSearch, CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

const { CreateItem, deleteItem, updateItem, UploadImage } = Admin.PostRequests;
const { GetAllItems, GetAllCategories, GetAllGroupModifiers } =
  Admin.GetRequests;

class Item extends React.Component {
  state = {
    category_key: "",
    itemIsOnSale: false,
    itemSaleRate: 0,
    itemIsInStock: false,
    item_description: "",
    thumbnail_image: "",
    item_name: "",
    item_price: 0,
    modifier_group_key: "",
    showModal: false,
    selectedItems: [],
    selectAll: false,
    isEditMode: false,
    editingItemId: null,
    currentPage: 1,
    itemsPerPage: 4,
    isPublishedProduct: false,
    selectedStatus: 0,
    selectedStockStatus: 0,
    searchQuery: "",
    selectedCategory: "",
    selectedModifierGroups: [],
  };

  componentDidMount() {
    this.props.GetAllItems();
    this.props.GetAllCategories();
    this.props.GetAllGroupModifiers();
  }
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleEditItem = (itemId) => {
    const { allItems } = this.props;
    const item = allItems[itemId];
    this.setState({
      isEditMode: true,
      editingItemId: itemId,
      category_key: item.category_key,
      itemIsOnSale: item.itemIsOnSale,
      itemSaleRate: item.itemSaleRate,
      item_description: item.item_description,
      thumbnail_image: item.thumbnail_image,
      item_name: item.item_name,
      item_price: item.item_price,
      modifier_group_key: item.modifier_group_key,
      isPublishedProduct: item.isPublishedProduct,
      itemIsInStock: item.itemIsInStock,
      showModal: true,
    });
  };

  handleClickItem = () => {
    const {
      category_key,
      itemIsOnSale,
      itemSaleRate,
      item_description,
      thumbnail_image,
      item_name,
      item_price,
      itemIsInStock,
      isPublishedProduct,
    } = this.state;

    const { selectedModifierGroups } = this.state;

    const itemInfo = {
      category_key,
      itemIsOnSale,
      itemSaleRate,
      item_description,
      thumbnail_image,
      item_name,
      item_price,
      itemIsInStock,
      isPublishedProduct,
      modifier_group_keys: selectedModifierGroups,
    };

    if (!category_key || !item_name || !item_price) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin bắt buộc.",
      });
      return;
    }

    this.props
      .CreateItem(itemInfo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mặt hàng đã được tạo thành công.",
        });

        this.handleCloseModal();
        this.props.GetAllItems();
        this.setState({
          category_key: "",
          itemIsOnSale: false,
          itemSaleRate: 0,
          item_description: "",
          thumbnail_image: "",
          item_name: "",
          item_price: 0,
          selectedModifierGroups: [],
          showModal: false,
          showModalDelete: false,
          itemIsInStock: false,
          isPublishedProduct: false,
        });
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi tạo mặt hàng:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi tạo mặt hàng. Vui lòng thử lại sau.",
        });
      });
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue;
    if (type === "checkbox") {
      inputValue = checked;
    } else if (type === "number") {
      const numericValue = parseFloat(value);
      inputValue = !isNaN(numericValue) && numericValue >= 0 ? numericValue : 0;
    } else {
      inputValue = value;
    }

    this.setState({ [name]: inputValue });
  };

  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  handleDeleteItem = () => {
    const { selectedItems } = this.state;

    if (!selectedItems.length) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng chọn ít nhất một mặt hàng để xóa.",
      });
      return;
    }

    this.props
      .deleteItem(selectedItems)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mặt hàng đã được xóa thành công.",
        });

        this.props.GetAllItems();

        this.setState({
          selectedItems: [],
        });
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi xóa mặt hàng:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi xóa mặt hàng. Vui lòng thử lại sau.",
        });
      });
  };

  handleCategoryChange = (e) => {
    const { value } = e.target;
    this.setState({ category_key: value });
  };
  handleModifierGroupChange = (e) => {
    const { value } = e.target;
    const { selectedModifierGroups } = this.state;

    if (selectedModifierGroups.includes(value)) {
      this.setState({
        selectedModifierGroups: selectedModifierGroups.filter(
          (key) => key !== value
        ),
      });
    } else {
      this.setState({
        selectedModifierGroups: [...selectedModifierGroups, value],
      });
    }
  };

  handleShowModalDelete = () => {
    this.setState({ showModalDelete: true });
  };
  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const path = reader.result;

      try {
        await this.props.UploadImage(path);

        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Hình ảnh đã được tải lên thành công.",
        });
        this.setState({
          thumbnail_image: this.props.path,
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tải lên hình ảnh:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi tải lên hình ảnh. Vui lòng thử lại sau.",
        });
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleUpdateItem = () => {
    const {
      category_key,
      itemIsOnSale,
      itemSaleRate,
      item_description,
      thumbnail_image,
      item_name,
      item_price,
      modifier_group_key,
      editingItemId,
      itemIsInStock,
      isPublishedProduct,
    } = this.state;

    const updatedItemInfo = {
      category_key,
      itemIsOnSale,
      itemSaleRate,
      item_description,
      thumbnail_image,
      item_name,
      item_price,
      modifier_group_key,
      itemIsInStock,
      isPublishedProduct,
    };
    if (!category_key || !item_name || !item_price) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin bắt buộc.",
      });
      return;
    }

    this.props
      .updateItem(editingItemId, updatedItemInfo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mặt hàng đã được cập nhật thành công.",
        });

        this.handleCloseModal();
        this.props.GetAllItems();
        this.setState({
          isEditMode: false,
          editingItemId: null,
          category_key: "",
          itemIsOnSale: false,
          itemSaleRate: 0,
          item_description: "",
          thumbnail_image: "",
          item_name: "",
          item_price: 0,
          modifier_group_key: "",
          showModal: false,
          isPublishedProduct: false,
          itemIsInStock: false,
        });
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi cập nhật mặt hàng:", error);

        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi cập nhật mặt hàng. Vui lòng thử lại sau.",
        });
      });
  };

  handleCloseModal = () => {
    this.setState({
      isEditMode: false,
      editingItemId: null,
      category_key: "",
      itemIsOnSale: false,
      itemSaleRate: 0,
      item_description: "",
      thumbnail_image: "",
      item_name: "",
      item_price: 0,
      modifier_group_key: "",
      showModal: false,
      itemIsInStock: false,
      isPublishedProduct: false,
    });
    this.setState({ showModal: false });
  };
  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedItems = prevState.selectedItems.includes(itemId)
        ? prevState.selectedItems.filter((id) => id !== itemId)
        : [...prevState.selectedItems, itemId];

      return { selectedItems };
    });
  };
  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { allItems } = this.props;
      const allItemIds = Object.keys(allItems);

      const selectedItems = prevState.selectAll
        ? [] // If "Select All" was checked, uncheck all items
        : allItemIds; // If "Select All" was unchecked, check all items

      return { selectedItems, selectAll: !prevState.selectAll };
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
    const { allItems } = this.props;
    const totalPages = Math.ceil(Object.keys(allItems).length / itemsPerPage);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };
  getTotalItems = () => {
    const { allItems } = this.props;
    return allItems ? Object.keys(allItems).length : 0;
  };
  handleAddModifierGroupForm = () => {
    this.setState({
      selectedModifierGroups: [...this.state.selectedModifierGroups, ""],
    });
  };
  handleSpecificModifierGroupChange = (index, e) => {
    const { value } = e.target;
    const { selectedModifierGroups } = this.state;

    const updatedModifierGroups = [...selectedModifierGroups];
    updatedModifierGroups[index] = value;

    this.setState({
      selectedModifierGroups: updatedModifierGroups,
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

  renderTableRows() {
    const { allItems, allCategories, allGroupModifiers } = this.props;
    const {
      currentPage,
      itemsPerPage,
      selectedItems,
      selectedStatus,
      selectedStockStatus,
    } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Object.keys(allItems)
      .filter((key) => {
        const item = allItems[key];
        const statusFilter =
          this.state.selectedStatus === 0 ||
          (this.state.selectedStatus === 1 && item.isPublishedProduct) ||
          (this.state.selectedStatus === 2 && !item.isPublishedProduct);

        const stockFilter =
          this.state.selectedStockStatus === 0 ||
          (this.state.selectedStockStatus === 1 && item.itemIsInStock) ||
          (this.state.selectedStockStatus === 2 && !item.itemIsInStock);

        const nameFilter = item.item_name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase());
        const categoryFilter =
          this.state.selectedCategory === "" ||
          this.state.selectedCategory ===
            (allCategories[item.category_key]?.name || "");

        return statusFilter && stockFilter && nameFilter && categoryFilter;
      })
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((key) => {
        const item = allItems[key];
        const categoryName =
          allCategories[item.category_key]?.name || "Không có danh mục";
        const modifier_group_name =
          allGroupModifiers[item.modifier_group_key]?.modifier_group_name ||
          "Không có ";
        return (
          <tr key={item._id} className={Style.item_row}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => this.handleCheckboxChange(item._id)}
              />
            </td>
            <td>
              <img
                className={Style.thumbnail_item}
                src={item.thumbnail_image}
                alt={item.item_name}
              />
            </td>
            <td>{item.item_name}</td>
            <td>{item.item_price}</td>
            <td>{item.itemSaleRate}</td>
            <td>{categoryName}</td>
            <td>{modifier_group_name}</td>
            <td>{item.isPublishedProduct ? "Hiện sản phẩm" : "Ẩn sản phẩm"}</td>
            <td>{item.itemIsInStock ? "Còn hàng" : "Hết hàng"}</td>
            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditItem(item._id)}
                >
                  <CiEdit />
                </button>
              </div>
            </td>
          </tr>
        );
      });
    return currentItems;
  }

  render() {
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const { allCategories = {}, allItems, allGroupModifiers } = this.props;

    const { itemIsOnSale, selectAll, currentPage, itemsPerPage } = this.state;
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(allItems).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }
    return (
      <div className={Style.table_container}>
        <h2>Quản lí sản phẩm</h2>
        <div className={Style.header_table}>
          <div className={Style.header_top_bar}>
            <h4 className="mb-4">Lọc sản phẩm</h4>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    this.setState({ selectedStatus: parseInt(e.target.value) })
                  }
                >
                  <option value={0} selected>
                    Trạng thái
                  </option>
                  <option value={1}>Hiện sản phẩm</option>
                  <option value={2}>Ẩn sản phẩm</option>
                </select>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    this.setState({
                      selectedCategory: e.target.value,
                      currentPage: 1,
                    })
                  }
                >
                  <option value="" selected>
                    Danh mục
                  </option>
                  {Object.values(allCategories)?.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    this.setState({
                      selectedStockStatus: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0} selected>
                    Tình trạng hàng hoá
                  </option>
                  <option value={1}>Còn hàng</option>
                  <option value={2}>Hết hàng</option>
                </select>
              </div>
            </div>
          </div>
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
            <div>
              <button
                className={Style.header_add_button}
                onClick={this.handleShowModal}
              >
                <div>
                  <FaPlus />
                  <span>Thêm sản phẩm</span>
                </div>
              </button>
              <button
                className={Style.header_delete_button}
                onClick={this.handleDeleteItem}
              >
                <div>
                  <FaRegTrashAlt />
                  <span>Xoá</span>
                </div>
              </button>
            </div>
          </div>
          <Table className={Style.table} responsive="lg" hover>
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
                <th>Hình Ảnh</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Tỉ Lệ Giảm Giá</th>
                <th>Thuộc Danh Mục</th>
                <th>Tên mục ăn kèm</th>
                <th>Trạng thái</th>
                <th>Tồn kho</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderTableRows()}</tbody>
          </Table>

          <Modal
            className={Style.modal}
            fullscreen
            show={this.state.showModal}
            onHide={this.handleCloseModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="row">
                <div className="col-12 col-lg-8">
                  <p className={Style.add_product_title}>Thông tin sản phẩm</p>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingInputValue"
                      defaultValue={""}
                      name="item_name"
                      value={this.state.item_name}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="floatingInputValue">Tên Sản Phẩm</label>
                  </div>
                  <div className="form-floating my-3">
                    <textarea
                      className="form-control"
                      id="floatingTextarea"
                      defaultValue={""}
                    />
                    <label htmlFor="floatingTextarea">Mô tả sản phẩm</label>
                  </div>
                  <div id="file-upload-form" className="uploader">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Hình ảnh</span>
                      <small className="fw-light">Add media from URL</small>
                    </div>
                    <input
                      onChange={(e) =>
                        this.handleImageUpload(e.target.files[0])
                      }
                      id="file-upload"
                      type="file"
                      name="fileUpload"
                      accept="image/*"
                    />
                    <label htmlFor="file-upload" id="file-drag">
                      <img
                        id="file-image"
                        src="#"
                        alt="Preview"
                        className="hidden"
                      />
                      <div id="start">
                        <i className="fa fa-download" aria-hidden="true" />
                        <div>Chọn hình ảnh hoặc kéo thả vào đây !</div>
                        <span id="file-upload-btn" className="btn btn-primary">
                          Chọn hình ảnh
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <p className={Style.add_product_title}>Giá sản phẩm</p>
                  <div className="form-floating">
                    <input
                      type="text"
                      name="item_price"
                      className="form-control"
                      id="item_price"
                      value={this.state.item_price}
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="item_price">Giá</label>
                  </div>
                  <div className="form-check form-switch my-3">
                    <input
                      defaultChecked
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      name="itemIsOnSale"
                      checked={this.state.itemIsOnSale}
                      onChange={this.handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    >
                      Giảm giá sản phẩm
                    </label>
                  </div>

                  {itemIsOnSale && (
                    <div className="form-floating my-2">
                      <input
                        type="number"
                        className="form-control"
                        id="itemSaleRate"
                        name="itemSaleRate"
                        value={this.state.itemSaleRate}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="item_price">
                        Tỉ Lệ Giảm Giá (% phần trăm)
                      </label>
                    </div>
                  )}
                  <div className="form-check form-switch my-4">
                    <input
                      defaultChecked
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      name="itemIsInStock"
                      checked={this.state.itemIsInStock}
                      onChange={this.handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckChecked"
                    >
                      Còn hàng
                    </label>
                  </div>
                  <Form.Group controlId="formItemCategory">
                    <div className={Style.add_product_title}>Danh mục</div>
                    <div className="form-floating my-3">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        name="category_key"
                        value={this.state.category_key}
                        onChange={this.handleCategoryChange}
                      >
                        <option value={""}></option>
                        {Object.keys(allCategories).map((key) => (
                          <option key={key} value={key}>
                            {allCategories[key].name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">Danh mục</label>
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formItemCategory">
                    <button onClick={this.handleAddModifierGroupForm}>
                      Add Modifier Group
                    </button>
                    {this.state.selectedModifierGroups.map(
                      (selectedGroup, index) => (
                        <div key={index} className="form-floating my-3">
                          <select
                            className="form-select"
                            id={`floatingSelect_${index}`}
                            name="modifier_group_key"
                            value={selectedGroup}
                            onChange={(e) =>
                              this.handleModifierGroupChange(index, e)
                            }
                          >
                            {/* Options and mapping logic for modifier groups go here */}
                          </select>
                          <label htmlFor={`floatingSelect_${index}`}>
                            Nhóm ăn kèm
                          </label>
                        </div>
                      )
                    )}

                    <div className="form-check form-switch mt-3">
                      <input
                        defaultChecked
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        name="isPublishedProduct"
                        checked={this.state.isPublishedProduct}
                        onChange={this.handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Hiển thị sản phẩm
                      </label>
                    </div>
                  </Form.Group>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Huỷ
              </Button>
              <Button
                className={Style.btn_primary}
                variant="primary"
                onClick={
                  this.state.isEditMode
                    ? this.handleUpdateItem
                    : this.handleClickItem
                }
              >
                {this.state.isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              </Button>
            </Modal.Footer>
          </Modal>
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
    allItems: state.AllItemReducer.allItems,
    allCategories: state.AllCategoryReducer.allCategories,
    allGroupModifiers: state.AllGroupModifierReducer.allGroupModifiers,
    path: state.UploadImageReducer.path,
  };
};

const mapDispatchToProps = {
  UploadImage,
  updateItem,
  deleteItem,
  CreateItem,
  GetAllItems,
  GetAllCategories,
  GetAllGroupModifiers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
