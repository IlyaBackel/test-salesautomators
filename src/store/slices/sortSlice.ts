
import { ACTIVE_SORT, DIRECTION_OF_SORT } from "@/src/constants/todo-constants";
import { ActiveSort, DirectionOfSort } from "@/src/types/todoItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SortState {
    activeSort: ActiveSort;
    directionOfSort: DirectionOfSort;
}

const initialState = {
    activeSort: ACTIVE_SORT.BY_DATE,
    directionOfSort: DIRECTION_OF_SORT.DECR,

};

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSort: (state: SortState, action: PayloadAction<{
            activeSort: ActiveSort;
            directionOfSort: DirectionOfSort;
        }>) => {
            state.activeSort = action.payload.activeSort;
            state.directionOfSort = action.payload.directionOfSort;
        },
    },
});

export const { setSort } = sortSlice.actions;

export const selectActiveSort = (state: { sort: SortState }) => state.sort.activeSort;
export const selectDirectionOfSort = (state: { sort: SortState }) => state.sort.directionOfSort;

export default sortSlice.reducer;