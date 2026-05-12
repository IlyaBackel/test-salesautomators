import { TODO_STATUS } from "../constants/todo-constants";


export interface ITodo {
    id: string;
    title: string;             
    description?: string;         
    location?: string;            
    status: TODO_STATUS;          
    creationDate: number;         
    executionDateTime: number;     
}

export type ActiveSort = "byDate" | "byTitle" | "byStatus";
export type DirectionOfSort = "decr" | "incr";
