// import {useState} from "react"

const initialState = {
  // details: [{ id: 1, name: "dilep", city: "vijayawada" }],
  credentials: {},
  // usernames: [],
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_DETAILS") {
    state.details.push({
      id: action.payload._id,
      name: action.payload.name,
      city: action.payload.city,
    });
  } else if (action.type === "SET_LOGGEDINDETAILS") {
    action.payload.map((e) => {
      state.usernames.push(e);
    });
  } else if (action.type === "STORE_LOGGEDIN_CREDENTIALS") {
    // console.log(action.payload);
    // const data=
    state = { ...state, credentials: action.payload };
    return state;
  }
  else if(action.type==="GET_LOGGEDINCREDENTIALS"){

    return state.credentials;
  }
   else if (action.type === "DELETE_DETAILS") {
    let arr = [];
    state.details.map((k, i) => {
      if (k.id !== action.payload) {
        arr.push(k);
      }
    });
    // console.log(arr);
    // state.details:arr;
    const data = { details: arr };
    // state.details.
    state = { ...state, details: arr };
    return state;
    // initialState.details=arr;
  } else if (action.type === "UPDATE_DETAILS") {
    let arr = [];
    state.details.map((k, i) => {
      if (Number(k.id) === Number(action.payload.index)) {
        arr.push({
          id: action.payload.index,
          name: action.payload.name,
          city: action.payload.city,
        });
      } else {
        arr.push(k);
      }
    });
    state = { ...state, details: arr };
    return state;
  }
  return state;
};

export default reducer;
