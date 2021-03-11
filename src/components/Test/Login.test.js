import React from 'react';
import Enzyme,{configure,shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from "../Login/Login";
import { Input } from "../FormFields/input";
import reducer from "../store/Reducer"
import {Provider} from "react-redux"
import {createStore} from "redux"
import renderer from 'react-test-renderer';
const store=createStore(reducer)
configure({adapter:new Adapter()})
describe("Login Page",()=>{

    it("should possess two fields to signIn",()=>{
        const wrapper =shallow(<Login store={store}/>).dive().dive();
        expect(wrapper.find(Input)).toHaveLength(2)
    })

    it("should possess six fields to signUp",()=>{
        const wrapper =shallow(<Login store={store}/>).dive().dive();
        wrapper.find('u').simulate('click');
        expect(wrapper.find(Input)).toHaveLength(6)
        wrapper.find('Input').at(0).simulate('change',{target:{name:"username",value:"dileep"}})

    })
})