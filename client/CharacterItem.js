// Denna funktion CharacterItem tar in en specific characterItem och skapar ett listelement LI i html. denna listelementet har också en knapp för att kunna addera karaktären till vårat backend api "collection.json"
const CharacterItem = (character) => {
    let html = `<li id="characterListItem${character.name}"
                class="character-List__item flex justify-between last:mb-0 p-3 font-bold text-slate-900 last:border-b-0 border-b border-slate-900 cursor-pointer">
                ${character.name}
                <button id="addButton" onclick="onAddToCollection('${character.name}','${character.gender}','${character.birth_year}')" class="rounded-md p-2 border-2 border-amber-600 bg-zinc-600 text-amber-100"
                        style="text-shadow:4px 4px 5px #000000" >
                Add to Collection
                </button>
                </li>`;
    return html;
  };