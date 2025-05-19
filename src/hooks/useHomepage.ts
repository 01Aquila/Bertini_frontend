import { useEffect, useState } from 'react';

interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: { url: string };
  featuredProducts: {
    name: string;
    price: string;
    description: string;
    image: { url: string };
  }[];
  // Define all the other fields similarly...
}

export const useHomepage = () => {
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    async function fetchHomepage() {
      const res = await fetch('https://bertini-backend.vercel.app/api/globals/homepage');
      console.log(res)
      const json = await res.json();
      setData(json);
    }

    fetchHomepage();
  }, []);

  return data;
};
