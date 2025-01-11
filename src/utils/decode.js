import jwt from "jsonwebtoken";
export const DecodeToken = (token) => {
  try {
    const decoded = jwt.decode(token, "Test");
    return decoded;
  } catch (error) {
    console.error("Lỗi giải mã token:", error.message);
    throw new Error("Token không hợp lệ");
  }
};
