import { render } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
    const mockCardData = {
        id: '1',
        title: 'Test Title',
        destination: 'Test Destination',
        days: 5,
        images: [{ desktop: 'test-desktop.jpg', mobile: 'test-mobile.jpg', tablet: 'test-tablet.jpg' }],
        highlights: [{ title: 'Highlight 1' }, { title: 'Highlight 2' }],
        includes: ['Include 1', 'Include 2'],
        tags: [{ alias: 'tag1', name: 'Tag 1' }, { alias: 'tag2', name: 'Tag 2' }],
        priceDetail: { fromPriceBeautify: '$100', oldPriceBeautify: '$120', pricingPercentage: 10, pricePerNight: '$20' }
    };

    test('renders correctly with given props', () => {
        const { getByText, getByAltText } = render(<Card card={mockCardData} />);

        expect(getByText('Test Destination in 5')).toBeInTheDocument();
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByAltText('Include 1')).toBeInTheDocument();
        expect(getByText('Tag 1')).toBeInTheDocument();
        expect(getByText('- 10 %')).toBeInTheDocument();
        expect(getByText('$120')).toBeInTheDocument();
        expect(getByText('$100')).toBeInTheDocument();
        expect(getByText('Per night: $20')).toBeInTheDocument();
    });

    test('renders correct number of highlights and includes', () => {
       render(<Card card={mockCardData} />);
    
        const { highlights, includes } = mockCardData;
    
        expect(highlights.length).toBe(2);
        expect(includes.length).toBe(2); 
    });

    test('button is present', () => {
        const { getByText } = render(<Card card={mockCardData} />);
        expect(getByText('See trip')).toBeInTheDocument();

    });

    test('matches snapshot', () => {
        const { container } = render(<Card card={mockCardData} />);
        expect(container).toMatchSnapshot();
    });
});
