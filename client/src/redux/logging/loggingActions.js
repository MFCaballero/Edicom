import axios from 'axios';
import swal from 'sweetalert';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_REJECT = 'LOGGING_REJECT';
export const LOGOUT = 'LOGOUT';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCESS';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SEND_EMAIL = 'SEND_EMAIL';
export const TOKEN_TO_EMAIL = 'TOKEN_TO_EMAIL';
export const EMAIL_TO_TOKEN = 'EMAIL_TO_TOKEN';
export const GET_USER_ID = 'GET_USER_ID';


//----------   Middleware para agrgar el headers Authorization  ----------------

axios.interceptors.request.use((req)=> {
  if(localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})



axios.interceptors.request.use((req)=> {
  if(!localStorage.getItem('profile')) {
    
  }
  return req;
})

//-------------------------------------------------------------------------------

export const loggingIn = (user) => {
  return function (dispatch) {
    // dispatch({ type: LOGGING_IN })
    axios.post('http://localhost:3001/loggings/loggingIn', user)    //loguearse en el back
      .then(res => {
          localStorage.setItem('profile', JSON.stringify(res.data));
          dispatch({
            type: LOGGING_IN_SUCCESS,
            payload: res.data
          })
          return true
        }
        ,
        err => {
          dispatch({
            type: LOGGING_REJECT,
            payload: err,
          });
          swal({
            title: err?.response?.data?.message?.message,
            text: 'Intente de nuevo',
            icon: `warning`
          })
          return false;
        }
      )
      .then(async (res) => {
          const profile = await JSON.parse(localStorage.getItem('profile'))
          if(res){
            swal({
              title: profile?.message?.message,
              text: `Bienvenido ${profile?.name}`,
              icon: `success`
            })
          }
      })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT
  })
  swal("Sesion cerrada!","");
}


export function handleChangePassword(data) {
	return function (dispatch) {
		return axios
			.put(' http://localhost:3001/loggings/changepassword ', data)
			.then(res => {
				dispatch({type: CHANGE_PASSWORD, payload: res.data});
			});
	};
}


export function handleSendEmail(data) {
  var email = {email:data}
	return function (dispatch) {
		return axios
			.post('http://localhost:3001/loggings/sendEmail ', email)
      .then(res => {
				dispatch({type: SEND_EMAIL});
        swal("Revise su Correo","")
        alert("Revise su correo")
			},
      err => {
          dispatch({
            type: LOGGING_REJECT,
            payload: err,
          });
          swal({
            title: "Error",
            text: 'El usuario no existe',
            icon: `warning`
          })
          return false;
      });
	};
}

export function tokenToEmail(data) {
  var token = {token:data}
	return function (dispatch) {
		return axios
			.post('http://localhost:3001/loggings/tokenToEmail ', token)
      .then(res => {
				dispatch({type: TOKEN_TO_EMAIL, payload: res.data});
			});
	};
}


export function emailToToken(data) {
  var email = {email:data}
	return function (dispatch) {
		return axios
			.post('http://localhost:3001/loggings/emailToToken ', email)
      .then(res => {
				dispatch({type: EMAIL_TO_TOKEN, payload: res.data});
			});
	};
}

export function getIdUser(token) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/loggings/userId/${token}`)
      .then(res => {
				dispatch({type: GET_USER_ID, payload: res.data});
			});
	};
}
