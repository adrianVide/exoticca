'use client'
import { useState } from 'react';
import SectionTag from './components/SectionTag/SectionTag';

const HomeClient = ({ data }: any) => {
    const [destinations, setDestinations] = useState(data.destinations);
    const [searchTerm, setSearchTerm] = useState('');

    const containsTerm = (obj: any, term: string | number): boolean => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (containsTerm(obj[key], term)) {
                    return true;
                }
            } else if (typeof term === 'string' && typeof obj[key] === 'string' && obj[key].toLowerCase().includes(term.toLowerCase())) {
                return true;
            } else if (typeof term === 'number' && typeof obj[key] === 'number' && obj[key] === term) {
                return true;
            }
        }
        return false;
    };

    const filterDestinations = (term: string) => {
        const parsedTerm = isNaN(Number(term)) ? term : Number(term);

        const allDestinations = destinations.featuredMonoMarket
            .concat(destinations.featuredMultiMarket)
            .concat(destinations.monoMarket)
            .concat(destinations.multiMarket);

        return allDestinations.filter((destination: any) => {
            return containsTerm(destination, parsedTerm);
        });
    };

    console.log(destinations);
    console.log(data);

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {filterDestinations(searchTerm).map((destination: any) => (
                <div key={destination.id}>{destination.title}</div>
            ))}
        </>
    );
}

export default HomeClient;

