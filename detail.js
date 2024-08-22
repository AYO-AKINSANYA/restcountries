const countryDetail = document.getElementById("countryDetail");
const toggleDarkMode = document.getElementById("toggleDarkMode");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const countryName = urlParams.get("country");

async function fetchCountryDetail() {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const country = await response.json();
  displayCountryDetail(country[0]);
}

function displayCountryDetail(country) {
  const nativeNames = country.name.nativeName;
  const nativeName = nativeNames ? Object.values(nativeNames)[0].common : "N/A";

  countryDetail.innerHTML = `
   <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <h2>${country.name.common}</h2>
         <p><strong>Native Name:</strong> ${nativeName}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "N/A"
        }</p>
        <p><strong>Top Level Domain:</strong> ${country.tld}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(
          ", "
        )}</p>
        <h3>Border Countries:</h3>
        <div id="borders"></div>
    `;
  displayBorderCountries(country.borders);
}

async function displayBorderCountries(borders) {
  const bordersDiv = document.getElementById("borders");
  if (!borders) {
    bordersDiv.innerHTML = `<p>No border countries available</p>`;
    return;
  }
  const borderCountries = await Promise.all(
    borders.map(async (border) => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
      const country = await res.json();
      return country[0].name.common;
    })
  );

  bordersDiv.innerHTML = borderCountries
    .map((name) => `<a href="detail.html?country=${name}">${name}</a>`)
    .join(", ");
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

toggleDarkMode.addEventListener("click", toggleMode);

fetchCountryDetail();
