/** @format */

import api from "./axios";

export const getTopics = async (params = {}) => {
  const response = await api.get("/topics", {
    params,
  });

  return response.data;
};

export const getArchivedTopics = async () => {
  const response = await api.get("/topics/archive");
  return response.data;
};

export const getTopicById = async (id) => {
  const response = await api.get(`/topics/${id}`);
  return response.data;
};

export const createTopic = async (topicData) => {
  const response = await api.post("/topics", topicData);
  return response.data;
};

export const updateTopic = async (id, topicData) => {
  const response = await api.patch(`/topics/${id}`, topicData);
  return response.data;
};

export const deleteTopic = async (id) => {
  const response = await api.delete(`/topics/${id}`);
  return response.data;
};

export const archiveTopic = async (id) => {
  const response = await api.patch(`/topics/${id}/archive`);
  return response.data;
};
export const unArchiveTopic = async (id) => {
  const response = await api.patch(`/topics/${id}/unarchive`);
  return response.data;
};
