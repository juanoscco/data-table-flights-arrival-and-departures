import React, { useReducer, useEffect } from "react";
import { tableReducer, TableContext, stateTypeData } from "../../store/reducers/aviationReducers";
import { apiAviationEdge } from "../../api/aviationEdgeApi";

type TableProps = {
  type: string;
  iataCode: string;
};

const Table: React.FC<TableProps> = ({ type, iataCode }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [state, dispatch] = useReducer(tableReducer, stateTypeData);


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await apiAviationEdge({iataCode, type});
        const filteredData = response.data.filter((item: any) =>
          item.flight.iataNumber
            .toLowerCase()
            .includes(state.searchValue.toLowerCase())
        );
        dispatch({ type: "FETCH_DATA", payload: filteredData });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, [type, iataCode, state.currentPage, state.searchValue]);

  const pages = Array.from(
    { length: Math.ceil(state.data.length / state.itemsPerPage) },
    (_, index) => index + 1
  );

  return (
    <TableContext.Provider value={state}>
      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div className="container-md">
          <div>
          <label htmlFor="search-input">Buscar: </label>
          <input
            type="text"
            id="search-input"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          </div>
          <table className="table text-white">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Departure Airport</th>
                <th>Arrival Airport</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {state.data
                .sort((a, b) => 
                new Date(b.departure.scheduledTime).getTime() - 
                new Date(a.departure.scheduledTime).getTime())
                .filter(
                  (item: any) =>
                    item.flight.iataNumber
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    item.departure.iataCode
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    item.arrival.iataCode
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .slice(
                  (state.currentPage - 1) * state.itemsPerPage,
                  state.currentPage * state.itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.flight.iataNumber}
                    </td>
                    <td>{item.departure.iataCode}</td>
                    <td>{item.arrival.iataCode}</td>
                    <td>{new Date(item.departure.scheduledTime).toLocaleTimeString("en-US",{ hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{new Date(item.arrival.scheduledTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: state.currentPage - 1,
                })
              }
              disabled={state.currentPage === 1}
            >
              Anterior
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() =>
                  dispatch({
                    type: "SET_CURRENT_PAGE",
                    payload: page,
                  })
                }
                disabled={state.currentPage === page}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: state.currentPage + 1,
                })
              }
              disabled={
                state.currentPage ===
                Math.ceil(state.data.length / state.itemsPerPage)
              }
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </TableContext.Provider>
  );
};

export default Table;