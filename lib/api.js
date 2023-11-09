import axios from "axios";
import * as UTIL from "@/util";

export const getHabits = async (goal) => {
  const url = UTIL.getUrl() + `/api/habit`;
  console.log("getHabits api");
  console.log(goal);
  const res = await axios.get(url, { params: { goal } });
  console.log({ res });
  return res.data;
};

export const getGoals = async () => {
  const url = UTIL.getUrl() + `/api/goals`;

  const res = await axios.get(url);

  return res.data;
};

export const getGoal = async (id) => {
  const url = UTIL.getUrl() + `/api/goal/${id}`;

  const res = await axios.get(url, { params: { id } });

  return res.data;
};
export const getGoalByName = async (name) => {
  const url = UTIL.getUrl() + `/api/goal`;

  const res = await axios.get(url, { params: { name } });

  return res.data;
};
export const getHabit = async (id) => {
  const url = UTIL.getUrl() + `/api/habit/${id}`;
  const res = await axios.get(url);
  return res.data;
};
export const editHabit = async (habit) => {
  const url = UTIL.getUrl() + `/api/habit/update`;
  const res = await axios.post(url, habit);

  return res.data;
};
export const addHabit = async (habit) => {
  const url = UTIL.getUrl() + `/api/habit/add`;
  const res = await axios.post(url, habit);

  return res.data;
};
export const addGoal = async (goal) => {
  const url = UTIL.getUrl() + `/api/goal/add`;
  const res = await axios.post(url, goal);

  return res.data;
};
export const deleteHabit = async (id) => {
  const urlDelete = UTIL.getUrl() + "/api/habit/remove";
  const res = await axios.delete(urlDelete, {
    params: { id },
  });

  return res.data;
};
