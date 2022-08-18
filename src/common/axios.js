import axios from "axios";
let baseURL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

export async function post_signUp(email, password) {
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
    alert("이미 있는 이메일입니다.");
    throw new Error(error);
  }
}

export async function post_signIn(email, password) {
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

export async function create_Todos(todos) {
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

export async function get_Todos() {
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

export async function delete_Todos(id) {
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
