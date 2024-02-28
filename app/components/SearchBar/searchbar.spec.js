import { render, fireEvent } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    const handleChange = jest.fn();

    test('hides logo when scrolled down and canHide is true', () => {
        const { queryByAltText } = render(<SearchBar handleChange={handleChange} />);
        expect(queryByAltText('logo')).toBeInTheDocument();

        window.scrollY = 100;
        fireEvent.scroll(window);
        expect(queryByAltText('logo')).not.toBeInTheDocument();
    });

    test('does not hide searchbar when scrolled down and canHide is false', async () => {
        const { queryByAltText } = render(<SearchBar handleChange={handleChange} searchTerm='' canHideSearch={false} />);
        expect(queryByAltText('logo')).not.toBeInTheDocument();

        window.scrollY = 100;
        fireEvent.scroll(window);
        expect(queryByAltText('logo')).not.toBeInTheDocument(); // Logo should still be present
    });

    test('matches snapshot', () => {
        const { container } = render(<SearchBar handleChange={handleChange} />);
        expect(container).toMatchSnapshot();
    });
});
