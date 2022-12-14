'use strict';
let characterList = []

window.addEventListener('load', () => {
  // Show the loading screen
  let html = `<div id="loadingScreen" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                <section id="loadingScreen" class="rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-teal-400 to-violet-500 m-48 p-5 flex">
                  <p class="font-bold mr-10">Resources are loading.<br> Please wait until it has been loading. <br> This windows will dissapear when the resources has finishing loading.</p>
                  <img src="loading.gif" alt="A description of the image" width="100" height="100">
                </section>
              </div>`
  document.getElementById('root').insertAdjacentHTML("beforebegin", html);

   getAll().then((result) => {
     characterList = result;
      //Hide the loading screen
     let loadingScreen = document.getElementById('loadingScreen');
     loadingScreen.remove();
   }).catch((error) => {
     console.log(error)
     let htmlError = `<div id="loadingScreen" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                 <section id="loadingScreen" class="rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-teal-400 to-violet-500 m-48 p-5 flex flex-col justify-center ">
                   <p class="font-bold text-red-700">The page cant fetch the resources right now, try again later!</p>
                 </section>
               </div>`
     document.getElementById('root').insertAdjacentHTML("beforebegin", htmlError);
   });
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

/*Du kan ju ta en hel del inspiration fr??n hur ul listan renderas
B??rja med att f??rs??ka f?? fram en div n??nstans n??r du k??r mouse over p?? n??t i listan
Tips : skapa en lista med hj??lp av queryselector all som du sedan g??r en for each loop p?? f??r att f??sta eventlistener
Tips2, plocka ut eventet ur de du hovrar ??ver och se vad som erbjuds*/