import React from "react";
import { ActionTypeUnion } from "../actions/aviationActions";

type StateType = {
  data: any[];
  loading: boolean;
  error: string;
  currentPage: number;
  itemsPerPage: number;
  searchValue: string;
};

export const stateTypeData: StateType = {
  data: [],
  loading: false,
  error: "",
  currentPage: 1,
  itemsPerPage: 12,
  searchValue: "",
}

export const TableContext = React.createContext<StateType>(stateTypeData);


export const tableReducer = (state: StateType, action: ActionTypeUnion): StateType => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload,
        currentPage: 1,
      };
    default:
      return state;
  }
};