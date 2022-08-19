import Login from "../pages/mainPage/mainPage";
import SignIn from "../pages/signinPage/signin";
import Todo from "../pages/todoPage/todo";

const pages = [
  { pathname: "/", element: <Login />, isPublic: true },
  { pathname: "/signin", element: <SignIn />, isPublic: true },
  { pathname: "/todo", element: <Todo />, isPublic: false },
];

export default pages;
