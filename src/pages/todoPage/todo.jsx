import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createTodos, deleteTodos, getTodos } from "../../common/axios";
import TodoItem from "./todoItem";

const Todo = () => {
  const [todoList, setTodoList] = useState();

  console.log(todoList);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await getTodos();
    setTodoList((prev) => [...result]);
  };

  const handleAddList = async (e) => {
    e.preventDefault();
    await createTodos(e.target[0].value);
    await getPosts();
    e.target.reset();
  };

  const handleDelete = async (id) => {
    await deleteTodos(id);
    console.log(id);
    await getPosts();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      <Header>투두 리스트</Header>
      <TodoListContainer>
        <AddListWrapper onSubmit={handleAddList}>
          <AddListInput placeholder="할일을 입력해주세요"></AddListInput>
          <AddListButton>
            <FontAwesomePlus icon={faPlus}></FontAwesomePlus>
          </AddListButton>
        </AddListWrapper>
        <TodoLists>
          {todoList?.map((item, index) => (
            <TodoItem
              key={index}
              handleDelete={handleDelete}
              item={item}
            ></TodoItem>
          ))}
        </TodoLists>
      </TodoListContainer>
    </Container>
  );
};

export default Todo;

const LogoutButton = styled.button`
  cursor: pointer;
  margin-bottom: 100px;
  position: absolute;
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.MAIN_COLOR};
  padding: 10px 20px;
  border-radius: 10px;
  top: 20%;
  right: 30px;
  transition: all 150ms ease-in;
  &:hover {
    color: ${({ theme }) => theme.colors.ORANGE_900};
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Header = styled.header`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const TodoListContainer = styled.div``;

const AddListWrapper = styled.form`
  display: flex;
  align-items: center;
`;

const AddListInput = styled.input`
  border: none;
  width: 100%;
  padding: 13.5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;

const AddListButton = styled.button``;

const FontAwesomePlus = styled(FontAwesomeIcon)`
  font-size: 25px;
  cursor: pointer;
  transition: all 300ms ease-in;
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;

const TodoLists = styled.div``;
