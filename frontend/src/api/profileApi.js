/** @format */

import api from "./axios";

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");

  return data;
};

export const updateProfile = async (formData) => {
  const { data } = await api.patch("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
