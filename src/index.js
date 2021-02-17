import './sass/styles.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
require('typeface-roboto');
import { notice, error } from '@pnotify/core/dist/PNotify.js';
const { defaults } = require('@pnotify/core');
defaults.styling = 'material';
defaults.icons = 'material';
defaults.mode = 'light';
defaults.delay = '1500';
const debounce = require('lodash.debounce');
import fetchCountries from './js/fetchCountries';
import countryCard from '../src/templates/country-card.hbs';
import countryList from '../src/templates/country-list.hbs';

const refs = {
  queryString: document.querySelector('.js-input'),
  card: document.querySelector('.country-card'),
};

function resetTemplate() {
  refs.card.innerHTML = '';
  return;
}

function countryListRenderer(data) {
  const countries = data.map(country => {
    return country;
  });
  refs.card.insertAdjacentHTML('beforeend', countryList(countries));
}

function countyCardRenderer(data) {
  refs.card.insertAdjacentHTML('beforeend', countryCard(data[0]));
}

function renderCountryMarkup(data) {
  //if array has more then 10 items
  if (data.length > 10) {
    notice({
      title: 'Sorry!',
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
  //if array has 2-10 items
  else if (data.length > 1 && data.length <= 10) {
    countryListRenderer(data);
  }
  // if array has 1 item
  else if (data.length === 1) {
    countyCardRenderer(data);
  } else {
    error({
      title: 'Oops...!',
      text: "Can't find that country",
    });
  }
}

refs.queryString.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    resetTemplate();
    const query = event.target.value;
    if (query) {
      fetchCountries(query).then(renderCountryMarkup).catch(console.log);
    }
  }, 500),
);
