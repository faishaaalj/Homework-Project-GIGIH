import React from "react";
import {screen, render} from "@testing-library/react";
import {Provider} from "react-redux"
import store from '../../store'
import SongInfo from './index'



describe('Render all Track Component', () => {
    render(<Provider store={store}><SongInfo /></Provider>)

    it ('Success render all element', ()=> {
        const cover = screen.getByTestId('track-img');
        const title = screen.getByTestId('track-title');
        const artist = screen.getByTestId('track-artist');
        const select = screen.getByTestId('track-select');

        expect(cover).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(artist).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        

    });
})