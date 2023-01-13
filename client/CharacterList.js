//denna funktion tar in characterList skapar ett UL element i html och sedan anroppar characterItem funktionen för att be om karaktärer att hoppa in i listan när vi väl söker.
const CharacterList = (characterList) => {
    let html = `<ul class="character-list rounded-md border-2 border-slate-900 bg-amber-100 w-full mx-auto mt-6 overflow-y-auto" style="max-height:65vh;">`;
    for (let i = 0; i < characterList.length; i++) {
      html += CharacterItem(characterList[i]);
    }
  
    html += `</ul>`;
  
    return html;
  };