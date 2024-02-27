'use client'
import { useState } from 'react';
import { filterDestinations } from './helpers/filterDestinations';
import SectionTag from './components/SectionTag/SectionTag';
import SearchBar from './components/SearchBar/SearchBar';

const HomeClient = ({ data }: any) => {
    const [destinations, setDestinations] = useState(data.destinations);
    const [searchTerm, setSearchTerm] = useState('');



    const noFilter = <>
        {destinations.featuredMonoMarket.map((destination: any) => destination.title)}
        {destinations.featuredMultiMarket.map((destination: any) => destination.title)}
        {destinations.monoMarket.map((destination: any) => destination.title)}
        {destinations.multiMarket.map((destination: any) => destination.title)}
    </>

    const mag =
        <div className="sc-bBABsx iSAuFU">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" data-testid="search-icon">
                <title>search-icon</title>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.05} d="M11 19.004a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21.002l-4.35-4.35"></path>
            </svg>
        </div>
    return (
        <>

            <SearchBar searchTerm={searchTerm} handleChange={setSearchTerm} />

            {searchTerm.length > 0
                ?
                filterDestinations(searchTerm, destinations).map((destination: any) => (
                    <div key={destination.id}>{destination.title}</div>
                ))
                :
                noFilter}
        </>

    );
}

export default HomeClient;

