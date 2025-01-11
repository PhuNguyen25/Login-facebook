import React from "react";
import { Route } from "react-router-dom";
import { Header, Navbar } from "../components/Layout";
import Style from "./routes.module.scss";
class HomeRouter extends React.Component {
  state = { isCollapsedMenu: false };
  toggleCollapsedMenu = () => {
    this.setState((prevState) => ({
      isCollapsedMenu: !prevState.isCollapsedMenu,
    }));
  };
  render() {
    const {isCollapsedMenu} = this.state;
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(propsRoute) => {
          return (
            <div className={Style.layout_wrapper}>
              <Header toggleCollapsedMenu={this.toggleCollapsedMenu} isCollapsedMenu={isCollapsedMenu} />
              <Navbar toggleCollapsedMenu={this.toggleCollapsedMenu} isCollapsedMenu={isCollapsedMenu} />
              <div className={`${Style._main} ${isCollapsedMenu && Style.isCollapsedContent}`}>
                <Component {...propsRoute} />
              </div>
            </div>
          );
        }}
      />
    );
  }
}
export default HomeRouter;
