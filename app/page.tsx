import HomeClient from './PageClient';

export default async function Home() {
  const response = await fetch(`https://api-us.exoticca.com/api/landing/v2/country/botswana`);

  if (!response.ok) {
    throw new Error('Fetch Error');
  }
  const data = await response.json();
  return <HomeClient data={data} />;
}
