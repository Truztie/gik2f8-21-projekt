const CharacterItem = (character) => {
    let html = `<li id=""
                class="character-List__item flex justify-between last:mb-0 p-3 text-slate-200 last:border-b-0 border-b border-slate-900 cursor-pointer">
                ${character.name}
                <button id="addButton" onclick="onAddToCollection('${character.name}','${character.gender}','${character.birth_year}')" class="rounded-md p-2 border-2 border-slate-900 bg-cyan-600 text-slate-100" >
                Add to Collection
                </button>
                </li>`;
    return html;
  };