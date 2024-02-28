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
        {destinations.featuredMonoMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={false} isRecommended={!!destinations.featuredMonoMarket[0].headLine} />}
        {destinations.featuredMonoMarket.map((destination: destination) => <Card card={destination} />)}
        {destinations.featuredMultiMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={true} isRecommended={!!destinations.featuredMultiMarket[0].headLine} />}
        {destinations.featuredMultiMarket.map((destination: destination) => <Card card={destination} />)}
        {destinations.monoMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={false} isRecommended={!!destinations.monoMarket[0].headLine} />}
        {destinations.monoMarket.map((destination: destination) => <Card card={destination} />)}
        {destinations.multiMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={true} isRecommended={!!destinations.multiMarket[0].headLine} />}
        {destinations.multiMarket.map((destination: destination) => <Card card={destination} />)}
    </>

    return (
        <>

            <SearchBar searchTerm={searchTerm} handleChange={setSearchTerm} canHideSearch={searchTerm === ''}/>
            <div className={styles.wrapper}>
                {searchTerm.length > 0
                    ?
                    filterDestinations(searchTerm, destinations).map((destination: destination) => <Card card={destination} />)
                    :
                    noFilter}</div>

        </>

    );
}

export default HomeClient;

