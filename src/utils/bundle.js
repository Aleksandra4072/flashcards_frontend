import axios from "../api/axios.js";
import { notification } from 'antd';

const openNotification = (message, type) => {
  notification[type]({
    message,
  });
};

// export const create_bundle = async (params) => {
//   try {
//     return await axios.post("/bundle", params);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const delete_task = async (task_id) => {
//   try {
//     return await axios.delete(`/task/${task_id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getAllBundles = async () => {
  try {
    result = await axios.get("/bundle");
    if (result?.data) {
      return result?.data;
    } else {
      openNotification("You do not have any bundles yet", "info");
    }
  } catch (e) {
    openNotification(e.response.data.detail, "error");
  }
};

// export const get_task_by_id = async (task_id) => {
//   try {
//     return await axios.get(`/task/${task_id}`);
//   } catch (error) {
//     console.log(error);
//   }
// };
