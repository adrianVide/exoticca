'use client'
import { useState } from 'react';
import { filterDestinations } from './helpers/filterDestinations';
import SectionTag from './components/SectionTag/SectionTag';
import SearchBar from './components/SearchBar/SearchBar';
import Card from './components/Card/Card';
import styles from './pageclient.module.css'
import { destination } from './types/types';

type HomeClientProps = {
    data: {
        destinations: {
            featuredMonoMarket: destination[];
            featuredMultiMarket: destination[];
            monoMarket: destination[];
            multiMarket: destination[];
        };
        country: string;
    };
}

const HomeClient = ({ data }: HomeClientProps) => {
    const [destinations, setDestinations] = useState(data.destinations);
    const [searchTerm, setSearchTerm] = useState('');
    const noFilter = <>
        {Object.entries(destinations).map(([type, destinationsList]) => (
            destinationsList.length > 0 && (
                <>
                    <SectionTag
                        country={data.country}
                        isMultiCountry={type.includes('ulti')}
                        isRecommended={destinationsList[0].headLine === "recommended"}
                    />
                    {destinationsList.map((destination) => (
                        <Card key={destination.id} card={destination} />
                    ))}
                </>
            )
        ))}
    </>

    return (
        <>

            <SearchBar searchTerm={searchTerm} handleSearch={setSearchTerm} isSearching={searchTerm === ''} />
            <div className={styles.wrapper}>
                {searchTerm.length > 0
                    ?
                    filterDestinations(searchTerm, destinations).map((destination: destination) => <Card key={destination.id} card={destination} />)
                    :
                    noFilter}</div>

        </>

    );
}

export default HomeClient;

