import axios from "axios";
import {
  GROUP_MODIFIER_FAIL,
  GROUP_MODIFIER_RESET,
  GROUP_MODIFIER_SUCCESS,
  GROUP_MODIFIER_REQUEST,
  MODIFIER_CREATE_REQUEST,
  MODIFIER_CREATE_SUCCESS,
  MODIFIER_CREATE_FAIL,
  CREATE_ITEM_REQUEST,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_RESET,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_FAIL,
  UPDATE_ITEM_SUCCESS,
  CREATE_BLOG_RESET,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_REQUEST,
  UPLOAD_FAIL,
  UPLOAD_SUCCESS,
  UPLOAD_REQUEST,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_RESET,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_REQUEST,
  DELETE_CATEGORY_RESET,
  DELETE_MODIFIER_RESET,
  DELETE_MODIFIER_FAIL,
  DELETE_MODIFIER_SUCCESS,
  DELETE_MODIFIER_REQUEST,
  DELETE_GROUP_MODIFIER_RESET,
  DELETE_GROUP_MODIFIER_FAIL,
  DELETE_GROUP_MODIFIER_SUCCESS,
  DELETE_GROUP_MODIFIER_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_RESET,
  DELETE_BLOG_RESET,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_REQUEST,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_MODIFIER_RESET,
  UPDATE_MODIFIER_FAIL,
  UPDATE_MODIFIER_SUCCESS,
  UPDATE_MODIFIER_REQUEST,
  UPDATE_GROUP_MODIFIER_RESET,
  UPDATE_GROUP_MODIFIER_FAIL,
  UPDATE_GROUP_MODIFIER_SUCCESS,
  UPDATE_GROUP_MODIFIER_REQUEST,
  UPDATE_BLOG_RESET,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
} from "../../../store/Constants/Product";
import API_PATHS from "../API_Paths";
import { DecodeToken } from "../../../utils/decode";

const CreateModifierForClient = (modifierInfo) => async (dispatch, _) => {
  dispatch({ type: MODIFIER_CREATE_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_MODIFIER_FOR_CLIENT, {
      modifierInfo,
    });
    dispatch({ type: MODIFIER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MODIFIER_CREATE_FAIL, payload: message });
  }
};
const CreateItem = (itemInfo) => async (dispatch, _) => {
  dispatch({ type: CREATE_ITEM_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_ITEM, {
      itemInfo,
    });
    dispatch({ type: CREATE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_ITEM_FAIL, payload: message });
  }
};

const CreateCategory = (categoryInfo) => async (dispatch, _) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_CATEGORY, {
      categoryInfo,
    });
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_CATEGORY_FAIL, payload: message });
  }
};
const CreateBlog = (blogInfo) => async (dispatch, _) => {
  dispatch({ type: CREATE_BLOG_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_BLOG, {
      blogInfo,
    });
    dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_BLOG_FAIL, payload: message });
  }
};
const CreateGroupModifier = (modifyGroupInfo) => async (dispatch, _) => {
  dispatch({ type: GROUP_MODIFIER_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_GROUP_MODIFIER, {
      modifyGroupInfo,
    });
    dispatch({ type: GROUP_MODIFIER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GROUP_MODIFIER_FAIL, payload: message });
  }
};
const UploadImage = (path) => async (dispatch, _) => {
  dispatch({ type: UPLOAD_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.UPLOAD_IMAGE, {
      path,
    });
    dispatch({ type: UPLOAD_SUCCESS, payload: data.cloudinaryUrl });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPLOAD_FAIL, payload: message });
  }
};
const CreateUser = (userInfo) => async (dispatch, _) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.CREATE_USER, {
      userInfo,
    });
    dispatch({ type: CREATE_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_USER_FAIL, payload: message });
  }
};

//Update

const updateItem = (itemId, itemInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_ITEM_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.UPDATE_ITEM, {
      itemId,
      itemInfo,
    });
    dispatch({ type: UPDATE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_ITEM_FAIL, payload: message });
  }
};

