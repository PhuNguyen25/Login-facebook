import React, { Component } from "react";
import Style from "./style.module.scss";
class NotFound extends Component {
  render() {
    return <div className={Style.NotFoundContainer}>
      <h2>404</h2>
      <p className={Style.sub_description}>Lỗi không tìm thấy trang</p>
      <p>Hãy liên hệ bộ phận DEV để sửa lỗi này !</p>
    </div>;
  }
}

export default NotFound;