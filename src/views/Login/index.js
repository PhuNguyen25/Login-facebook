import React, { Component } from "react";
import Style from "./style.module.scss";
import background from "../../assets/bg-5.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Admin } from "../../lib/services";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const { login } = Admin.PostRequests;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      showPassword: false,
    };
  }
  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.props.history.push('/');
    }
  }
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleClickUser = async () => {
    const { username, password } = this.state;
    await this.props.login(username, password);
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.props.history.push('/');
    }
    this.setState({
      password: "",
      username: "",
    });
  };

  render() {
    const { password="", showPassword, username="" } = this.state;
    return (
      <div
        className={`${Style.LoginContainer}`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={`${Style.LoginInner} container`}>
          <div className="row">
            <div className="col-12 col-lg-12 col-md-12">
              <div className="auth-bg py-md-5 p-4 d-flex">
                <div className="bg-overlay-gradient" />
                <div className="row justify-content-center g-0 align-items-center w-100">
                  <div className="col-xl-4 col-md-8">
                    <div className={`${Style.card} card`}>
                      <div className="card-body">
                        <div className="px-3 py-3">
                          <div className="text-center">
                            <h5 className="mb-0">Welcome Back !</h5>
                            <p className="text-muted mt-2">
                              Sign in to continue to Anvat.
                            </p>
                          </div>
                          <div className="mt-4 pt-2">
                            <div className="form-floating form-floating-custom mb-3">
                              <input
                                value={username}
                                onChange={(e) =>
                                  this.setState({ username: e.target.value })
                                }
                                type="text"
                                className="form-control"
                                id="input-username"
                                placeholder="Enter User Name"
                              />
                              <label htmlFor="input-username">
                                Tên đăng nhập
                              </label>
                              <div className="form-floating-icon">
                                <i className="uil uil-users-alt" />
                              </div>
                            </div>
                            <div className="form-floating form-floating-custom mb-3 auth-pass-inputgroup">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                  this.setState({ password: e.target.value })
                                }
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <button
                                type="button"
                                className={`${Style.eye_flash} btn btn-link position-absolute h-100 end-0 top-0`}
                                id="password-addon"
                                onClick={this.togglePasswordVisibility}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                              <label htmlFor="password-input">Mật khẩu</label>
                            </div>
                            <div className="mt-3">
                              <button
                                className={`${Style.btn_login} btn btn-primary w-100`}
                                type="submit"
                                onClick={this.handleClickUser}
                              >
                                Đăng nhập
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginReducer: state.loginReducer.loginReducer,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
