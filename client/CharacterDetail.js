const CharacterDetail = (character, x, y) => {

    let characterDetail = `<div id="CharacterDetail" class="character-item__detail flex bg-slate-600 text-slate-200 w-auto absolute rounded-md border-2 border-slate-900 p-4 w-full mx-auto top-[${y}px] left-[${x}px]">
                        <div class="p-4">
                          <p class="py-2.5" > ID: ${character.name}</p>
                          <p class="py-2.5" > Title: ${character.name}</p>
                          <p class="py-2.5" > Author: ${character.name}</p>
                          <p class="py-2.5" > Pages: ${character.name}</p
                          <p class="py-2.5" > Release Date: ${character.name}</p>
                        </div>
                      </div>`;
    return characterDetail;
}