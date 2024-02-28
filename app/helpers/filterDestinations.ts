import { destination } from '../types/types';

type destinations = {
    featuredMonoMarket: destination[];
    featuredMultiMarket: destination[];
    monoMarket: destination[];
    multiMarket: destination[];
}

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

export const filterDestinations = (term: string, destinations: destinations) => {
    const parsedTerm = isNaN(Number(term)) ? term : Number(term);

    const allDestinations = destinations.featuredMonoMarket
        .concat(destinations.featuredMultiMarket)
        .concat(destinations.monoMarket)
        .concat(destinations.multiMarket);

    return allDestinations.filter((destination: destination) => {
        return containsTerm(destination, parsedTerm);
    });
};