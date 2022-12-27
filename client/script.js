'use strict';

let characterList = [];

window.addEventListener('load', () => {
  getAll().then((apiCharacters) => console.log(apiCharacters));
});



searchField.addEventListener('keyup', (e) =>
  renderBookList(
    characterList.filter(({name}) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(characterList) {
  const existingElement = document.querySelector('.character-list');
  const root = document.getElementById('root');
  existingElement && root.removeChild(existingElement);
  characterList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', CharacterList(characterList));
//   const listElement = document.querySelectorAll('.book-list__item');
//   listElement.forEach((item) =>{

//     item.addEventListener("mouseover", (e) => {

//       getBookDetail(e.target.id).then((object) => (item.insertAdjacentHTML("beforeend", BookDetail(object, e.pageX, e.pageY))));

//       item.addEventListener("mousemove", (e) => {
//         const existingPopup = document.getElementById("BookDetail");
//         if(existingPopup){
//         existingPopup.style.left = e.pageX+10 + 'px';
//         existingPopup.style.top = e.pageY+10 + 'px';
//         }
        
//       })

//       item.addEventListener("mouseout", (e) =>{
//         const existingPopup = document.getElementById("BookDetail");
//         if(existingPopup){
//           existingPopup.remove();
//         }
//       })
//     })
//   })
}

/*Du kan ju ta en hel del inspiration från hur ul listan renderas
Börja med att försöka få fram en div nånstans när du kör mouse over på nåt i listan
Tips : skapa en lista med hjälp av queryselector all som du sedan gör en for each loop på för att fästa eventlistener
Tips2, plocka ut eventet ur de du hovrar över och se vad som erbjuds*/