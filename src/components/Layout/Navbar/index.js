import React, { Component } from "react";
import Style from "./style.module.scss";
import { NavLink, Link, withRouter } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { NAV_LINK_MENU } from "../constants";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: window.innerWidth <= 767,
      isTablet: window.innerWidth > 767 && window.innerWidth <= 991,
      isDesktop: window.innerWidth > 991,
      activeLink: "/",
      isCollapsedMenu: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ activeLink: location.pathname });
  }

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
    return (
      <div
        className={`${Style.vertical_menu} ${
          isCollapsedMenu && Style.collapsed_menu
        }`}
      >
        {/* LOGO */}
        <div className={Style.navbar_brand_box}>
          <Link to="index.html" className={Style.logo_dark}>
            <span className="logo-lg">
              <img src="/images/ov-technology-sdk01.png" alt="logo main" height={26} />
              <span className={Style.logo_text}></span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => this.props.toggleCollapsedMenu()}
            className={`${Style.vertical_collapsed} bg-transparent px-3`}
          >
            <IoMenuSharp className={Style.faBars} />
          </button>
        </div>
        <div className={Style.sidebar_menu_scroll}>
          <div className={`${Style.sidebar_menu} list-unstyled`}>
            {this.renderNavLink()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
