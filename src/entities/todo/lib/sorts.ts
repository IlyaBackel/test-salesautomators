import { ActiveSort, DirectionOfSort, ITodo } from "../model/ITodo";
import { TODO_STATUS } from "../model/todo-constants";

//сортировки задач
export const sortTodos = (todos: ITodo[], sort: ActiveSort, direction: DirectionOfSort) => {
  const sortedTodos = [...todos];

  switch (sort) {
    case "byDate":
      sortedTodos.sort((a, b) => {
        const dateA = new Date(a.creationDate).getTime();
        const dateB = new Date(b.creationDate).getTime();
        return direction === "decr" ? dateB - dateA : dateA - dateB;
      });
      break;

    case "byTitle":
      sortedTodos.sort((a, b) => {
        const compare = a.title.localeCompare(b.title);
        return direction === "decr" ? -compare : compare;
      });
      break;

    case "byStatus": 
      {
        const statusOrderDecr = {
          [TODO_STATUS.COMPLETED]: 1, 
          [TODO_STATUS.ACTIVE]: 2,      
          [TODO_STATUS.CANCELLED]: 3, 
        };

        const statusOrderIncr = {
          [TODO_STATUS.ACTIVE]: 1,      
          [TODO_STATUS.COMPLETED]: 2,   
          [TODO_STATUS.CANCELLED]: 3,   
        };

        sortedTodos.sort((a, b) => {
          const orderMap = direction === "decr" ? statusOrderDecr : statusOrderIncr;
          const orderA = orderMap[a.status] || 4;
          const orderB = orderMap[b.status] || 4;
          return orderA - orderB;
        });
        break;
      }
  }

  return sortedTodos;
};

