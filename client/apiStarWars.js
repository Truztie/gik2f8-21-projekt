/*const url = 'https://swapi.dev/api/people/';

async function getAll() {
  const result = await fetch(url)
    .then((result) => result.json())
    .catch((e) => e);
  return result;s
}*/
async function getAll() {
  const result = [];
  let url = 'https://swapi.dev/api/people/';

  do {
    const res = await fetch(url);
    const { results, next } = await res.json();
    result.push(...results);
    url = next;
  } while(url)

  return result;
}