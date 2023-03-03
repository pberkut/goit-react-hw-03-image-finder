const BASE_URL = 'https://pixabay.com/api';
const KEY = '32766360-76e7eba189222bd8a15da9e43';
const PER_PAGE = 12;

export const getImages = (query, page) => {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${query}&per_page=${PER_PAGE}&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Error ${response.message}`));
  });
};
