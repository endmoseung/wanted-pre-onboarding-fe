import axios from "axios";
let baseURL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

export async function postSignUp(email, password) {
  try {
    const response = await axios({
      url: `${baseURL}/auth/signup`,
      method: "POST",
      headers: { ContentType: "application/json" },
      data: {
        email: email,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    alert("존재하는 이메일입니다.");
    throw new Error(error);
  }
}

export async function postSignIn(email, password) {
  try {
    const response = await axios({
      url: `${baseURL}/auth/signin`,
      method: "POST",
      headers: { ContentType: "application/json" },
      data: {
        email: email,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    alert("비밀번호와 아이디를 다시 확인해주세요.");
    throw new Error(error);
  }
}

export async function createTodos(todos) {
  try {
    const response = await axios({
      url: `${baseURL}/todos`,
      method: "POST",
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access_token
        }`,
        ContentType: "application/json",
      },
      data: {
        todo: todos,
      },
    });
    return response.data;
  } catch (error) {
    alert("한글자 이상의 단어를 써주세요!");
    throw new Error(error);
  }
}

export async function getTodos() {
  try {
    const { data } = await axios({
      url: `${baseURL}/todos`,
      method: "GET",
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access_token
        }`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteTodos(id) {
  try {
    const response = await axios({
      url: `${baseURL}/todos/${id}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access_token
        }`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateTodo(itemTodo, completed, itemId) {
  try {
    const response = await axios({
      url: `${baseURL}/todos/${itemId}`,
      method: "PUT",
      headers: {
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access_token
        }`,
        ContentType: "application/json",
      },
      data: {
        todo: itemTodo,
        isCompleted: completed,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
