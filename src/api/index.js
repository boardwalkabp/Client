import axios from "axios";

let API_URL = "https://demo-abp.herokuapp.com/";
if (window.location.hostname === "localhost") {
  API_URL = "https://localhost:7022/";
}

export const createAPIEndpoint = (endpoint) => {
  let baseURL = API_URL + "api/" + endpoint + "/";
  return {
    fetch: () => axios.get(baseURL),
    fetchById: (id) => axios.get(baseURL + id),
    post: (newRecord) => axios.post(baseURL, newRecord),
    put: (id, updatedRecord) => axios.put(baseURL + id, updatedRecord),
    delete: (id) => axios.delete(baseURL + id),
  };
};

export const ENDPOINTS = {
  clients: "clients",
  registerClient: "clients/register",
  loginClient: "clients/login",
  EditClient: "clients/edit",
  DeleteClient: "clients/delete",
  ViewClient: "clients/view",

  users: "users",
  registerUser: "users/register",
  loginUser: "users/login",
  EditUser: "users/edit",
  DeleteUser: "users/delete",
  ViewUser: "users/view",

  categories: "categories",
  createCategory: "categories/create",
  editCategory: "categories/edit",
  deleteCategory: "categories/delete",
  viewCategory: "categories/view",

  applications: "applications",
  createApplication: "applications/create",
  editApplication: "applications/edit",
  deleteApplication: "applications/delete",
  viewApplication: "applications/view",

  questions: "questions",
  createQuestion: "questions/create",
  editQuestion: "questions/edit",
  deleteQuestion: "questions/delete",
  viewQuestion: "questions/view",

  // clientProfile: "clientProfile",
  // clinetApplication: "clientApplication",
};
