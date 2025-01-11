import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import Style from "./style.module.scss";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiSearch, CiEdit } from "react-icons/ci";

const { GetAllOrder } = Admin.GetRequests;
const { updateOrder } = Admin.PostRequests;

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      currentPage: 1,
      itemsPerPage: 2,
      isEditMode: false,
      editingOrderId: null,
      isDeleteSuccess: false,
      showModal: false,
      selectAll: false,
      order_items: [],
      searchQuery: "",
      selectedStatusFilter: "",
    };
  }

  componentDidMount() {
    this.props.GetAllOrder();
  }
  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  // handleClickCategory = () => {
  //   const { name, group_images } = this.state;

  //   const categoryInfo = {
  //     name,
  //     group_images,
  //   };
  //   this.props.CreateCategory(categoryInfo);
  //   this.props.GetAllCategories();
  //   this.handleCloseModal();
  //   this.setState({
  //     name: "",
  //     group_images: "",
  //   });
  // };

  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedCategory = prevState.selectedCategory.includes(itemId)
        ? prevState.selectedCategory.filter((id) => id !== itemId)
        : [...prevState.selectedCategory, itemId];

      return { selectedCategory };
    });
  };

  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { order = {} } = this.props;
      const allItemIds = Object.keys(order);

      const selectedCategory = prevState.selectAll ? [] : allItemIds;

      return { selectedCategory, selectAll: !prevState.selectAll };
    });
  };
  handleEditCategory = (key, allOrder) => {
    const { order } = this.props;
    const orderInfo = order[key];

    this.setState({
      showModal: true,
      editingOrderId: key,
      order_items: orderInfo.order_items,
      address: orderInfo.shipping_address.address,
      email: orderInfo.shipping_address.email,
      fullName: orderInfo.shipping_address.fullName,
      note: orderInfo.shipping_address.note,
      paymentMethod: orderInfo.shipping_address.paymentMethod,
      phoneNumber: orderInfo.shipping_address.phoneNumber,
    });
  };

  // handleDeleteCategory = () => {
  //   const { selectedCategory } = this.state;
  //   this.props.deleteCategory(selectedCategory);
  //   this.props.GetAllCategories();
  // };
  handleUpdateCategory = () => {
    const {
      order_items,
      editingOrderId,
      address,
      email,
      fullName,
      note,
      paymentMethod,
      phoneNumber,
    } = this.state;
    const updatedCategoryInfo = {
      order_items,
      shipping_address: {
        address,
        email,
        fullName,
        note,
        order_status: "đã giao hàng",
        paymentMethod,
        phoneNumber,
      },
    };

    this.props.updateOrder(editingOrderId, updatedCategoryInfo);

    this.props.GetAllOrder();

    this.setState({});

    this.handleCloseModal();
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  handleNextPage = () => {
    const { currentPage, itemsPerPage } = this.state;
    const { order = {} } = this.props;
    const totalPages = Math.ceil(Object.keys(order).length / itemsPerPage);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    } else {
      console.log("Error to click next page");
    }
  };
  getTotalItems = () => {
    const { order = {} } = this.props;
    return order ? Object.keys(order).length : 0;
  };
  handleStatusFilterChange = (status) => {
    this.setState({ selectedStatusFilter: status, currentPage: 1 });
  };

  getStartRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    return totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  };
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getEndRange = () => {
    const { currentPage, itemsPerPage } = this.state;
    const totalItems = this.getTotalItems();
    const calculatedEndRange = currentPage * itemsPerPage;
    return Math.min(calculatedEndRange, totalItems);
  };

  renderTableRows() {
    const { order = {} } = this.props;
    const { currentPage, itemsPerPage, selectedCategory } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (!order) {
      return null;
    }
    const currentCategories = Object.keys(order)
      .filter((key) => {
        const fullName = order[key]?.shipping_address?.fullName || "";
        const statusFilter =
          this.state.selectedStatusFilter &&
          order[key]?.shipping_address?.order_status ===
            this.state.selectedStatusFilter;
        return (
          fullName
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase()) &&
          (statusFilter || !this.state.selectedStatusFilter)
        );
      })
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((key) => {
        const allOrder = order[key];
        const { shipping_address = {} } = allOrder;

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

            <td>{shipping_address.fullName}</td>
            <td>{shipping_address.email}</td>
            <td>{shipping_address.address}</td>
            <td>
              {shipping_address.paymentMethod === "cashOnDelivery"
                ? "Tiền mặt"
                : "Banking"}
            </td>
            <td style={{ textTransform: "capitalize" }}>
              {shipping_address.order_status === "đã giao hàng" ? (
                <span className="badge rounded-pill bg-primary">
                  {shipping_address.order_status}
                </span>
              ) : (
                <span className="badge rounded-pill bg-warning text-dark">
                  {shipping_address.order_status}
                </span>
              )}
            </td>

            <td>
              <div className={Style.btn_action_group}>
                <button
                  type="button"
                  className={`${Style.item_action} btn`}
                  onClick={() => this.handleEditCategory(key, allOrder)}
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

  render() {
    const { order = {} } = this.props;
    const { editingOrderId, order_items } = this.state;
    const { shipping_address = {} } = order[editingOrderId] || [];
    const { order_status = "" } = shipping_address;
    const startRange = this.getStartRange();
    const endRange = this.getEndRange();
    const { selectAll, currentPage, itemsPerPage, selectedCategory } =
      this.state;
    const pageNumbers = [];
    for (
      let number = 1;
      number <= Math.ceil(Object.keys(order).length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }

    return (
      <div className={Style.table_container}>
        <h2>Quản lí đơn hàng</h2>
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
                      onClick={() =>
                        this.handleStatusFilterChange("đã giao hàng")
                      }
                    >
                      Đã giao hàng
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        this.handleStatusFilterChange("Đang chờ xác nhận")
                      }
                    >
                      Đang chờ xác nhận
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Table className={Style.table} hover responsive>
            <thead className="custom-thead">
              <tr className={Style.table_product}>
                <th className={Style.input_check}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectAll}
                    onChange={this.handleSelectAllChange}
                  />
                </th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Địa Chỉ</th>
                <th>Thanh Toán</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{this.renderTableRows()}</tbody>
          </Table>

          <Modal
            fullscreen
            show={this.state.showModal}
            onHide={this.handleCloseModal}
          >
            <Modal.Header closeButton>
              <Modal.Title className={Style.header_title}>Đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className=" col-12 col-lg-8">
                  <div className={Style.modal_title_body}>
                    <p className={Style.add_product_title}>Chi tiết đơn hàng</p>
                    <div className={Style.modal_select_group}>
                      <select className="form-select" data-width="fit">
                        <option value="paid" data-content="Đã thanh toán">
                          Đã thanh toán
                        </option>
                        <option value="unpaid" data-content="Chưa thanh toán">
                          Chưa thanh toán
                        </option>
                      </select>
                      {order_status === "đã giao hàng" ? (
                        <small
                          className={`${Style.shipping_status_badge} badge rounded-pill bg-primary`}
                        >
                          Đã giao hàng
                        </small>
                      ) : (
                        <small className="badge rounded-pill bg-warning text-dark">
                          Xác nhận đơn hàng
                        </small>
                      )}
                    </div>
                  </div>
                  <Table className={Style.table} hover responsive>
                    <thead className="custom-thead">
                      <tr className={Style.table_product_detail}>
                        <th>Hình ảnh</th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order_items.map((product, index) => (
                        <tr key={index} className={Style.item_row}>
                          <td>
                            <img
                              src="https://reviewvilla.vn/wp-content/uploads/2022/06/banh-trang-tron-sai-gon-1.jpg"
                              alt="https://reviewvilla.vn/wp-content/uploads/2022/06/banh-trang-tron-sai-gon-1.jpg"
                              className={Style.thumbnail_image_order}
                            />
                          </td>
                          <td>{product.item_name}</td>
                          <td>{product.item_price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.quantity * product.item_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="col-4 col-lg-4">
                  <p className={Style.add_product_title}>
                    Thông tin khách hàng
                  </p>
                  <p>
                    Họ tên: <span>{shipping_address.fullName}</span>
                  </p>
                  <p>
                    Email: <span>{shipping_address.email}</span>
                  </p>
                  <p>
                    Số điện thoại: <span>{shipping_address.phoneNumber}</span>
                  </p>
                  <p>
                    Đã đặt:{" "}
                    <span>{Object.keys(order_items).length} món ăn</span>
                  </p>

                  <div>
                    <p className={Style.add_product_title}>Địa chỉ đặt hàng:</p>
                    <p>{shipping_address.address}</p>
                  </div>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Đóng
              </Button>
              {order_status !== "đã giao hàng" && (
                <Button
                  className={order_status ? " btn-primary" : Style.btn_primary}
                  disabled={order_status === "đã giao hàng" ? true : false}
                  onClick={this.handleUpdateCategory}
                >
                  Xác nhận đơn hàng
                </Button>
              )}
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
    order: state.AllOrderReducer.order,
  };
};

const mapDispatchToProps = {
  updateOrder,
  GetAllOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
