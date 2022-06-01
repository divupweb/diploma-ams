import { AnyAction } from "@reduxjs/toolkit";
import UserType from "./userType";

type NoticeType = {
  action?: any;
  data?: UserType;
  decision?: string;
};

export default NoticeType;
