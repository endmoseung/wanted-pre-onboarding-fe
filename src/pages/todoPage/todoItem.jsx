import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateTodo } from "../../common/axios";

const TodoItem = ({ item, handleDelete }) => {
  const [itemState, setItemState] = useState(item);
  const [modifyState, setModifyState] = useState(true);
  const [inputChange, setInputChange] = useState("");

  const itemId = item.id;
  const itemTodo = item.todo;
  const itemIsCompleted = item.isCompleted;

  const onClickDelete = () => {
    handleDelete(itemId);
  };

  const onClickCheck = async () => {
    let completed;
    if (itemIsCompleted.isCompleted) {
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
  margin-right: 5px;
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;

const TodoForm = styled.form`
  display: flex;
  align-items: center;
`;

const MainTodo = styled.div`
  text-decoration: ${({ itemIsCompleted }) =>
    itemIsCompleted ? "line-through" : "none"};
  text-decoration-color: ${(props) =>
    props.itemIsCompleted ? props.theme.colors.ORANGE_900 : "none"};
  color: ${(props) =>
    props.itemIsCompleted
      ? props.theme.colors.GREY_30
      : props.theme.colors.BLACK};
  transition: all 300ms ease-in-out;
`;

const MainTodoInput = styled.input`
  width: 100px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const ModifyButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.ORANGE_900};
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
    transition: all 300ms ease-in-out;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.ORANGE_900};
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
    transition: all 300ms ease-in-out;
  }
`;

const CancelButton = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.ORANGE_900};
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
    transition: all 300ms ease-in-out;
  }
`;

const TodoDeleteButton = styled(FontAwesomeIcon)`
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.ORANGE_900};
    transition: all 300ms ease-in-out;
  }
`;
