'use strict';
// initierar en karaktärarray
let characterList = []

//när fönstret öppnas så lyssnar den på "load" och därefter skapar en popup som visar att information som hämtas från API:t håller på att hämstas.
window.addEventListener('load', () => {
  // Denna html är "loadingscreen" aka modalwindow, för hämnting av resurser.
  let html = `<div id="loadingScreen" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                <section id="loadingScreen" class="rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-blue-700 via-slate-900 to-red-700 m-48 p-5 flex">
                  <p class="font-bold text-slate-200 mr-10"
                     style="text-shadow:4px 4px 5px #000000">Resources are loading.<br> Please wait until it has been loading. <br> This windows will dissapear when the resources has finishing loading.</p>
                  <img src="loading.gif" alt="A description of the image" width="100" height="100">
                </section>
              </div>`
  document.getElementById('root').insertAdjacentHTML("beforebegin", html);

   // anropar getAll för att hämta alla karaktärer 
   getAll().then((result) => {
     characterList = result;
      //när alla karaktärer har hämtats så försvinner "loadingscreen" aka modalwindow
     let loadingScreen = document.getElementById('loadingScreen');
     loadingScreen.remove();

     //om resurserna inte går att hämta för tillfället kommer istället detta modalfönster upp och talar om att man får försöka igen.
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

// sökfältet lussnar efter keyup och när man skriver så kommer sökttermen som man skriver matcha de object som ligger i characterList och då visa de karaktärer med den följden av bokstäver.
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
// denna funktion tar in characterList och ko
function renderCharacterList(characterList) {
  characterList.length > 0 && searchField.value && searchSection.insertAdjacentHTML('beforeend', CharacterList(characterList));
}