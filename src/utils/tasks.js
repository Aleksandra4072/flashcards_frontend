import axios from "../api/axios.js";

export const create_task = async (params) => {
  try {
    return await axios.post("/task", params);
  } catch (error) {
    console.log(error);
  }
};

export const delete_task = async (task_id) => {
  try {
    return await axios.delete(`/task/${task_id}`);
  } catch (error) {
    console.log(error);
  }
};

export const get_all_tasks = async () => {
  try {
    return await axios.get("/task");
  } catch (error) {
    console.log(error);
  }
};

export const get_task_by_id = async (task_id) => {
  try {
    return await axios.get(`/task/${task_id}`);
  } catch (error) {
    console.log(error);
  }
};
