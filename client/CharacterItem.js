const CharacterItem = (character) => {
    let html = `<li id=""
                class="character-List__item flex justify-between last:mb-0 p-3 text-slate-200 last:border-b-0 border-b border-slate-900 cursor-pointer">
                ${character.name}
                <button id="addButton" onclick="onAddToCollection('name: ${character.name} <br> gender: ${character.gender} <br> birth year: ${character.birth_year}')" class=" addbutton rounded-full p-2 border-2 border-slate-900 bg-cyan-600 text-slate-100" >
                Add to Collection
                </button>
                </li>`;
    return html;
  };