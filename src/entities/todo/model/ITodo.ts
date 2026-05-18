import { TODO_STATUS } from "./todo-constants";


export interface ITodo {
  id: string;
  title: string;
  description?: string;
  manualLocation?: string;
  mapLocation?: string;
  latitude?: number;
  longitude?: number;
  status: TODO_STATUS;
  creationDate: number;
  executionDateTime: number;
  notificationId?: string;
}

export type ActiveSort = "byDate" | "byTitle" | "byStatus";
export type DirectionOfSort = "decr" | "incr";
