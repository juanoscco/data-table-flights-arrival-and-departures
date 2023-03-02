import React, { useReducer, useEffect } from "react";
import { apiAviationEdge } from "../../api/aviationEdgeApi";
import {
  tableReducer,
  TableContext,
  stateTypeData,
} from "../../store/reducers/aviationReducers";
import "./Table.scss";

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
        const response = await apiAviationEdge({ iataCode, type });
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

  // Pagination
  const pages = Array.from(
    { length: Math.ceil(state.data.length / state.itemsPerPage) },
    (_, index) => index + 1
  );
  const setCurrentPageNext = () => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: state.currentPage + 1,
    });
  };

  const setCurrentPagePrevious = () => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: state.currentPage - 1,
    });
  };

  // Time
  const setToLocaleTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // Set to Status
  const setStatus = (status: string) => {
    switch (status) {
      case "landed":
        return "Aterrizado";
      case "scheduled":
        return "Programado";
      case "cancelled":
        return "Cancelado";
      case "active":
        return "Activo";
      case "incident":
        return "Incidente";
      case "diverted":
        return "Desviado";
      case "redirected":
        return "Redirigido";
      default:
        break;
    }
  };

  return (
    <TableContext.Provider value={state}>
      {state.loading ? (
        <p className="text-white align-items-center justify-content-center">Loading...</p>
      ) : state.error ? (
        <p className="text-white">Error: {state.error}</p>
      ) : (
        <div className="row">
          <div className="col-xs-12">
              <input
                type="text"
                id="search-input"
                placeholder="Buscador"
                className="form-control text-center"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            <table className="table table-dark mt-3">
              <thead>
                <tr>
                  <th>N° vuelo</th>
                  <th>Salida</th>
                  <th>Llegada</th>
                  <th>Hora de salida</th>
                  <th>Hora de llegada</th>
                  <th>Estado de vuelo</th>
                </tr>
              </thead>
              <tbody>
                {state.data
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
                  .sort(
                    (a, b) =>
                      new Date(b.departure.scheduledTime).getTime() -
                      new Date(a.departure.scheduledTime).getTime()
                  )
                  .slice(
                    (state.currentPage - 1) * state.itemsPerPage,
                    state.currentPage * state.itemsPerPage
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.flight.iataNumber}</td>
                      <td>{item.departure.iataCode}</td>
                      <td>{item.arrival.iataCode}</td>
                      <td>{setToLocaleTime(item.departure.scheduledTime)}</td>
                      <td>{setToLocaleTime(item.arrival.scheduledTime)}</td>
                      <td>{setStatus(item.status)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex align-items-center justify-content-center">
              <ul className="pagination pagination-sm">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={setCurrentPagePrevious}
                    disabled={state.currentPage === 1}
                  >
                    <span>&laquo;</span>
                  </button>
                </li>
                <li className="page-item">
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
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={setCurrentPageNext}
                    disabled={
                      state.currentPage ===
                      Math.ceil(state.data.length / state.itemsPerPage)
                    }
                  >
                    <span>&raquo;</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </TableContext.Provider>
  );
};

export default Table;
