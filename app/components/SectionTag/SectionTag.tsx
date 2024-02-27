import React from 'react'
import styles from './sectiontag.module.css'

type SectionTagProps = {
    country: string;
    isMultiCountry: boolean;
    isRecommended?: boolean;
}
const SectionTag = ({ country, isMultiCountry, isRecommended = false }: SectionTagProps) => {
    if (isMultiCountry && isRecommended) {
        return (
            <div className={styles.sectiontag}>Our recommendation to visit {country} and neighboring countries</div>
        )
    }
    if (isMultiCountry && !isRecommended) {
        return (
            <div className={styles.sectiontag}>Multi country vacation packages including {country}</div>
        )
    }
    if (!isMultiCountry && isRecommended) {
        return (
            <div className={styles.sectiontag}>Our recommendation to visit {country}</div>
        )
    }
    if (!isMultiCountry && !isRecommended) {
        return (
            <div className={styles.sectiontag}>Popular vacation packages including {country}</div>
        )
    }
}

export default SectionTag