import './sass/styles.scss';
import countryCard from '../src/templates/country-card.hbs';
import './js/fetchCountries.js';
const debounce = require('lodash.debounce');

const refs = {
  form: document.querySelector('.js-form'),
  input: document.querySelector('input[data-action="input"]'),
  findBtn: document.querySelector('button[data-action="find"]'),
  card: document.querySelector('.country-card'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const countryToFind = refs.input.value;
  fetch(`https://restcountries.eu/rest/v2/name/${countryToFind}`)
    .then(res => res.json())
    .then(data => {
      let [country] = data;
      console.log(country);
      const markup = countryCard(country);
      refs.card.insertAdjacentHTML('beforeend', markup);
    });
});
