type ActionTypeFetchData = {
    type: "FETCH_DATA";
    payload: any[];
};

type ActionTypeSetLoading = {
    type: "SET_LOADING";
};

type ActionTypeSetError = {
    type: "SET_ERROR";
    payload: string;
};

type ActionTypeCurrentPage = {
    type: "SET_CURRENT_PAGE";
    payload: number;
};

type ActionTypeSearchValue = {
    type: "SET_SEARCH_VALUE";
    payload: string;
};

export type ActionTypeUnion =
    | ActionTypeFetchData
    | ActionTypeSetLoading
    | ActionTypeSetError
    | ActionTypeCurrentPage
    | ActionTypeSearchValue;