import logo from "./logo.png";
import add_icon from "./add_icon.png";
import order_icon from "./order_icon.png";
import profile_image from "./profile_image.png";
import upload_area from "./upload_area.png";
import parcel_icon from "./parcel_icon.png";

export const url = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://food-delivery-backend-jade.vercel.app";
export const currency = "₹";

export const assets = {
  logo,
  add_icon,
  order_icon,
  profile_image,
  upload_area,
  parcel_icon,
};