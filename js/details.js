//details javascript code
document.addEventListener('DOMContentLoaded', async () => {
    const toggleThemeButton = document.getElementById('toggleTheme');
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('country');

    const fetchCountryDetails = async (countryId) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
            const [country] = await response.json();
            displayCountryDetails(country);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    };
//getting details id
    const displayCountryDetails = (country) => {
        document.getElementById('countryFlag').src = country.flags.svg;
        document.getElementById('countryName').textContent =  country.name.common;
        document.getElementById('countryPopulation').textContent = country.population.toLocaleString();
        document.getElementById('countryRegion').textContent = country.region;
        document.getElementById('countrySubRegion').textContent = country.subregion;
        document.getElementById('countryCapital').textContent = country.capital ? country.capital[0] : 'N/A';
        document.getElementById('countryTld').textContent = country.tld.join(', ');
        document.getElementById('countryCurrencies').textContent = Object.values(country.currencies).map(c => c.name).join(', ');
        document.getElementById('countryLanguages').textContent = Object.values(country.languages).join(', ');

        const borderCountries = country.borders || [];
        const borderCountriesContainer = document.getElementById('borderCountries');
        borderCountriesContainer.innerHTML = borderCountries.length ? '' : 'None';

        borderCountries.forEach(async (borderCountryCode) => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch border country');
                }
                const [borderCountry] = await response.json();
                const borderButton = document.createElement('button');
                borderButton.textContent = borderCountry.name.common;
                borderButton.classList.add('border-country-button');
                borderButton.onclick = () => {
                    window.location.href = `details.html?country=${borderCountry.cca3}`;
                };
                borderCountriesContainer.appendChild(borderButton);
            } catch (error) {
                console.error('Error fetching border country:', error);
            }
        });
    };

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    fetchCountryDetails(countryId);
});

document.addEventListener('DOMContentLoaded', async () => {
    const toggleThemeButton = document.getElementById('toggleTheme');
    const params = new URLSearchParams(window.location.search);
    const countryId = params.get('country');
    //fetching the details api
    const fetchCountryDetails = async (countryId) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch country details');
            }
            const country = await response.json();
            displayCountryDetails(country);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    };
    //displaying country details
    const displayCountryDetails = (country) => {
        const countryData = country[0];
        document.getElementById('countryFlag').src = countryData.flags.svg;
        document.getElementById('countryName').textContent = countryData.name.common;
        document.getElementById('countryPopulation').textContent = countryData.population.toLocaleString();
        document.getElementById('countryRegion').textContent = countryData.region;
        document.getElementById('countrySubRegion').textContent = countryData.subregion;
        document.getElementById('countryCapital').textContent = countryData.capital ? countryData.capital[0] : 'N/A';
        document.getElementById('countryTld').textContent = countryData.tld.join(', ');
        document.getElementById('countryCurrencies').textContent = Object.values(countryData.currencies).map(c => c.name).join(', ');
        document.getElementById('countryLanguages').textContent = Object.values(countryData.languages).join(', ');

        const borderCountries = countryData.borders || [];
        const borderCountriesContainer = document.getElementById('borderCountries');
        borderCountriesContainer.innerHTML = borderCountries.length ? '' : 'None';

        borderCountries.forEach(async (borderCountryCode) => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch border country');
                }
                const borderCountry = await response.json();
                const borderButton = document.createElement('button');
                borderButton.textContent = borderCountry[0].name.common;
                borderButton.classList.add('border-country-button');
                borderButton.onclick = () => {
                    window.location.href = `details.html?country=${borderCountry[0].cca3}`;
                };
                borderCountriesContainer.appendChild(borderButton);
            } catch (error) {
                console.error('Error fetching border country:', error);
            }
        });
    };

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    fetchCountryDetails(countryId);
});
