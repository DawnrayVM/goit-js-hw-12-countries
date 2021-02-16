import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import './sass/styles.scss';
import { alert, notice, info, success, error } from '@pnotify/core';
import { defaultModules } from '@pnotify/core';
// import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';

// import * as Confirm from '@pnotify/confirm';
// import '@pnotify/confirm/dist/PNotifyConfirm.css';

import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import countryCard from '../src/templates/country-card.hbs';
import countryList from '../src/templates/country-list.hbs';
// import fetchCountry from './js/fetchCountries.js';
const debounce = require('lodash.debounce');

// defaultModules.set(Material);

const refs = {
  queryString: document.querySelector('.js-input'),
  card: document.querySelector('.country-card'),
};

function resetQuery() {
  refs.card.innerHTML = '';
  return;
}

refs.queryString.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const query = refs.queryString.value;
    if (query) {
      fetch(`https://restcountries.eu/rest/v2/name/${query}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 1 && data.length <= 10) {
            resetQuery();
            console.log(data);
            const countryArray = data.map(country => {
              return country;
            });
            console.log(countryArray);
            refs.card.insertAdjacentHTML(
              'beforeend',
              countryList(countryArray),
            );
          } else {
            const country = data.map(country => {
              return countryCard(country);
            });
            resetQuery();
            refs.card.insertAdjacentHTML('beforeend', country);
          }
        })
        .catch(
          er => resetQuery(),
          alert({
            title: "Can't find such country!",
          }),
        );
    }
  }, 500),
);
