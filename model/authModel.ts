import config from "../config/config.json"
import AuthResponse from "../interface/authresponse";
import storageModel from "./storageModel";

function buildResponse(type: "error" | "success" | "warning", title: string, message: string): AuthResponse {
  return {
    type: type,
    title: title,
    message: message
  };
}

const authModel = {
  isLoggedIn: async function (): Promise<boolean> {
    const token = await storageModel.readToken();
    if (!token) {
      return false;
    }
    const twentyFourHours = 1000 * 60 * 60 * 24;
    const notExpired = (new Date().getTime() - token.date) < twentyFourHours;

    return token && notExpired;
  },
  register: async function (email: string, password: string): Promise<AuthResponse> {
    const body = {
      email: email.toLowerCase(),
      password: password,
      api_key: config.auth_key
    }
    const response = await fetch(`${config.auth_url}register`, {
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
    const result = await response.json();
    if (result.errors) {
      return buildResponse("error", result.errors.title, result.errors.detail)
    }
    if (result.data) {
      return buildResponse("success", "Registration complete", result.data.message)
    }
    return buildResponse("error", "Unexpected error", "Something unexpected happened")
  },
  login: async function (email: string, password: string): Promise<AuthResponse> {
    const body = {
      email: email.toLowerCase(),
      password: password,
      api_key: config.auth_key
    }
    const response = await fetch(`${config.auth_url}login`, {
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    });
    const result = await response.json();
    if (result.errors) {
      return buildResponse("error", result.errors.title, result.errors.detail)
    }
    if (result.data) {
      storageModel.storeToken(result.data.token);
      return buildResponse("success", "Welcome", result.data.message)
    }
    return buildResponse("error", "Unexpected error", "Something unexpected happened")
  },
  logout: async function logout() {
    await storageModel.deleteToken();
  }
}

export default authModel;
