import React from "react";
import {render ,fireEvent, getByText, getByTestId} from "@testing-library/react"
import LoginForm from "../pages/SignInPage/SignInPage";
import SignInPage from '../pages/SignInPage/SignInPage';
import { MemoryRouter } from "react-router";
describe ("login", () => {
    test('Email input is placed on page ', () => {
       const component  = render(<MemoryRouter><SignInPage /></MemoryRouter>);
       const input_node = component.getByPlaceholderText("Email");
       expect(input_node).toBeInDocument;
    })

    test('Password input is placed on page ', () => {
        const component  = render(<MemoryRouter><SignInPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Password");
        expect(input_node).toBeInDocument;
     })

     test('Email input works correctly ', () => {
        const component  = render(<MemoryRouter><SignInPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Email");
        fireEvent.change(input_node, {target: {value: "testing"}});
        expect(input_node.value).toMatch("testing");

     })

     test('Password input works correctly ', () => {
        const component  = render(<MemoryRouter><SignInPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Password");
        fireEvent.change(input_node, {target: {value: "testing"}});
        expect(input_node.value).toMatch("testing");

     }) 

     test('Email input is placed on page ', () => {
        const component  = render(<MemoryRouter><SignInPage /></MemoryRouter>);
        const input_node = component.getByText("Log In");
        expect(input_node).toBeInDocument;
     })

    
 



    
} )
