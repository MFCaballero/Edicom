import axios from 'axios';

export const GET_EXPENSES = 'GET_EXPENSES';
export const FILTER_EXPENSES = 'FILTER_EXPENSES';
export const POST_EXPENSES = 'POST_EXPENSES';
export const INVOICED_EXPENSES = 'INVOICED_EXPENSES';
export const GET_EXPENSES_APARTMENT_NUMBER = 'GET_EXPENSES_APARTMENT_NUMBER';
export const CHANGE_STATUS = 'CHANGE_STATUS';


export const getExpenses = () =>  {
  return function (dispatch) {
    console.log("entró a la action de getExpenses")
    return axios.get('http://localhost:3001/expenses/allByApartments')
      .then(res => {
        console.log("Se resolvió la busqueda de las expensas", new Date());
        dispatch({
          type: GET_EXPENSES,
          payload: res.data
        })
      })
  }
}

export const postExpenses = (idBuilding, month, year) =>  {
  return function (dispatch) {
    return axios.post(`http://localhost:3001/expenses/add/${month}/${year}`)
      .then(res => {
        dispatch({
          type: POST_EXPENSES,
          // payload: res.data
        },
        err => {
          return new Error(err);
        })
      })
  }
}

export const getInvoicedExpenses = () =>  {
  console.log( 'despachando getInvoiceExpenses' )
  return function (dispatch) {
    console.log(" entré a la actionnnnn ")
    return axios.get(`http://localhost:3001/expenses/invoicedExpenses`)
      .then(res => {
        console.log("res", res)
        dispatch({
          type: INVOICED_EXPENSES,
          payload: res.data
        })
      })
  }
}

export function filterExpenses(payload) {
	return {type: 'FILTER_EXPENSES', payload};
}

export const getExpensesApartmentNumber = (number_apartment) =>  {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/expenses/${number_apartment}`)
      .then(res => {
        dispatch({
          type: GET_EXPENSES_APARTMENT_NUMBER,
          payload: res.data
        })
      })
  }
}

export const changeStatus = (id) =>  {
  return function (dispatch) {
    console.log("Entró al changeStatus", new Date())
    return axios.put(`http://localhost:3001/expenses/changeStatus/${id}`)
      .then(res => {
        console.log("volvió del changeStatus", new Date())
        dispatch({
          type: CHANGE_STATUS,
          payload: res.data
        })
      })
  }
}
