import api from "./axios";

export const login = async (data) => {
  const response = await api.post("/users/login", data);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const verifyEmail = async (data) => {
  const response = await api.post("/users/verify-email", data);
  return response.data;
};

export const resendVerificationOTP = async (data) => {
  const response = await api.post("/users/resend-verification-otp", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("/users/forgot-password", data);
  return response.data;
}

export const resetPassword = async (data) => {
  const response = await api.post("/users/reset-password", data);
  return response.data;
};

