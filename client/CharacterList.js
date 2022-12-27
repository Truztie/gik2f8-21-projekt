const CharacterList = (characterList) => {
    let html = `<ul class="character-list rounded-md border-2 border-slate-900 bg-slate-600 w-full mx-auto">`;
    for (let i = 0; i < characterList.length; i++) {
        console.log(i);
      html += CharacterItem(characterList[i]);
    }
  
    html += `</ul>`;
  
    return html;
  };