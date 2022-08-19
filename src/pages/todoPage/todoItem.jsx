import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateTodo } from "../../common/axios";

const TodoItem = ({ item, handleDelete }) => {
  const [itemState, setItemState] = useState(item);
  const [modifyState, setModifyState] = useState(true);
  const [inputChange, setInputChange] = useState("");

  const itemId = itemState?.id;
  const itemTodo = itemState?.todo;
  const itemIsCompleted = itemState?.isCompleted;

  const onClickDelete = () => {
    handleDelete(itemId);
  };

  const onClickCheck = async () => {
    let completed;
    if (itemState.isCompleted) {
      completed = false;
    } else {
      completed = true;
    }
    await updateTodos(itemTodo, completed, itemId);
  };

  const updateTodos = async (itemTodo, completed, itemId) => {
    const result = await updateTodo(itemTodo, completed, itemId);
    setItemState(result);
  };

  const handleModify = () => {
    setModifyState(false);
    setInputChange(itemTodo);
  };

  const onClickCancel = () => {
    setModifyState(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModifyState(true);
    await updateTodos(e.target[0].value, itemIsCompleted, itemId);
  };

  const onChangeInput = (e) => {
    setInputChange(e.target.value);
  };
  return (
    <Container>
      <CheckButton onClick={onClickCheck} icon={faCheck}></CheckButton>
      {modifyState ? (
        <MainTodo itemIsCompleted={itemIsCompleted}>{itemTodo}</MainTodo>
      ) : (
        <TodoForm onSubmit={handleSubmit}>
          <MainTodoInput
            value={inputChange}
            onChange={onChangeInput}
            type="text"
          ></MainTodoInput>
          <SubmitButton>제출</SubmitButton>
          <CancelButton onClick={onClickCancel}>취소</CancelButton>
        </TodoForm>
      )}
      {modifyState ? (
        <ModifyButton onClick={handleModify}>수정</ModifyButton>
      ) : (
        ""
      )}
      <TodoDeleteButton
        onClick={onClickDelete}
        icon={faTrash}
      ></TodoDeleteButton>
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const CheckButton = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const TodoForm = styled.form``;

const MainTodo = styled.div`
  text-decoration: ${({ itemIsCompleted }) =>
    itemIsCompleted ? "line-through" : "none"};
  text-decoration-color: ${({ itemIsCompleted }) =>
    itemIsCompleted ? "red" : "none"};
  color: ${(props) =>
    props.itemIsCompleted ? props.theme.colors.GREY_30 : "black"};
  transition: all 300ms ease-in-out;
`;

const MainTodoInput = styled.input``;

const ModifyButton = styled.button`
  cursor: pointer;
  color: red;
  &:hover {
    color: blue;
    transition: all 300ms ease-in-out;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  color: red;
  &:hover {
    color: blue;
    transition: all 300ms ease-in-out;
  }
`;

const CancelButton = styled.div`
  cursor: pointer;
  color: red;
  &:hover {
    color: blue;
    transition: all 300ms ease-in-out;
  }
`;

const TodoDeleteButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  &:hover {
    color: red;
    transition: all 300ms ease-in-out;
  }
`;
