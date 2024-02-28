import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeClient from './PageClient';

const mockData = {
    country: 'MockCountry',
    destinations: {
        featuredMonoMarket: [],
        featuredMultiMarket: [{
            id: '1',
            title: 'Test Title',
            destination: 'Test Destination',
            days: 5,
            headLine: "recommended",
            images: [
                {
                    desktop: 'test-desktop.jpg',
                    mobile: 'test-mobile.jpg',
                    tablet: 'test-tablet.jpg'
                }
            ],
            highlights: [{ title: 'Highlight 1' }, { title: 'Highlight 2' }],
            includes: ['Include 1', 'Include 2'],
            tags: [
                { alias: 'tag1', name: 'Tag 1' },
                { alias: 'tag2', name: 'Tag 2' }
            ],
            priceDetail: {
                fromPriceBeautify: '$100',
                oldPriceBeautify: '$120',
                pricingPercentage: 10,
                pricePerNight: '$20'
            }
        }],
        monoMarket: [],
        multiMarket: [],
    },
};

describe('HomeClient component', () => {
    test('renders without crashing with no packages data', () => {
        render(<HomeClient data={mockData} />);
    });

    test('renders SectionTag and Card components correctly with provided featured multimarket data', () => {
        const { getByText } = render(<HomeClient data={mockData} />);

        expect(getByText(`Our recommendation to visit ${mockData.country} and neighboring countries`)).toBeInTheDocument();
        expect(getByText('Test Title')).toBeInTheDocument();
    });

    test('renders SectionTag and Card components correctly with provided featured multimarket data', () => {
        const noFeaturedMarketMockData = {
            ...mockData,
            destinations: {
                ...mockData.destinations,
                multiMarket: [{
                    id: '1',
                    title: 'Test Title',
                    destination: 'Test Destination',
                    days: 5,
                    images: [
                        {
                            desktop: 'test-desktop.jpg',
                            mobile: 'test-mobile.jpg',
                            tablet: 'test-tablet.jpg'
                        }
                    ],
                    highlights: [{ title: 'Highlight 1' }, { title: 'Highlight 2' }],
                    includes: ['Include 1', 'Include 2'],
                    tags: [
                        { alias: 'tag1', name: 'Tag 1' },
                        { alias: 'tag2', name: 'Tag 2' }
                    ],
                    priceDetail: {
                        fromPriceBeautify: '$100',
                        oldPriceBeautify: '$120',
                        pricingPercentage: 10,
                        pricePerNight: '$20'
                    }
                }]
            }
        }
        const { getByText } = render(<HomeClient data={noFeaturedMarketMockData} />);

        expect(getByText(`Multi country vacation packages including ${mockData.country}`)).toBeInTheDocument();
    });
});
