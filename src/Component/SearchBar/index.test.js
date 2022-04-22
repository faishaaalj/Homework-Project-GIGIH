import React from "react";
import {screen, render} from "@testing-library/react";
import {Provider} from "react-redux"
import store from '../../store'
import SearchBar from './index'
import userEvent from '@testing-library/user-event'

describe('Render all SearchBar Component', () => {
    render(<Provider store={store}> <SearchBar /></Provider>)

    it ('Success render all element and input text', ()=> {
        const search = screen.getByTestId('input-search');
        const button = screen.getByTestId('button-search');

        userEvent.type(search, 'runaway');
        
        expect(search).toBeInTheDocument();
        expect(search).toHaveValue('runaway');
        expect(button).toBeInTheDocument();
        

    });
    

    
});



