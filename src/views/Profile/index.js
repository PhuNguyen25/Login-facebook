import React, { Component } from "react";
import Style from "./style.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
class Profile extends Component {
  state = { showPassword: false, showConfirmPassword: false, isEdited: false };
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };
  handleClickEditProfile = () => {
    this.setState((prevState) => ({
      isEdited: !prevState.isEdited,
    }));
  };
  render() {
    const { showPassword, showConfirmPassword, isEdited } = this.state;
    return (
      <React.Fragment>
        <h2>Thông tin tài khoản</h2>
        <div className={`${Style.ProfileInnner} row`}>
          <div className="col-xl-4 col-lg-5 col-md-5 ">
            <div className="card mb-4">
              <div className="card-body">
                <div className="user-avatar-section">
                  <div className=" d-flex align-items-center flex-column">
                    <img
                      className="img-fluid rounded mb-3 mt-4"
                      src="https://demos.themeselection.com/materio-bootstrap-html-admin-template/assets/img/avatars/10.png"
                      height={120}
                      width={120}
                      alt="User avatar"
                    />
                    <div className="user-info text-center">
                      <h4>Violet Mendoza</h4>
                      <span className="badge bg-label-danger rounded-pill">
                        Author
                      </span>
                    </div>
                  </div>
                </div>
                <h5 className="pb-3 border-bottom mb-3">Chi tiết</h5>
                <div className="info-container">
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3">
                      <span className="h6">Username:</span>
                      {isEdited ? (
                        <span className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </span>
                      ) : (
                        <span>@violet.dev</span>
                      )}
                    </li>
                    <li className="mb-3">
                      <span className="h6">Email:</span>
                      {isEdited ? (
                        <span className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </span>
                      ) : (
                        <span>vafgot@vultukir.org</span>
                      )}
                    </li>
                    <li className="mb-3">
                      <span className="h6">Role:</span>
                      {isEdited ? (
                        <span className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </span>
                      ) : (
                        <span>Author</span>
                      )}
                    </li>
                    <li className="mb-3">
                      <span className="h6">Tax id:</span>
                      {isEdited ? (
                        <span className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </span>
                      ) : (
                        <span>Tax-8965</span>
                      )}
                    </li>
                    <li className="mb-3">
                      <span className="h6">Contact:</span>
                      {isEdited ? (
                        <span className="input-group input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                          />
                        </span>
                      ) : (
                        <span>(123) 456-7890</span>
                      )}
                    </li>
                  </ul>
                  <div className={Style.editedProfile}>
                    <button
                      onClick={this.handleClickEditProfile}
                      className={`btn ${
                        isEdited ? "btn-warning" : "btn-primary"
                      }`}
                    >
                      {isEdited ? "Cập nhật" : "Sửa"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-7">
            <div className="card mb-4">
              <h5 className="card-header">Thay đổi mật khẩu</h5>
              <div className="card-body">
                <div className={Style.formUpdate}>
                  <div className="alert alert-warning" role="alert">
                    <h6 className="alert-heading mb-1">
                      Hãy đảm bảo yêu cầu được đáp ứng.
                    </h6>
                    <span>Điền it nhất 8 ký tự, in hoa &amp; ký tự</span>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            placeholder="············"
                          />
                          <label htmlFor="newPassword">Mật khẩu mới</label>
                        </div>
                        <button
                          type="button"
                          className={`${Style.eye_flash} btn btn-link position-absolute h-100 end-0 top-0`}
                          id="password-addon"
                          onClick={this.togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="mb-3 col-12 col-sm-6 form-password-toggle fv-plugins-icon-container">
                      <div className="input-group input-group-merge">
                        <div className="form-floating form-floating-outline">
                          <input
                            className="form-control"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="············"
                          />
                          <label htmlFor="confirmPassword">
                            Nhập lại mật khẩu mới
                          </label>
                        </div>
                        <button
                          type="button"
                          className={`${Style.eye_flash} btn btn-link position-absolute h-100 end-0 top-0`}
                          id="password-addon"
                          onClick={this.toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary me-2 ">
                        Thay đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
