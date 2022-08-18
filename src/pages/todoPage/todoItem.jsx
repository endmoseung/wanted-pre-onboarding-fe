import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { delete_Todos } from "../../common/axios";

const TodoItem = ({ item, handleDelete }) => {
  const itemId = item?.id;
  const itemTodo = item?.todo;
  const handleClick = () => {
    handleDelete(itemId);
  };
  return (
    <Container>
      <MainTodo>{itemTodo}</MainTodo>
      <TodoDeleteButton onClick={handleClick} icon={faTrash}></TodoDeleteButton>
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  display: flex;
`;

const MainTodo = styled.div``;

const TodoDeleteButton = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
