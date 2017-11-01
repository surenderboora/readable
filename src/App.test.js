import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { get_unique_id } from '.'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('Generate string of length 20', () => {
    const id = get_unique_id();
    expect(id.length).toEqual(20);
})