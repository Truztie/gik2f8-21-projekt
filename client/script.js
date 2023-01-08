'use strict';
let characterList = []

window.addEventListener('load', () => {
    getAll().then((result) => (characterList = result))
});

searchField.addEventListener('keyup', (e) =>
  renderCharacterList(
    characterList.filter(({name}) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderCharacterList(characterList) {
  const existingElement = document.querySelector('.character-list');
  const searchSection = document.getElementById('searchSection'); //redundant?
  existingElement && searchSection.removeChild(existingElement);
  characterList.length > 0 && searchField.value && searchSection.insertAdjacentHTML('beforeend', CharacterList(characterList));
}

/*Du kan ju ta en hel del inspiration från hur ul listan renderas
Börja med att försöka få fram en div nånstans när du kör mouse over på nåt i listan
Tips : skapa en lista med hjälp av queryselector all som du sedan gör en for each loop på för att fästa eventlistener
Tips2, plocka ut eventet ur de du hovrar över och se vad som erbjuds*/