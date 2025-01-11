// const isLocal = () => {
//   const { NODE_ENV } = process.env;
//   return NODE_ENV === "development";
// };

const DEV_BASE_URL = "http://localhost:8080";
// const PROD_BASE_URL = "";
// const BASE_URL = isLocal() ? DEV_BASE_URL : PROD_BASE_URL;

// GET METHODS
const GET_ALL_MODIFIERS = `${DEV_BASE_URL}/getAllModifier`;
const GET_ALL_ITEM = `${DEV_BASE_URL}/getAllItem`;
const GET_ALL_GROUP_MODIFIERS = `${DEV_BASE_URL}/getAllModifyGroup`;
const GET_ALL_CATEGORY = `${DEV_BASE_URL}/getAllCategory`;
const GET_ALL_BLOG = `${DEV_BASE_URL}/getAllBlog`;
const GET_ALL_ACCOUNT = `${DEV_BASE_URL}/getAllAccount`;
const GET_ALL_ORDER = `${DEV_BASE_URL}/getAllOrder`;

// POST METHODS
const CREATE_ORDER_PAYMENT_VNPAY = `${DEV_BASE_URL}/create_payment_url`;
const CREATE_ORDER_FOR_CLIENT = `${DEV_BASE_URL}/CreateOrder`;
const CREATE_MODIFIER_FOR_CLIENT = `${DEV_BASE_URL}/CreateNewModifiers`;
const CREATE_ITEM = `${DEV_BASE_URL}/CreateNewItem`;
const CREATE_CATEGORY = `${DEV_BASE_URL}/CreateNewCategory`;
const CREATE_GROUP_MODIFIER = `${DEV_BASE_URL}/CreateNewModifyGroup`;
const CREATE_USER = `${DEV_BASE_URL}/CreateAccount`;
const CREATE_BLOG = `${DEV_BASE_URL}/CreateNewBlog`;

const DELETE_CATEGORY = `${DEV_BASE_URL}/DeleteCategory`;
const DELETE_ITEM = `${DEV_BASE_URL}/DeleteItem`;
const DELETE_MODIFIER = `${DEV_BASE_URL}/DeleteModifier`;
const DELETE_GROUP_MODIFIER = `${DEV_BASE_URL}/DeleteModifyGroup`;
const DELETE_BLOG = `${DEV_BASE_URL}/DeleteBlog`;
const DELETE_ACCOUNT = `${DEV_BASE_URL}/DeleteAccount`;
const LOGIN = `${DEV_BASE_URL}/Login`;

const UPLOAD_IMAGE = `${DEV_BASE_URL}/UploadImage`;
const UPDATE_ITEM = `${DEV_BASE_URL}/UpdateItem`;
const UPDATE_CATEGORY = `${DEV_BASE_URL}/UpdateCategory`;
const UPDATE_MODIFIER = `${DEV_BASE_URL}/UpdateModifier`;
const UPDATE_GROUP_MODIFIER = `${DEV_BASE_URL}/UpdateModifyGroup`;
const UPDATE_BLOG = `${DEV_BASE_URL}/UpdateBlog`;
const UPDATE_USER = `${DEV_BASE_URL}/UpdateAccount`;
const UPDATE_ORDER = `${DEV_BASE_URL}/UpdateOrder`;

const API_PATHS = {
  UPDATE_ORDER,
  GET_ALL_ORDER,
  UPDATE_USER,
  UPDATE_BLOG,
  UPDATE_GROUP_MODIFIER,
  UPDATE_MODIFIER,
  UPDATE_CATEGORY,
  DELETE_BLOG,
  LOGIN,
  GET_ALL_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_GROUP_MODIFIER,
  DELETE_MODIFIER,
  DELETE_ITEM,
  DELETE_CATEGORY,
  UPLOAD_IMAGE,
  // GET
  GET_ALL_MODIFIERS,
  GET_ALL_ITEM,
  GET_ALL_GROUP_MODIFIERS,
  GET_ALL_CATEGORY,
  GET_ALL_BLOG,
  // POST
  CREATE_MODIFIER_FOR_CLIENT,
  CREATE_ORDER_PAYMENT_VNPAY,
  CREATE_ORDER_FOR_CLIENT,
  CREATE_ITEM,
  CREATE_CATEGORY,
  CREATE_GROUP_MODIFIER,
  CREATE_USER,
  CREATE_BLOG,
  // Update
  UPDATE_ITEM,
};
export default API_PATHS;
