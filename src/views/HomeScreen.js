import React from "react";
import { connect } from "react-redux";
import { Admin } from "../lib/services";
const { GetAllItems } = Admin.GetRequests;
const {
  CreateModifierForClient,
  CreateItem,
  CreateCategory,
  CreateGroupModifier,
  CreateUser,
} = Admin.PostRequests;
class HomeScreen extends React.Component {

  componentDidMount() {
    this.props.GetAllItems();
  }

  handleClickModifier = () => {
    const modifierInfo = {
      modifier_name: "P",
      modifier_price: 5,
      modifier_description: "",
    };
    this.props.CreateModifierForClient(modifierInfo);
  };

  handleClickCategory = () => {
    const categoryInfo = {
      name: "Trà sữa",
      index_in_list: 15,
      group_images:
        "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
      modifier_groups_key: "-LmGapSgFweA5Uw8yENU",
    };

    this.props.CreateCategory(categoryInfo);
  };
  handleClickItem = () => {
    const itemInfo = {
      item_name: "Drink",
      item_description: "",
      item_images:
        "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
      item_price: 120,
      itemSaleRate: 10,
      itemIsOnSale: true,
    };
    this.props.CreateItem(itemInfo);
  };
  
  handleClickModifierGroup = () => {
    const modifyGroupInfo = {
      modifier_group_name: "Modifier",
      modify_group_choice: 5,
      modify_group_allow_mutiple: true,
      modify_group_is_required: true,
    };
    this.props.CreateGroupModifier(modifyGroupInfo);
  };
  handleClickUser = () => {
    const userInfo = {
      user_name: "phu",
      password: "1234",
      name: "phu",
      phone: 123231,
      email: "phu159123@gmail.com",
    };
    this.props.CreateUser(userInfo);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClickModifier}>Create Modifier</button>
        <button onClick={this.handleClickItem}>Create Item</button>
        <button onClick={this.handleClickCategory}>Create Category</button>
        <button onClick={this.handleClickModifierGroup}>
          Create Modifier Group
        </button>
        <button onClick={this.handleClickUser}>Create User</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allItems: state.AllItemReducer.allItems,
  };
};

const mapDispatchToProps = {
  GetAllItems,
  CreateModifierForClient,
  CreateItem,
  CreateGroupModifier,
  CreateCategory,
  CreateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
