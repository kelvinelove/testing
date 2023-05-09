import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';

interface Country {
  name: string;
  code: string;
}

interface HomeProps {
  countries: Country[];
}

export default function Home({ countries }: HomeProps) {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>List of Countries</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.code}>
            {country.name} ({country.code})
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();

  const countries = data.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
  }));

  return {
    props: {
      countries,
    },
  };
};
