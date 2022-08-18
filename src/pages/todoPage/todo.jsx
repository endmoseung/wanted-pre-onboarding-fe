import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { create_Todos, delete_Todos, get_Todos } from "../../common/axios";
import TodoItem from "./todoItem";

const Todo = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/");
    // }
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await get_Todos();
    console.log("res", result);
    setTodoList((prev) => [...result]);
  };

  // const refresh = async() =>{
  //   d~~~
  //   ~~~
  // }

  const handleAddList = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    // (async () => {
    //   let promise = new Promise((resolve, reject) => {
    //     resolve(create_Todos(e.target[0].value));
    //   });
    //   let result = await promise;
    //   console.log(result);
    // })();
    await create_Todos(e.target[0].value);
    await getPosts();
    e.target.reset();
  };

  const handleDelete = async (id) => {
    (async () => {
      let promise = new Promise((resolve, reject) => {
        resolve(delete_Todos(id));
      });
      let result = await promise;
    })();
    await getPosts();
  };
  if (!todoList) {
    return <div>Loading</div>;
  }

  return (
    <Container>
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

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const TodoListContainer = styled.div``;

const AddListWrapper = styled.form`
  display: flex;
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
  font-size: 20px;
  cursor: pointer;
`;

const TodoLists = styled.div``;
