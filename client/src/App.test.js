import React from "react";
import {Link} from "react-router-dom"
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Landing from "../src/Views/Landing/Landing"


Enzyme.configure({ adapter: new Adapter() });

describe("<Landing />",()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = Enzyme.shallow(<LandingPage />)
    })
    
    it("Renderiza un 'h1' con el texto 'Welcome'", () => {
        expect(wrapper.find("h1").at(0).text()).toEqual("Welcome");
      });

    it("Renders a Link with the 'to' property that addresses '/home' " , () =>{
        expect(wrapper.find(Link)).toHaveLength(1)
        expect(wrapper.find(Link).at(0).prop("to")).toEqual("/home")
    })
    it("Renders a button with the name Enter", () => {
        expect(wrapper.find("button").at(0).text()).toEqual("Enter");
      });

})