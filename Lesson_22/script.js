// https://restcountries.com/v3.1/name/Ukraine

// function serviceCountry() {
//     return fetch('https://restcountries.com/v3.1/name/Ukraine')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json()
//         })
// }
// serviceCountry()

// serviceCountry()

// Function Declaration
// async function serviceCountry() {
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');
//     const data = await response.json();
// }

// Function expression
// const serviceCountry = async function(){
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');
//     const data = await response.json();
// }

// Arrow function
// const serviceCountry = async () => {
//     const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');
//     const data = await response.json();
// }

// Object async method
// const country = {
//     capital: null,
//     async serviceCountry() {
//         const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');
//         const data = await response.json();
//         console.log(data);
//     }
// }

// country.serviceCountry()

// Class async method
// class Country {
//     constructor(country) {
//         this.country = country;
//     }

//     async serviceCountry() {
//         const response = await fetch(`https://restcountries.com/v3.1/name/${this.country}`);
//         const data = await response.json();
//         console.log(data[0].capital[0]);
//     }
// }

// const poland = new Country('Poland')
// poland.serviceCountry()
// console.log('After async');

// async function fn() {

// }
// fn().then().catch().finally()

//  try catch
// async function serviceCountry() {
//     const url = 'https://restcountries.com/v3.1/name/Ukraine';
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const markup = createMarkup(data[0].capital[0]);
//         document.body.insertAdjacentHTML('afterbegin', markup);
//     }catch(e){
//         console.log(e);
//     }

// }

// serviceCountry()

// then catch
// async function serviceCountry() {
//     const url = 'https://restcountries.com/v3.1/name/Ukraine';
//     const response = await fetch(url);
//     return response.json();
// }

// serviceCountry()
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

// function createMarkup(capital) {
//     return `<li><h2>${capital}</h2></li>`
// }

// async function serviceCountry() {
//     const url = 'https://restcount.com/v3.1/name/Ukraine';
//     try {
//         const response = await fetch(url);
//         return response.json();
//     } catch (e) {
//         console.log(e);
//     }

// }

// serviceCountry()
//     .then(data => {
//         const markup = createMarkup(data[0].capital[0]);
//         document.body.insertAdjacentHTML('afterbegin', markup);
//     })
//     .catch(err => console.log(err))

// async function serviceCountries(countries) {

//     const responses = countries.map(async country => {
//         const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//         return response;
//     })

//     // const resp1 = await fetch(`https://restcountries.com/v3.1/name/${country1}`)
//     // const resp2 = await fetch(`https://restcountries.com/v3.1/name/${country2}`)
//     // const resp3 = await fetch(`https://restcountries.com/v3.1/name/${country3}`)
// }
// serviceCountries(['Ukraine', 'Poland', 'Germany'])

// const API_KEY = '14c56bddeab14583a6e164909231107'

const elements = {
  form: document.querySelector(".js-form"),
  formElements: document.querySelector(".js-form-elements"),
  addField: document.querySelector(".js-add-field"),
  list: document.querySelector(".js-list"),
};

elements.addField.addEventListener("click", handlerAddField);
elements.form.addEventListener("submit", handlerSubmit);

function handlerAddField() {
  const inputMarkup = '<input type="text" name="country" />';
  elements.formElements.insertAdjacentHTML("beforeend", inputMarkup);
}

async function handlerSubmit(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);
  // '' 0 NaN null undefined false   => false
  const values = formData.getAll("country").filter((value) => value);
  try {
    const capitals = await serviceCountries(values);
    const weather = await serviceWeather(capitals);

    elements.list.innerHTML = createMarkup(weather);
  } catch (err) {
    console.log(err);
  } finally {
    evt.target.reset();
    elements.formElements.innerHTML = '<input type="text" name="country"/>';
  }
}

async function serviceCountries(countries) {
  const BASE_URL = "https://restcountries.com/v3.1/name";
  const responses = countries.map(async (country) => {
    const response = await fetch(`${BASE_URL}/${country}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
  const data = await Promise.allSettled(responses);
  return data
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value[0].capital[0]);
}

async function serviceWeather(capitals) {
  const BASE_URL = "http://api.weatherapi.com/v1";
  const END_POINT = "/current.json";
  const API_KEY = "14c56bddeab14583a6e164909231107";

  const responses = capitals.map(async (capital) => {
    const response = await fetch(
      `${BASE_URL}${END_POINT}?key=${API_KEY}&q=${capital}&lang=uk`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });

  const data = await Promise.allSettled(responses);
  return data
    .filter(({ status }) => status === "fulfilled")
    .map(({ value }) => value);
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        location: { country, name },
        current: {
          temp_c,
          condition: { icon, text },
        },
      }) => `<li>
    <img src="${icon}" alt="${text}" />
    <p>${text}</p>
    <h3>${country}</h3>
    <h3>${name}</h3>
    <p>${temp_c}</p>
  </li>`
    )
    .join("");
}

// Напишіть асинхронний мапінг «.map()» об’єкта з використанням callback. Зверніть увагу на те, що функція callback асинхронна, asyncObjectMap має повернути об’єкт, а не promise.
// async function asyncObjectMap(obj, callback) {
//     const values = Object.values(obj);
//     const result = values.map(callback);
//     console.log(result);
//     const all = await Promise.all(result);

//     Object.keys(obj).forEach((key, idx) => {
//         obj[key] = all[idx]
//     })
//     return obj
// }
// asyncObjectMap({ qwe: 123, fds: 32 }, async (x) => x * 2)
// .then(obj => console.log(obj));// => { qwe: 246, fds: 64 }
