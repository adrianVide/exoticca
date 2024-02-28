import { render } from '@testing-library/react';
import SectionTag from './SectionTag';

describe('SectionTag component', () => {
    test('renders correct text when isMultiCountry and isRecommended are true', () => {
        const { getByText } = render(<SectionTag country="France" isMultiCountry={true} isRecommended={true} />);
        expect(getByText('Our recommendation to visit France and neighboring countries')).toBeInTheDocument();
    });

    test('renders correct text when isMultiCountry is true and isRecommended is false', () => {
        const { getByText } = render(<SectionTag country="Italy" isMultiCountry={true} />);
        expect(getByText('Multi country vacation packages including Italy')).toBeInTheDocument();
    });

    test('renders correct text when isMultiCountry is false and isRecommended is true', () => {
        const { getByText } = render(<SectionTag country="Spain" isMultiCountry={false} isRecommended={true} />);
        expect(getByText('Our recommendation to visit Spain')).toBeInTheDocument();
    });

    test('renders correct text when isMultiCountry and isRecommended are false', () => {
        const { getByText } = render(<SectionTag country="Greece" isMultiCountry={false} />);
        expect(getByText('Popular vacation packages including Greece')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { container } = render(<SectionTag country="Greece" isMultiCountry={false} />);
        expect(container).toMatchSnapshot();
    });
});
