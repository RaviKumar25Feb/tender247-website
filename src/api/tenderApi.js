import api from "./axios";

export const getTenders = async (params = {}) => {
  const { data } = await api.get("/tenders", {
    params,
  });

  return data;
};

export const getTenderById = async (id) => {
  const { data } = await api.get(`/tenders/${id}`);

  return data;
};

export const getStates = async () => {
  const { data } = await api.get("/tenders/states");

  return data;
};

export const getCities = async (state = "") => {
  const { data } = await api.get("/tenders/cities", {
    params: { state },
  });

  return data;
};

export const getStats = async () => {
  const { data } = await api.get("/tenders/stats");

  return data;
};
