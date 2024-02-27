 // Recursive function to check if any value in the object or its nested objects matches the search term
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

// Function to filter destinations based on the search term
export const filterDestinations = (term: string, destinations) => {
    // Determine if the term is a number or a string
    const parsedTerm = isNaN(Number(term)) ? term : Number(term);

    // Concatenate all destination arrays into one array
    const allDestinations = destinations.featuredMonoMarket
        .concat(destinations.featuredMultiMarket)
        .concat(destinations.monoMarket)
        .concat(destinations.multiMarket);

    return allDestinations.filter((destination: any) => {
        return containsTerm(destination, parsedTerm);
    });
};