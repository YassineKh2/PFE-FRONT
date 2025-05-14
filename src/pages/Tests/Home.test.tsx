import { render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {describe,expect,it} from 'vitest'
import HomePage from '../Home';


describe('IndexPage Component', () => {
  it('renders the title', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(/Search a Mutual Fund/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const subtitleElement = screen.getByText(/All in one place/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const searchInput = screen.getByLabelText(/Search a mutual fund/i);
    expect(searchInput).toBeInTheDocument();
  });

    it('renders the autocomplete items', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const autocompleteItems = screen.getAllByRole('listitem');
        expect(autocompleteItems.length).toBeGreaterThan(0);
    });

    it('selects an autocomplete item', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const searchInput = screen.getByLabelText(/Search a mutual fund/i);
        fireEvent.change(searchInput, { target: { value: 'Fund' } });

        const autocompleteItem = screen.getByText(/Fund/i);
        fireEvent.click(autocompleteItem);

        expect(searchInput).toHaveValue('Fund');
    });
});

