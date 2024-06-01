document.addEventListener('DOMContentLoaded', () => {
    const countryList = document.getElementById('countryList');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('regionFilter');
    const toggleThemeButton = document.getElementById('toggleTheme');

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) {
                throw new Error('Failed to fetch country data');
            }
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const displayCountries = (countries) => {
        countryList.innerHTML = countries.map(country => `
            <div class="country-card" onclick="location.href='details.html?country=${country.cca3}'">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <div class="country-info">
                    <h2>Country: ${country.name.common}</h2>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            </div>
        `).join('');
    };

    const searchCountries = async (searchTerm) => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) {
                throw new Error('Failed to fetch country data');
            }
            const countries = await response.json();
            const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
            displayCountries(filteredCountries);
        } catch (error) {
            console.error('Error searching countries:', error);
        }
    };

    const filterCountriesByRegion = async (region) => {
        try {
            const url = region ? `https://restcountries.com/v3.1/region/${region}` : 'https://restcountries.com/v3.1/all';
            console.log('Fetching URL:', url); 
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch country data');
            }
            const countries = await response.json();
            displayCountries(countries);
        } catch (error) {
            console.error('Error filtering countries:', error);
        }
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchCountries(searchTerm);
    });

    regionFilter.addEventListener('change', (e) => {
        const region = e.target.value;
        filterCountriesByRegion(region);
    });

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    fetchCountries();
});