const deleteCategory = (categoryIds) => async (dispatch, _) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_CATEGORY` is the endpoint for deleting categories
    const { data } = await axios.post(API_PATHS.DELETE_CATEGORY, {
      categoryIds,
    });
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_CATEGORY_FAIL, payload: message });
  }
};
const deleteItem = (itemIds) => async (dispatch, _) => {
  dispatch({ type: DELETE_ITEM_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_CATEGORY` is the endpoint for deleting categories
    const { data } = await axios.post(API_PATHS.DELETE_ITEM, {
      itemIds,
    });
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_ITEM_FAIL, payload: message });
  }
};
const deleteModifier = (modifierIds) => async (dispatch, _) => {
  dispatch({ type: DELETE_MODIFIER_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_CATEGORY` is the endpoint for deleting categories
    const { data } = await axios.post(API_PATHS.DELETE_MODIFIER, {
      modifierIds,
    });
    dispatch({ type: DELETE_MODIFIER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_MODIFIER_FAIL, payload: message });
  }
};
const deleteGroupModifier = (modifyGroupIds) => async (dispatch, _) => {
  dispatch({ type: DELETE_GROUP_MODIFIER_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_GROUPMODIFIER` is the endpoint for deleting group modifiers
    const { data } = await axios.post(API_PATHS.DELETE_GROUP_MODIFIER, {
      modifyGroupIds,
    });
    dispatch({ type: DELETE_GROUP_MODIFIER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_GROUP_MODIFIER_FAIL, payload: message });
  }
};
const deleteAccount = (userId) => async (dispatch, _) => {
  dispatch({ type: DELETE_ACCOUNT_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_ACCOUNT` is the endpoint for deleting accounts
    const { data } = await axios.post(API_PATHS.DELETE_ACCOUNT, {
      userId,
    });
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_ACCOUNT_FAIL, payload: message });
  }
};
const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(API_PATHS.LOGIN, {
      username,
      password,
    });
    const token = data.token;
    const decodedToken = DecodeToken(token);
    localStorage.setItem("userId", JSON.stringify(decodedToken.userId));
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LOGIN_FAIL, payload: message });
  }
};
const deleteBlog = (blogIds) => async (dispatch, _) => {
  dispatch({ type: DELETE_BLOG_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_BLOG` is the endpoint for deleting blogs
    const { data } = await axios.post(API_PATHS.DELETE_BLOG, {
      blogIds,
    });
    dispatch({ type: DELETE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_BLOG_FAIL, payload: message });
  }
};

const updateCategory = (categoryId, categoryInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  try {
    // Assuming `API_PATHS.DELETE_CATEGORY` is the endpoint for deleting categories
    const { data } = await axios.post(API_PATHS.UPDATE_CATEGORY, {
      categoryId,
      categoryInfo,
    });
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_CATEGORY_FAIL, payload: message });
  }
};
const updateModifier = (modifierId, modifierInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_MODIFIER_REQUEST });
  try {
    // Assuming `API_PATHS.UPDATE_MODIFIER` is the endpoint for updating modifiers
    const { data } = await axios.post(API_PATHS.UPDATE_MODIFIER, {
      modifierId,
      modifierInfo,
    });
    dispatch({ type: UPDATE_MODIFIER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_MODIFIER_FAIL, payload: message });
  }
};
const updateGroupModifier = (modifyGroupId, modifyGroupInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_GROUP_MODIFIER_REQUEST });
  try {
    // Assuming `API_PATHS.UPDATE_GROUP_MODIFIER` is the endpoint for updating group modifiers
    const { data } = await axios.post(API_PATHS.UPDATE_GROUP_MODIFIER, {
      modifyGroupId,
      modifyGroupInfo,
    });
    dispatch({ type: UPDATE_GROUP_MODIFIER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_GROUP_MODIFIER_FAIL, payload: message });
  }
};

const updateBlog = (blogId, blogInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_BLOG_REQUEST });
  try {
    // Assuming `API_PATHS.UPDATE_BLOG` is the endpoint for updating blogs
    const { data } = await axios.post(API_PATHS.UPDATE_BLOG, {
      blogId,
      blogInfo,
    });
    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_BLOG_FAIL, payload: message });
  }
};
const updateUser = (userId, userInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    // Assuming `API_PATHS.UPDATE_USER` is the endpoint for updating users
    const { data } = await axios.post(API_PATHS.UPDATE_USER, {
      userId,
      userInfo,
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_USER_FAIL, payload: message });
  }
};
const updateOrder = (orderId, orderInfo) => async (dispatch, _) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });
  try {
  
    const { data } = await axios.post(API_PATHS.UPDATE_ORDER, {
      orderId,
      orderInfo,
    });
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_ORDER_FAIL, payload: message });
  }
};

const PostRequests = {
  updateOrder,
  updateUser,
  updateBlog,
  updateGroupModifier,
  updateModifier,
  updateCategory,
  deleteBlog,
  deleteAccount,
  login,
  deleteGroupModifier,
  deleteModifier,
  deleteItem,
  deleteCategory,
  UploadImage,
  CreateBlog,
  CreateUser,
  updateItem,
  CreateGroupModifier,
  CreateItem,
  CreateModifierForClient,
  CreateCategory,
};
export default PostRequests;
