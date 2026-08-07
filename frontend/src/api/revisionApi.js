/** @format */

import api from "./axios";

export const getTodayRevisions = async () => {
  const response = await api.get("/revisions/today");

  return response.data;
};

export const completeRevision = async (revisionId, rating) => {
  const response = await api.patch(`/revisions/${revisionId}/complete`, {
    rating,
  });

  return response.data;
};

export const getRevisionHistory = async (topicId) => {
  const response = await api.get(`/revisions/${topicId}/revision-history`);
  return response.data;
};

export const getNextRevision = async (topicId) => {
  const response = await api.get(`/revisions/${topicId}/next-revision`);
  return response.data;
};

export const getRevisionById = async (id) => {
  const { data } = await api.get(`/revisions/${id}`);
  return data;
};
