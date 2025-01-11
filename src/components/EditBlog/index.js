import React, { useState } from "react";
import { connect } from "react-redux";
import { Admin } from "../../lib/services";
import { Table, Form, Button, Col, Row, Modal } from "react-bootstrap";
import Style from "./style.module.scss";
import { Editor } from "@tinymce/tinymce-react";
import { withRouter } from 'react-router-dom';

const { CreateBlog } = Admin.PostRequests;

class EditBlog extends React.Component {
  state = {
    title_blog: "",
    body_blog: "",
    author: "Phu",
  };



  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleClickBlog = () => {
    const blogInfo = { ...this.state };
    this.props.CreateBlog(blogInfo);
    this.handleCloseModal();
    this.setState({
      title_blog: "",
      body_blog: "",
      author: "Phu",
    });
    this.props.history.push('/Blog');
  };

  handleBodyBlog = (value) => {
    this.setState({ body_blog: value });
  };
  handleTitleBlog = (value) => {
    this.setState({ title_blog: value });
  };

  render() {
    const { content } = this.state;

    return (
      <div className={Style.table_container}>
        <div>
          <div className={Style.header_table_container}>
            <div className={Style.header_table}>Tiêu Đề</div>
          </div>

          <Editor
            apiKey="3xxy2lpekjx3x7qsxlslaa9qa4cdapjbt6jjdxpwled9wph1"
            initialValue=""
            placeholder="áchkaskflckadshij"
            inline
            init={{
              height: 150,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline | fontfamily fontsize" +
                "bold italic|forecolor backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat ",
            }}
            onEditorChange={this.handleTitleBlog}
          />
        </div>
        <div>
          <div className={Style.header_table_container}>
            <div className={Style.header_table}>Nội Dung</div>
          </div>

          <Editor
            apiKey="3xxy2lpekjx3x7qsxlslaa9qa4cdapjbt6jjdxpwled9wph1"
            initialValue=""
            inline
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            onEditorChange={this.handleBodyBlog}
          />
        </div>
        <button className={Style.header_button} onClick={this.handleClickBlog}>
          <div style={{ fontSize: 13, color: "white" }}>Xác nhận </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  CreateBlog,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
