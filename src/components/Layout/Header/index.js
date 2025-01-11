import React, { Component } from "react";
import Style from "./style.module.scss";
import { NavLink, withRouter, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiBell } from "react-icons/fi";
import { FaChevronDown, FaArrowUp } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { CiClock1 } from "react-icons/ci";
import {
  IoMenuSharp,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { NAV_LINK_MENU } from "../constants";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMessage } from "react-icons/md";
import Cookies from "js-cookie";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 767,
      isTablet: window.innerWidth > 767 && window.innerWidth <= 991,
      isDesktop: window.innerWidth > 991,
      fbToken: Cookies.get("fb_token"),
      activeLink: "/",
    };
  }

  componentDidMount() {
    const { location } = this.props;
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ activeLink: location.pathname });
    if (this.state.fbToken) {
      this.fetchFacebookData();
    }
  }
  fetchFacebookData = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=name,picture&access_token=${this.state.fbToken}`
      );
      const data = await response.json();
      this.setState({ fbName: data.name, fbAvatar: data.picture.data.url });
    } catch (error) {
      console.error("Error fetching Facebook data:", error);
    }
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({
      isMobile: window.innerWidth <= 767,
      isTablet: window.innerWidth > 767 && window.innerWidth <= 991,
      isDesktop: window.innerWidth > 991,
    });
  };
  handleNavLinkClick = (route) => {
    this.setState({ activeLink: route });
  };
  handleLogout = () => {
    localStorage.removeItem("userId");
    this.props.history.push("/");
    Cookies.remove("fb_token");
    window.location.reload();
  };
  renderNavLink = () => {
    return NAV_LINK_MENU.map(({ name, route, icon }) => (
      <li>
        <NavLink
          to={route}
          activeClassName={
            route === this.state.activeLink ? Style.active_link : ""
          }
          onClick={() => this.handleNavLinkClick(route)}
        >
          {icon}
          <span className={`${Style.menu_item} menu-item`}>{name}</span>
        </NavLink>
      </li>
    ));
  };

  render() {
    const { isCollapsedMenu } = this.props;
    const { fbName,fbAvatar } = this.state;
    return (
      <>
        <header
          className={`${Style.page_topbar} ${
            this.props.isCollapsedMenu && Style.activeCollapsedMenu
          }`}
        >
          <div className={Style.navbar_header}>
            <div className="d-flex align-items-center">
              {/* LOGO */}
              <div className={Style.navbar_brand_box}>
                <a href="index.html" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src="/images/logo-sm.svg" alt="logo 1" height={26} />
                  </span>
                  <span className="logo-lg">
                    <img src="/images/logo-sm.svg" alt="logo 2" height={26} />{" "}
                    <span className="logo-txt">Anvat</span>
                  </span>
                </a>
                <a href="index.html" className="logo logo-light">
                  <span className="logo-sm">
                    <img src="/images/logo-sm.svg" alt="logo 3" height={26} />
                  </span>
                  <span className="logo-lg">
                    <img src="/images/logo-sm.svg" alt="logo 4" height={26} />
                    <span className="logo-txt">Anvat</span>
                  </span>
                </a>
              </div>
              <button
                type="button"
                onClick={() => this.props.toggleCollapsedMenu()}
                className={`${Style.vertical_collapsed} ${
                  isCollapsedMenu && "d-lg-block"
                } bg-transparent px-3`}
              >
                <IoMenuSharp className={Style.faBars} />
              </button>
              <button
                type="button"
                className={`${Style.vertical_collapsed_tablet} d-lg-none d-md-block bg-transparent px-3`}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBackdrop"
                aria-controls="offcanvasWithBackdrop"
              >
                <IoMenuSharp className={Style.faBars} />
              </button>
              <div
                className={`${Style.offcanvas} offcanvas offcanvas-start`}
                tabIndex={-1}
                id="offcanvasWithBackdrop"
                aria-labelledby="offcanvasWithBackdropLabel"
              >
                <div className={`offcanvas-header`}>
                  <button
                    type="button"
                    className="btn-close text-reset bg-transparent flex-end"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className={`${Style.sidebar_menu} offcanvas-body`}>
                  {this.renderNavLink()}
                </div>
              </div>
              {/* <div className={`${Style.app_search} d-none d-lg-block mx-3`}>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                  />
                  <CiSearch />
                </div>
              </div> */}
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown d-inline-block d-block d-lg-none">
                <button
                  type="button"
                  className="btn header-item noti-icon"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search icon-sm" />
                </button>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
                  <form className="p-2">
                    <div className="search-box">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control rounded border-0"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search search-icon" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className={`${Style.noti_icon} btn`}
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FiBell />
                  <span className={Style.noti_dot}>7</span>
                </button>
                <div
                  className={`${Style.dropdown_noti} dropdown-menu dropdown-menu-lg p-0`}
                >
                  <div className="p-3">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="m-0 font-size-15"> Notifications </h5>
                      </div>
                      <div className="col-auto mx-4">
                        <a href="/" className="small">
                          Mark all as read
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${Style.dropdown_item_notice} dropdown-item`}
                  >
                    <h6 className="dropdown-header bg-light">New</h6>
                    <a href className={`${Style.notification_item} text-reset`}>
                      <div className="d-flex border-bottom align-items-start">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm me-3">
                            <span
                              className={`${Style.avatar_title} bg-primary rounded-circle`}
                            >
                              <FcMoneyTransfer />
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">New order has been placed</h6>
                          <div className="text-muted w-100">
                            <p className={`${Style.noti_desc} mb-1`}>
                              Open the order confirmation or shipment
                              confirmation.
                            </p>
                            <p
                              className={`${Style.timeline} mb-0 text-uppercase fw-bold`}
                            >
                              <CiClock1 /> 5 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="p-2 border-top d-grid">
                    <a
                      className="btn btn-sm btn-link font-size-14 btn-block text-center"
                      href="/"
                    >
                      <i className="uil-arrow-circle-right me-1" />
                      <span>View More..</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item user text-start d-flex align-items-center"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    alt="logo 7"
                    className={Style.header_profile_user}
                    src={fbAvatar}
                  />
                  <span className="ms-2 d-none d-xl-inline-block user-item-desc">
                    <span className={Style.user_name}>
                     {fbName} <FaChevronDown />
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end pt-0">
                  <Link
                    className={`${Style.dropdown_item} dropdown-item`}
                    to="/profile"
                  >
                    <CgProfile className="align-middle" />
                    <span className="align-middle">Profile</span>
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className={`${Style.dropdown_item} dropdown-item`}
                    onClick={this.handleLogout}
                  >
                    <IoLogOutOutline className="align-middle" />
                    <span className="align-middle">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default withRouter(Header);
