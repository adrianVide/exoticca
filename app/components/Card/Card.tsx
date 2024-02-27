
import Image from 'next/image';
import styles from './card.module.css';

type image = {
    desktop: string;
    mobile: string;
    tablet: string;
}
type highlight = {
    title: string;
}
type tag = {
    alias: string;
    name: string;
}
type priceDetail = {
    fromPriceBeautify: string;
    oldPriceBeautify: string;
    pricingPercentage: number;
    pricePerNight: string;
}
interface CardProps {
    card: {
        id: string;
        title: string;
        destination: string;
        days: number;
        images: image[];
        highlights: highlight[];
        includes: string[];
        tags: tag[];
        priceDetail: priceDetail;
    }
}

const Card = ({ card }: CardProps) => {
    const { id, title, destination, days, images, highlights, includes, tags, priceDetail } = card;

    const getHighlights = () => {
        const highlight = (title: string) => <div key={title}><Image alt='pin' width={15} height={15} src='/map.svg'></Image> {title}</div>;
        const remainingHighlights = highlights.length > 4 ? highlights.length - 4 : 0;

        if (highlights.length > 4) {
            const highlightedItems = highlights.slice(0, 4).map((highlightItem) => highlight(highlightItem.title));
            if (remainingHighlights > 0) {
                highlightedItems.push(<div>+ {remainingHighlights} more</div>);
            }
            return highlightedItems;
        }
        return highlights.map((highlightItem) => highlight(highlightItem.title));
    }

    const getIncludes = () => {
        const include = (title: string) => {
            const lowercaseTitle = title.toLowerCase();
            const formattedTitle = lowercaseTitle.charAt(0).toUpperCase() + lowercaseTitle.slice(1);
            const replacedTitle = formattedTitle.replace(/_/g, ' ');
            return <div key={title}><Image alt={title} width={15} height={15} src={`/${title}.svg`}></Image> {replacedTitle}</div>;
        };
        return includes.map(include);
    }

    const getTags = () => {
        const soloTravelerTag = tags.find(tag => tag.name === "Solo Traveler");
        const filteredTags = tags.filter(tag => tag.name !== "Solo Traveler");
        const tagSpans = filteredTags.map(tag => {
            if (tag.name === "PROMOTED") {
                return null;
            } else {
                return <span key={tag.alias} className={styles.card__features_tag}>{tag.name}</span>;
            }
        });
    
        const soloTravelerSpan = soloTravelerTag ? (
            <span key={soloTravelerTag.alias} className={`${styles.card__features_tag} ${styles.card__features_outlined}`}>
               <Image alt='solo traveller' width={15} height={15} src='/SOLO_TRAVELLER.svg'></Image> {soloTravelerTag.name.toLocaleUpperCase()}
            </span>
        ) : null;
    
        return (
            <>
                <span className={`${styles.card__features_tag} ${styles.card__features_outlined}`}>GROUP TOURS</span>
                {soloTravelerSpan}
                {tagSpans}
            </>
        );
    }
    return (
        <div className={styles.card__container} key={id}>
            <img className={styles.card__image} src={images[0].desktop} alt={title} />
            <div className={styles.card__content}>
                <div className={styles.card__left}>
                    <h3 className={styles.card__destination_days}>{`${destination} in ${days}`}</h3>
                    <h4 className={styles.card__title}>{title}</h4>
                    <div className={styles.card__features_container}>
                        <div className={styles.card__features_highlights}>{getHighlights()}</div>
                        <div className={styles.card__features_highlights}>{getIncludes()}</div>
                    </div>
                    <div className={styles.card__features_tags}>{getTags()}</div>
                </div>

                <div className={styles.card__right}>
                        <div className={styles.card__prices_percentage}>- {priceDetail.pricingPercentage} %</div>
                    <div className={styles.card__prices}>
                        <div className={styles.card__prices_oldNight}>From <span className={styles.card__prices_oldNumber}>{priceDetail.oldPriceBeautify}</span></div>
                        <div className={styles.card__prices_new}>{priceDetail.fromPriceBeautify}</div>
                        <div className={styles.card__prices_oldNight}>Per night: {priceDetail.pricePerNight}</div>
                    </div>
                    <button className={styles.card__button}>See trip</button>
                </div>
            </div>
        </div >
    );
};

export default Card;
