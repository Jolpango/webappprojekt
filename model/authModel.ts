import config from "../config/config.json"
import AuthResponse from "../interface/authresponse";
import ChecklistItemInterface from "../interface/checklistiteminterface";
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
      storageModel.storeToken(result.data.token, result.data.user.email);
      return buildResponse("success", "Welcome", result.data.message)
    }
    return buildResponse("error", "Unexpected error", "Something unexpected happened")
  },
  logout: async function logout() {
    await storageModel.deleteToken();
  },
  getChecklist: async function (): Promise<ChecklistItemInterface[]> {
    const token = await storageModel.readToken();
    const response = await fetch("https://auth.emilfolino.se/data?api_key=" + config.auth_key, {
      headers: {
        'x-access-token': token.token
      }
    });
    const result = await response.json();
    const list = result.data.map((item: any) => {
      const unStrung = JSON.parse(item.artefact);
      return {
        comName: unStrung.comName,
        sciName: unStrung.sciName,
        id: item.id
      }
    });
    list.reverse();
    return list;
  },
  addChecklistItem: async function (comName: string, sciName: string) {
    const data = {
      artefact: JSON.stringify({
        comName: comName,
        sciName: sciName,
      }),
      api_key: config.auth_key
    };
    const token = await storageModel.readToken();
    const response = await fetch("https://auth.emilfolino.se/data", {
      body: JSON.stringify(data),
      headers: {
          'content-type': 'application/json',
          'x-access-token': token.token
      },
      method: 'POST'
    });
    const result = await response.json();
    return result;
  },
  removeChecklistItem: async function (id: number) {
    const data = {
      id: id,
      api_key: config.auth_key
    };
    const token = await storageModel.readToken();
    const response = await fetch("https://auth.emilfolino.se/data", {
      body: JSON.stringify(data),
      headers: {
          'content-type': 'application/json',
          'x-access-token': token.token
      },
      method: 'DELETE'
    });
  }
}

export default authModel;
