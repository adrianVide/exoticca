'use client'
import { useState } from 'react';
import { filterDestinations } from './helpers/filterDestinations';
import SectionTag from './components/SectionTag/SectionTag';
import SearchBar from './components/SearchBar/SearchBar';
import Card from './components/Card/Card';
import styles from './pageclient.module.css'

const HomeClient = ({ data }: any) => {
    const [destinations, setDestinations] = useState(data.destinations);
    const [searchTerm, setSearchTerm] = useState('');

    const noFilter = <>
        {destinations.featuredMonoMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={false} isRecommended={!!destinations.featuredMonoMarket[0].headLine} />}
        {destinations.featuredMonoMarket.map((destination: any) => <Card card={destination} />)}
        {destinations.featuredMultiMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={true} isRecommended={!!destinations.featuredMultiMarket[0].headLine} />}
        {destinations.featuredMultiMarket.map((destination: any) => <Card card={destination} />)}
        {destinations.monoMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={false} isRecommended={!!destinations.monoMarket[0].headLine} />}
        {destinations.monoMarket.map((destination: any) => <Card card={destination} />)}
        {destinations.multiMarket.length > 0 && <SectionTag country={data.country} isMultiCountry={true} isRecommended={!!destinations.multiMarket[0].headLine} />}
        {destinations.multiMarket.map((destination: any) => <Card card={destination} />)}
    </>

    return (
        <>

            <SearchBar searchTerm={searchTerm} handleChange={setSearchTerm} canHide={searchTerm === ''}/>
            <div className={styles.wrapper}>
                {searchTerm.length > 0
                    ?
                    filterDestinations(searchTerm, destinations).map((destination: any) => <Card card={destination} />)
                    :
                    noFilter}</div>

        </>

    );
}

export default HomeClient;

