//när vi laddar hemsidan anropar den getAll funktionen och då fetchar den alla karaktärer från API:et
//då sidan har 82 karaktärer på 10 sidor så måste vi göra en loop som hämtar första sidan med 10 karaktärer sen anropas url = next och går igenom alla sidor tills alla 82 karaktärer har laddats.
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