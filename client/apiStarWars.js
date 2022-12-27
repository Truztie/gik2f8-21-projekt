const url = 'https://swapi.dev/api/people/';


async function getAll() {
  const result = await fetch(url)
    .then((result) => result.json())
    .catch((e) => e);
  return result;
}