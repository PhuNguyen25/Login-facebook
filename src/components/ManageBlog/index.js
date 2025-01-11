import React from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Style from "./style.module.scss";
import { FaFilter, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";


const { CreateBlog, deleteBlog } = Admin.PostRequests;
const { GetAllBlogs } = Admin.GetRequests;

class Blog extends React.Component {
  state = {
    title_blog: "",
    body_blog: "",
    author: "",
    selectedBlog: [],
    selectAll: false,
    isEditMode: false,
  };

  componentDidMount() {
    this.props.GetAllBlogs();
  }

  handleClickItem = () => {
    const blogInfo = { ...this.state };
    this.props.CreateBlog(blogInfo);
    this.props.GetAllBlogs();

    this.setState({
      title_blog: "",
      body_blog: "",
      author: "",
    });
  };

  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const selectedBlog = prevState.selectedBlog.includes(itemId)
        ? prevState.selectedBlog.filter((id) => id !== itemId)
        : [...prevState.selectedBlog, itemId];

      return { selectedBlog };
    });
  };

  handleSelectAllChange = () => {
    this.setState((prevState) => {
      const { allBlogs } = this.props;
      const allItemIds = Object.keys(allBlogs);

      const selectedBlog = prevState.selectAll ? [] : allItemIds;

      return { selectedBlog, selectAll: !prevState.selectAll };
    });
  };

  handleDeleteBlog = () => {
    const { selectedBlog } = this.state;
    this.props.deleteBlog(selectedBlog);

    this.props.GetAllBlogs();
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  renderTableRows() {
    const { allBlogs = {} } = this.props;
    const { selectedBlog } = this.state;

    return Object.keys(allBlogs).map((key) => {
      const blog = allBlogs[key];

      return (
        <tr key={blog.title_blog}>
          <td>
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedBlog.includes(key)}
              onChange={() => this.handleCheckboxChange(key)}
            />
          </td>
          <td>{blog.title_blog}</td>
          <td>{blog.author}</td>
          <td>Bánh tráng trộn</td>
          <td>
            Lần chỉnh sửa cuối, <span>20/12/2014</span>
          </td>
          <td>
            <div className={Style.btn_action_group}>
              <button type="button" className={`${Style.item_action} btn`}>
                <CiEdit />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { selectAll } = this.state;

    return (
      <div className={Style.table_container}>
        <h2>Quản lí bài viết</h2>
        <div className={Style.header_table}>
          <div className={Style.header_table_container}>
            <div className={`${Style.app_search} d-none d-lg-block mx-3`}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                />
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
                  <span>Thêm bài viết</span>
                </div>
              </button>
              <button
                className={Style.header_delete_button}
                onClick={this.handleDeleteBlog}
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
                <th>Tiêu Đề</th>
                <th>Tác giả</th>
                <th>Mục bài viết</th>
                <th>Ngày đăng bài</th>
                <th>Hành động</th>
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
                {this.state.isEditMode ? "Sửa bài viết" : "Thêm bài viết"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="row">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="floatingInputValue"
                      defaultValue={""}
                      name="demo"
                      placeholder="demo"
                    />
                    <label htmlFor="floatingInputValue">Tiêu đề</label>
                  </div>
                  <div className="form-floating mt-3">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Default select example"
                    >
                      <option value={""}>-- Chọn danh mục bài viết</option>
                      <option value={2}>Bánh tráng trộn</option>
                      <option value={3}>Nước uống</option>
                    </select>
                    <label htmlFor="floatingSelect">Danh mục bài viết</label>
                  </div>
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
                // onClick={
                //   this.state.isEditMode
                //     ? this.handleUpdateItem
                //     : this.handleClickItem
                // }
              >
                {this.state.isEditMode ? "Cập nhật bài viết" : "Đăng bài"}
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
    allBlogs: state.AllBlogReducer.allBlogs,
  };
};

const mapDispatchToProps = {
  CreateBlog,
  GetAllBlogs,
  deleteBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
