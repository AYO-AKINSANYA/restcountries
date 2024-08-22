const API_URL = "https://restcountries.com/v3.1/all";
const countryList = document.getElementById("countryList");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const toggleDarkMode = document.getElementById("toggleDarkMode");
let countriesData = [];

async function fetchCountries() {
  const response = await fetch(API_URL);
  const countries = await response.json();
  countriesData = countries;
  displayCountries(countries);
}

function displayCountries(countries) {
  countryList.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");
    countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${
      country.name.common
    }">
            <div>
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${
                  country.capital ? country.capital[0] : "N/A"
                }</p>
            </div>
        `;
    countryCard.addEventListener("click", () => {
      window.location.href = `detail.html?country=${country.name.common}`;
    });
    countryList.appendChild(countryCard);
  });
}

function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase();
  const region = regionFilter.value;
  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm);
    const matchesRegion = region === "all" || country.region === region;
    return matchesSearch && matchesRegion;
  });
  displayCountries(filteredCountries);
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
toggleDarkMode.addEventListener("click", toggleMode);

fetchCountries();
