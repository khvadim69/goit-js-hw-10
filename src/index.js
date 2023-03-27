import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const boxEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const handleSearchCountry = event => {
  let valueInput = event.target.value.toLowerCase().trim();
  if (valueInput === '') {
    return (listEl.innerHTML = ''), (infoEl.innerHTML = '');
  }
  fetchCountries(valueInput)
    .then(makeCountry)
    .catch(err => {
      Notiflix.Notify.warning('Oops, there is no country with that name');
    });
};

const debounceFunction = debounce(handleSearchCountry, DEBOUNCE_DELAY);

boxEl.addEventListener('input', debounceFunction);


function makeCountry(data) {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
  if (data.length >= 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length === 1) {
    infoEl.insertAdjacentHTML('beforeend', allCountries(data));
  } else {
    listEl.insertAdjacentHTML('beforeend', makeCountryOne(data));
  }
}


function makeCountryOne(data) {
  const oneCountry = data
    .map(({ name, flags }) => {
      return `<li class="country" ><img src="${flags.svg}" alt="${name.official} with="200" height="100">
        <h2>${name.official}</h2></li>`;
    })
    .join('');
  return oneCountry;
}


function allCountries(data) {
  let listCountries = data
    .map(({ name, population, capital, flags, languages }) => {
      return `<div><img class="flags-list" src="${
        flags.svg
      }" alt="Country width="100" height="50">
        <h3>${
          name.official
        }</h3></div><p>Population:"${population}"</p><p>Capital:"${capital}"</p><p>Language:"${Object.values(
        languages
      )}"</p>`;
    })
    .join('');
  return listCountries;
}


// import './css/styles.css';
// import { fetchCountries } from './fetchCountries.js';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// const DEBOUNCE_DELAY = 300;
// const boxEl = document.querySelector('#search-box');
// const listEl = document.querySelector('.country-list');
// const infoEl = document.querySelector('.country-info');

// const handleSearchCountry = event => {
//   let valueInput = event.target.value.toLowerCase().trim();
//   if (valueInput === '') {
//     return (listEl.innerHTML = ''), (infoEl.innerHTML = '');
//   }
//   fetchCountries(valueInput)
//     .then(makeCountry)
//     .catch(err => {
//       Notiflix.Notify.warning('Oops, there is no country with that name');
//     });
// };

// const debounceFunction = debounce(handleSearchCountry, DEBOUNCE_DELAY);

// boxEl.addEventListener('input', debounceFunction);


// function makeCountry(data) {
//   listEl.innerHTML = '';
//   infoEl.innerHTML = '';
//   if (data.length >= 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   } else if (data.length === 1) {
//     infoEl.insertAdjacentHTML('beforeend', allCountries(data));
//   } else {
//     listEl.insertAdjacentHTML('beforeend', makeCountryOne(data));
//   }
// }


// function makeCountryOne(data) {
//   const oneCountry = data
//     .map(({ name, flags }) => {
//       return `<li class="country" ><img src="${flags.svg}" alt="${name.official} with="200" height="100">
//         <h2>${name.official}</h2></li>`;
//     })
//     .join('');
//   return oneCountry;
// }


// function allCountries(data) {
//   let listCountries = data
//     .map(({ name, population, capital, flags, languages }) => {
//       return `<div><img class="flags-list" src="${
//         flags.svg
//       }" alt="Country width="100" height="50">
//         <h3>${
//           name.official
//         }</h3></div><p>Population:"${population}"</p><p>Capital:"${capital}"</p><p>Language:"${Object.values(
//         languages
//       )}"</p>`;
//     })
//     .join('');
//   return listCountries;
// }
