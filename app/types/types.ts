export type image = {
    desktop: string;
    mobile: string;
    tablet: string;
}

export type highlight = {
    title: string;
}

export type tag = {
    alias: string;
    name: string;
}

export type priceDetail = {
    fromPriceBeautify: string;
    oldPriceBeautify: string;
    pricingPercentage: number;
    pricePerNight: string;
}

export type destination = {
    id: string;
    title: string;
    destination: string;
    days: number;
    headLine: string;
    images: {
        desktop: string;
        mobile: string;
        tablet: string;
    }[];
    highlights: { title: string }[];
    includes: string[];
    tags: { alias: string; name: string }[];
    priceDetail: {
        fromPriceBeautify: string;
        oldPriceBeautify: string;
        pricingPercentage: number;
        pricePerNight: string;
    };
};