import React from "react";
import {render ,fireEvent} from "@testing-library/react"
import LoginForm from "../pages/SignInPage/SignInPage";
import ForgotPassowordPage from '../pages/ForgotPassword/ForgotPassword';
import SearchBar from '../components/SearchBar/SearchBar';
import HomePage from '../pages/HomePage/HomePage';
import { MemoryRouter } from "react-router";
import { Home } from "@mui/icons-material";
describe ("Forgot Password", () => {
    test('Email input is placed on page ', () => {
       const component  = render(<MemoryRouter><ForgotPassowordPage /></MemoryRouter>);
       const input_node = component.getByPlaceholderText("Email");
       expect(input_node).toBeInDocument;
    })


    test('Email input takes entered e-mail correctly ', () => {
        const component  = render(<MemoryRouter><ForgotPassowordPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Email");
        fireEvent.change(input_node, {target: {value: "testing"}});
        expect(input_node.value).toMatch("testing");
        
     })

     test('Non-valid Email input is placed on page ', () => {
        const component  = render(<MemoryRouter><ForgotPassowordPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Email");
        fireEvent.change(input_node, {target: {value: "testing"}});
        fireEvent.click(input_node);
        expect(component.getByPlaceholderText("Email")).toBeInDocument;
        
     })

     test('Valid Email input is placed on page ', () => {
        const component  = render(<MemoryRouter><ForgotPassowordPage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Email");
        fireEvent.change(input_node, {target: {value: "test@gmail.com"}});
       fireEvent.click(input_node);
       expect(component.getByPlaceholderText("Email")).toBeInDocument;
        
     })

     test('Search bar takes input correctly', () => {
        const component  = render(<MemoryRouter><SearchBar /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Search");
        fireEvent.change(input_node, {target: {value: "test"}});
       fireEvent.click(input_node);
       expect(component.getByPlaceholderText("Search")).toBeInDocument;
        
     })

     test('Search bar is palced on homepage', () => {
        const component  = render(<MemoryRouter><HomePage /></MemoryRouter>);
        const input_node = component.getByPlaceholderText("Search");
        fireEvent.change(input_node, {target: {value: "D"}});
      
       expect(input_node).toBeInDocument;
        
     })

     test('Category side bar is placed on homepage correctly', () => {
        const component  = render(<MemoryRouter><HomePage /></MemoryRouter>);
        const input_node = component.getByText("Categories");
       expect(input_node).toBeInDocument;
        
     })
     test('Category side bar works correctly', () => {
        const component  = render(<MemoryRouter><HomePage /></MemoryRouter>);      
       fireEvent.click(component.getByText("Dermatology"));
       expect(component.getByText("Dermatology")).toBeInDocument;
        
     })


})