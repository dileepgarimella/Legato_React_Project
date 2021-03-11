import reducer from "../store/Reducer";

describe("store login details", () => {
  it("should store the loggin details", () => {
    expect(
      reducer(
        {credentials:{}},
        {
          type: "STORE_LOGGEDIN_CREDENTIALS",
          payload:{username: "dileep",
          password: "dileep"} 
        }
      )
    ).toEqual({
      credentials: { username: "dileep", password: "dileep" }
    });
  });
});

// describe("get logged in details",()=>{
//     it("should return the stored details",()=>{
//         expect(
//             reducer({},{
//                 type:"GET_LOGGEDINCREDENTIALS"
//             })
//         ).toEqual(undefined)
//     })
// })