import React, { useEffect } from "react";
import Enzyme, { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EmployeeData from "../Details/EmployeeData";
import { Modify } from "../Details/Modify";
import reducer from "../store/Reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import {DropDown} from "../FormFields/Dropdown"
const store = createStore(reducer);
// let wrapper;
// console.log(store);
const data = {
  username: "dileep",
  password: "dileep",
  managerId: "dileep",
  role: "PA",
};
store.dispatch({ type: "STORE_LOGGEDIN_CREDENTIALS", payload: data }),
  console.log(store.getState());
configure({ adapter: new Adapter() });
let props;
let wrapper;
const setHookState = (newState) =>
  jest.fn().mockImplementation(() => [newState, () => {}]);

// beforeEach(()=>{
//     jest.spyOn(React,"useEffect").mockImplementation(f=>f())
//     props={
//         loadProfile:jest.fn().mockImplementation()
//     }
//     React.useState=jest.fn(()=>["",jest.fn()])
//     wrapper = mount(<EmployeeData.WrappedComponent {...props} loggedInDetails={data} store={store}/>);
// })
describe("employee component", () => {
  it("should render profile component", () => {
    // React.useState=jest.fn(()=>["",jest.fn()])
    //        expect(wrapper.find(Modify)).toHaveLength(1);
    const loggedInDetails = { role: "" };
    const testState = { choice: "Profile" };
    const preventDefault=jest.fn();
    wrapper = shallow(
      <EmployeeData.WrappedComponent
        // onChange={(e) => {
        //   testState[e.target.name] = e.target.value;
        // }}
        loggedInDetails={loggedInDetails}
      />
    );
    // console.debug(wrapper.debug());
    // console.debug(wrapper.find('DropDown').at(0).simulate('change',{target:{name:"choice",value:"Profile"}}).debug());
    wrapper
      .find(DropDown).dive()
      .simulate("change",{preventDefault,target:{name:"choice",value:"Profile"}});
    // console.debug(wrapper.find('input').at(0)
    // .simulate("change",{preventDefault,target:{name:"choice",value:"Profile"}}).debug());
    console.log(wrapper.debug());
    expect(wrapper.find(Modify)).toHaveLength(1);
  });
});
