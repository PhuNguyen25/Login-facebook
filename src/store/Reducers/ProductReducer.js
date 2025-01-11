import {
  GET_ALL_CATEGORY,
  GET_ALL_GROUP_MODIFIERS,
  GET_ALL_ITEM,
  GET_ALL_MODIFIERS,
  GET_ALL_ITEM_FAIL,
  GET_ALL_ITEM_REQUEST,
  GET_ALL_ORDER,
  MODIFIER_CREATE_REQUEST,
  MODIFIER_CREATE_SUCCESS,
  MODIFIER_CREATE_FAIL,
  MODIFIER_CREATE_RESET,
  CREATE_ITEM_REQUEST,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAIL,
  CREATE_ITEM_RESET,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_FAIL,
  GROUP_MODIFIER_FAIL,
  GROUP_MODIFIER_RESET,
  GROUP_MODIFIER_SUCCESS,
  GROUP_MODIFIER_REQUEST,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_RESET,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_FAIL,
  UPDATE_ITEM_SUCCESS,
  GET_ALL_BLOG,
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
  DELETE_CATEGORY_RESET,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_RESET,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_REQUEST,
  DELETE_MODIFIER_RESET,
  DELETE_MODIFIER_FAIL,
  DELETE_MODIFIER_SUCCESS,
  DELETE_MODIFIER_REQUEST,
  DELETE_GROUP_MODIFIER_RESET,
  DELETE_GROUP_MODIFIER_FAIL,
  DELETE_GROUP_MODIFIER_SUCCESS,
  DELETE_GROUP_MODIFIER_REQUEST,
  GET_ALL_ACCOUNT,
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
  UPDATE_CATEGORY_RESET,
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
} from "../Constants/Product";
const stateDefault = {
  allItems: {},
  loading: false,
  allCategories: {},
  order:{}
};
const AllItemReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_ITEM_REQUEST:
      return { loading: true };
    case GET_ALL_ITEM_FAIL:
      return { loading: false };
    case GET_ALL_ITEM:
      return { ...state, allItems: action.payload, loading: false };
    default:
      return state;
  }
};
const AllUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNT:
      return { ...state, allUser: action.payload };
    default:
      return state;
  }
};
const AllCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return { ...state, allCategories: action.payload };
    default:
      return state;
  }
};
const AllOrderReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
const AllBlogReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_BLOG:
      return { ...state, allBlogs: action.payload };
    default:
      return state;
  }
};
const AllModifierReducer = (state = { allModifiers: {} }, action) => {
  switch (action.type) {
    case GET_ALL_MODIFIERS:
      return { ...state, allModifiers: action.payload };
    default:
      return state;
  }
};

const AllGroupModifierReducer = (state = { allGroupModifiers: {} }, action) => {
  switch (action.type) {
    case GET_ALL_GROUP_MODIFIERS:
      return { ...state, allGroupModifiers: action.payload };
    default:
      return state;
  }
};
// CREATE
const AllModifierCreateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case MODIFIER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case MODIFIER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        orderInfo: action.payload,
      };
    case MODIFIER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MODIFIER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
const CreateItemReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_ITEM_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        itemInfo: null,
      };
    case CREATE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        itemInfo: action.payload,
      };
    case CREATE_ITEM_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        itemInfo: null,
      };
    case CREATE_ITEM_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const CreateGroupModifierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GROUP_MODIFIER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        modifyGroupInfo: null,
      };
    case GROUP_MODIFIER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        modifyGroupInfo: action.payload,
      };
    case GROUP_MODIFIER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        modifyGroupInfo: null,
      };
    case GROUP_MODIFIER_RESET:
      return stateDefault;
    default:
      return state;
  }
};

const CreateCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        categoryInfo: null,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        categoryInfo: action.payload,
      };
    case CREATE_CATEGORY_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        categoryInfo: null,
      };
    case CREATE_CATEGORY_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const UploadImageReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        path: null,
      };
    case UPLOAD_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        path: action.payload,
      };
    case UPLOAD_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        path: null,
      };

    default:
      return state;
  }
};
const CreateBlogReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        blogInfo: null,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        blogInfo: action.payload,
      };
    case CREATE_BLOG_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        blogInfo: null,
      };
    case CREATE_BLOG_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const CreateUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        userInfo: null,
      };
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        userInfo: action.payload,
      };
    case CREATE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        userInfo: null,
      };
    case CREATE_USER_RESET:
      return stateDefault;
    default:
      return state;
  }
};

const UpdateItemReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_ITEM_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        itemInfo: null,
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        itemInfo: action.payload,
      };
    case UPDATE_ITEM_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        itemInfo: null,
      };

    default:
      return state;
  }
};
const deleteCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        categoryInfo: null,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        categoryInfo: action.payload,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        categoryInfo: null,
      };
    case DELETE_CATEGORY_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const deleteItemReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_ITEM_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        userId: null,
      };
    case DELETE_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        userId: action.payload,
      };
    case DELETE_ITEM_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        userId: null,
      };
    case DELETE_ITEM_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const deleteModifierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_MODIFIER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        modifierIds: null,
      };
    case DELETE_MODIFIER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        modifierIds: action.payload,
      };
    case DELETE_MODIFIER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        modifierIds: null,
      };
    case DELETE_MODIFIER_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const deleteGroupModifierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_GROUP_MODIFIER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        modifyGroupIds: null,
      };
    case DELETE_GROUP_MODIFIER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        modifyGroupIds: action.payload,
      };
    case DELETE_GROUP_MODIFIER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        modifyGroupIds: null,
      };
    case DELETE_GROUP_MODIFIER_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const deleteAccountReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_ACCOUNT_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        accountInfo: null,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        accountInfo: action.payload,
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        accountInfo: null,
      };
    case DELETE_ACCOUNT_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const deleteBlogReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DELETE_BLOG_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        blogIds: null,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        blogIds: action.payload,
      };
    case DELETE_BLOG_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        blogIds: null,
      };
    case DELETE_BLOG_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const loginReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        username: null,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        token: action.payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        username: null,
      };

    default:
      return state;
  }
};
const updateModifierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_MODIFIER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        modifierInfo: null,
      };
    case UPDATE_MODIFIER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        modifierInfo: action.payload,
      };
    case UPDATE_MODIFIER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        modifierInfo: null,
      };
    case UPDATE_MODIFIER_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const updateCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        categoryInfo: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        categoryInfo: action.payload,
      };
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        categoryInfo: null,
      };
    case UPDATE_CATEGORY_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const updateGroupModifierReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_GROUP_MODIFIER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        groupModifierInfo: null,
      };
    case UPDATE_GROUP_MODIFIER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        groupModifierInfo: action.payload,
      };
    case UPDATE_GROUP_MODIFIER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        groupModifierInfo: null,
      };
    case UPDATE_GROUP_MODIFIER_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const updateBlogReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_BLOG_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        blogInfo: null,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        blogInfo: action.payload,
      };
    case UPDATE_BLOG_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        blogInfo: null,
      };
    case UPDATE_BLOG_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const updateUserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        userInfo: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        userInfo: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        userInfo: null,
      };
    case UPDATE_USER_RESET:
      return stateDefault;
    default:
      return state;
  }
};
const updateOrderReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        loading: true,
        success: false,
        error: null,
        orderInfo: null,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        orderInfo: action.payload,
      };
    case UPDATE_ORDER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
        orderInfo: null,
      };
    case UPDATE_ORDER_RESET:
      return stateDefault;
    default:
      return state;
  }
};

export {
  updateOrderReducer,
  updateUserReducer,
  updateBlogReducer,
  updateGroupModifierReducer,
  updateModifierReducer,
  updateCategoryReducer,
  deleteBlogReducer,
  deleteAccountReducer,
  loginReducer,
  AllUserReducer,
  deleteGroupModifierReducer,
  deleteModifierReducer,
  deleteItemReducer,
  deleteCategoryReducer,
  UploadImageReducer,
  UpdateItemReducer,
  CreateUserReducer,
  CreateGroupModifierReducer,
  CreateCategoryReducer,
  CreateItemReducer,
  AllItemReducer,
  AllCategoryReducer,
  AllModifierReducer,
  AllGroupModifierReducer,
  AllModifierCreateReducer,
  AllBlogReducer,
  AllOrderReducer,
  CreateBlogReducer,
};
