import API_PATHS from "../API_Paths";
import axios from "axios";
import {
  GET_ALL_CATEGORY,
  GET_ALL_GROUP_MODIFIERS,
  GET_ALL_ITEM,
  GET_ALL_MODIFIERS,
  GET_ALL_BLOG,
  GET_ALL_ACCOUNT,
  GET_ALL_ORDER
} from "../../../store/Constants/Product";
const GetAllModifiers = () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_MODIFIERS)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_MODIFIERS,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });

const GetAllItems = () => async (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_ITEM)
      .then(({ data }) => {
        resolve(
          dispatch({
            type: GET_ALL_ITEM,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        );
      })
      .catch(reject);
  });

const GetAllGroupModifiers = () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_GROUP_MODIFIERS)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_GROUP_MODIFIERS,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });

const GetAllCategories = () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_CATEGORY)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_CATEGORY,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });

  const GetAllBlogs = () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_BLOG)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_BLOG,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });

  const GetAllUser = () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_ACCOUNT)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_ACCOUNT,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });
  const GetAllOrder= () => (dispatch) =>
  new Promise((resolve, reject) => {
    axios
      .get(API_PATHS.GET_ALL_ORDER)
      .then(({ data }) =>
        resolve(
          dispatch({
            type: GET_ALL_ORDER,
            payload: typeof data === "string" ? JSON.parse(data) : data,
          })
        )
      )
      .catch(reject);
  });

const GetRequests = {
  GetAllOrder,
  GetAllUser,
  GetAllBlogs,
  GetAllModifiers,
  GetAllItems,
  GetAllGroupModifiers,
  GetAllCategories,
};
export default GetRequests;
