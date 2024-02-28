import { useState, useEffect } from 'react';
import styles from './searchbar.module.css';
import Image from 'next/image';

type SearchBarProps = {
    handleSearch: (searchTerm: string) => void
    searchTerm: string
    isSearching?: boolean
}

const SearchBar = ({ handleSearch, isSearching = false }: SearchBarProps) => {
    const [isAtTop, setIsAtTop] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setIsAtTop(scrollTop === 0);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSendSearch = () => {
        handleSearch(searchTerm);
    }
    const handleClear = () => {
        setSearchTerm('');
        handleSearch('');
    }
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendSearch();
        }
        if (event.key === 'Escape') {
            handleClear();
        }
    };

    return (
        <div className={styles.searchbar__wrapper}>
            <div className={styles.searchbar__container}>
                {isAtTop && isSearching
                    ? <Image alt='logo' className={styles.searchbar__logo} width={275} height={48} src='/logo.webp'></Image>
                    :
                    <>
                        <div className={styles.searchbar__icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1.3em" height="1.3em" data-testid="search-icon">
                                <title>search-icon</title>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.05} d="M11 19.004a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21.002l-4.35-4.35"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search your destination"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={onKeyDown}
                            className={styles.searchbar__input}
                        />
                        <button type="button" className={styles.search__button} onClick={isSearching ? handleSendSearch : handleClear}>
                            {isSearching ? 'Search' : 'X'}
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default SearchBar;
