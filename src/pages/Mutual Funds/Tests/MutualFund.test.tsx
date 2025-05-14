import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MutualFund from '../MutalFund';
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

describe('MutualFund Component', () => {
  it('renders without crashing', () => {
    let router = createMemoryRouter(createRoutesFromElements(<Route path='/fund/:id' element={<MutualFund />}/>))    
    let {container}= render(<RouterProvider router={router}/>);
    expect(container).toBeInTheDocument();
  });

});