import { useState, useEffect } from 'react';
import styles from './searchbar.module.css';
import Image from 'next/image';

type SearchBarProps = {
    handleChange: (searchTerm: string) => void
    searchTerm: string
    canHide?: boolean
}
const SearchBar = ({ handleChange, searchTerm, canHide = true }: SearchBarProps) => {
    const [isAtTop, setIsAtTop] = useState(true);
    console.log('isAtTop', isAtTop)
    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsAtTop(scrollTop === 0);
        }

        // Listen to scroll events
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={styles.searchbar__wrapper}>
            <div className={styles.searchbar__container}>
                {isAtTop && canHide ? <Image alt='logo' className={styles.searchbar__logo} width={275} height={48} src='/logo.webp'></Image> : <><div className={styles.searchbar__icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1.3em" height="1.3em" data-testid="search-icon">
                        <title>search-icon</title>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.05} d="M11 19.004a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21.002l-4.35-4.35"></path>
                    </svg>
                </div>
                    <input
                        type="text"
                        placeholder="Search your destination"
                        value={searchTerm}
                        onChange={e => handleChange(e.target.value)}
                        className={styles.searchbar__input}
                    />
                    <button type="button" className={styles.search__button} >
                        Search
                    </button></>}

            </div>
        </div>
    )
}

export default SearchBar