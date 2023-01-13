
// här deklarerar vi variabeln collectionListElement och tilldelar sjävla elementet med id:t "collectionList"
const collectionListElement = document.getElementById('collectionList');

/* Här skapas en instans av api-klassen som finns i filen ApiCollection.js.
Där skrevs en konstruktor, som skulle ta emot en url.
constructor(url) {...}
Denna url skickas in till Api-klassen genom att man anger new, klassens namn (Api), parenteser. Inom parenteserna skickas sedan det som konstruktorn vill ta emot - dvs. url:en till vårt api.
Adressen som skickas in är http://localhost:5000/collections och innan det fungerar är det viktigt att ändra det i servern*/
const api = new ApiCollection('http://localhost:5000/collections');

//denna function onAddtoCollection tar in characterens namn, kön och födelseår.
function onAddToCollection(name, gender, birth) {

  //från vårt eget backend anropar vi getALL och hämtar de karaktärerna som redan ligger i vår collection.
  api.getAll().then((list) => {
    let nameExists = false;

    //för varje karaktär i den listan så kollar vi först om vi den vi försöker lägga till i collection har samma namn som någon redan existerande i listan.
    list.forEach((listItem) => {
      if (name === listItem.name) {
        nameExists = true;
      }
    });

    //om detta är fallet så kommer ett modalPopup som talar om att karaktären existerar redan i listan och ber en försöka igen att lägga till andra.
    // detta är våran validering ifall en karaktär redan finns i listan.
    if (nameExists) {
      console.log("name already exists");
      let html = `<div id="modalWindow" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                    <div class="rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-amber-100 to-rose-600 m-48 p-5 flex flex-col justify-center">
                      <p class="font-bold">You are trying to add a characther that already exist in the collection.</p>
                      <p class="font-bold flex justify-center">Click on "close" to close this window and try again.</p>
                      <div class="flex justify-center m-3">
                        <button id="closeButton" onclick="closeModalWindow()" class=" font-bold rounded-md border-2 border-slate-900 hover:border-red-700 px-5 py-1 bg-amber-100" style="box-shadow:2px 2px 8px #2b2b2b">Close</button>
                      </div>
                    </div>
                  </div>`
      document.getElementById('root').insertAdjacentHTML("beforeend", html);
  
      //om karaktären man försöker lägga till och inte finns redan i listan så kommer ett modalPopup upp och frågar användaren om man vill lägga till en kommentar eller inte.
      // Sedan klickar man på submit för att lägga till karaktären.
      // detta är ett formulär med en textarea och en submit knapp.
    } else {
      console.log("name does not exist");
      let html = `<div id="modalWindow" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                    <section id="submitWindow" class="flex-1 rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-amber-100 to-blue-700 m-48 p-5">
                      <form id="commentForm"
                            name="commentForm">
                        <section class="mb-2">
                          <label class="block pr-5 mb-2 text-xl font-bold"
                                style="text-shadow:4px 4px 5px #606061 word-break: break-word;"
                                for="comment">Add comment or not for <u>${name}</u>, then click the submit button.</label>
                          <p class="message text-md text-rose-600 mb-2 hidden">
                            Error message
                          </p>
                          <textarea maxlength="500"
                                    rows="5"
                                    id="comment"
                                    name="comment"
                                    class="resize-none font-bold w-full rounded-md border-slate-900 border-2 focus-within:outline-none focus:border-blue-700 px-4 py-2"></textarea>
                        </section>
                        <button name="submitCommentForm" type="submit"
                                class="rounded-md font-bold bg-amber-100 border-2 border-slate-900 hover:border-blue-700 px-4 py-1">
                          Submit
                        </button>
                      </form>
                    </section>
                  </div>`
      document.getElementById(`characterListItem${name}`).insertAdjacentHTML("afterend", html);

      // OM formuläret existerar och man klickar på submit anropar den onSubmit funktionen som tar med sig submit-eventet, karaktärens namn, kön, födelseår, och den text som man skrev i textarean.
      if(document.getElementById("submitWindow")){
        commentForm.addEventListener('submit', (e) =>{
          onSubmit(e, name, gender, birth, commentForm.comment.value);
          // när funktionen onSubnit anropas så stänger den modalfönstret och återgår till att kunna söka på nytt.
          if(onSubmit){
            closeModalWindow();
          }
        });
        
      }
    }
  });
}

// Funktion för att stänka modalfönstret för formuläret och ifall karaktären redan existerar i listan.
function closeModalWindow(){
  let modal = document.getElementById('modalWindow')
  modal.remove()
}
//onSubmit funktionen som tar in allt och skivar vidare till saveCharacter.
function onSubmit(e, name, gender, birth, comment){
  e.preventDefault();
  saveCharacter(name, gender, birth, comment);
  let submitWindow = document.getElementById('submitWindow');
  submitWindow.remove();
}
// Funktion för att ta hand om properties från karaktären och formulärets data och skicka det till api-klassen.
function saveCharacter(name, gender, birth, comment) {
  const chara = { 
    name: name,
    gender: gender,
    birth_year: birth,
    comment: comment
  };
  
  // skickar datat från karaktären och kommentaren till den karaktärnen till vårt api och skapar ett objekt med dessa.  
  api.create(chara).then((chara) => {

    // Här kollar vi om vi har ett objekt och om objektet så renderar vi renderlist.
    if (chara) {
      renderList();
    }
  });
}

//En funktion som ansvarar för att skriva ut karaktärs-listan i ett ul-element.
function renderList() {
  //utskrift i console för att visa att den renderar listan.
  console.log('rendering');

  // read förfrågan för att hämta alla karaktärer i listan i vår backend och får respons i form av promise..
  api.getAll().then((chars) => {

    // Först sätts dess HTML-innehåll till en tom sträng. Det betyder att alla befintliga element och all befintlig text inuti characterListElement tas bort. Det kan nämligen finnas list-element däri när denna kod körs, men de tas här bort för att hela listan ska uppdateras i sin helhet.
    collectionListElement.innerHTML = '';

    //om listan finns och det finns en eller mer karaktärer så sorterar vi karaktärenas namn i alfabetisk ordning från A-Z
    if (chars && chars.length > 0) {
      chars.sort((a,b) => {
        if (a.name< b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      
      //så för varje karaktär i listan stoppar vi in dessa karaktärer i listan.
      chars.forEach((char) => {
        collectionListElement.insertAdjacentHTML('beforeend', renderChar(char));
      });
    }
  });
}

//funktionen renderTask tar in en karaktär och skapar html utefter den karaktärens namn, kön, födelseår och om det finns en kommentar.
function renderChar(char) {

  let html = `
    <li class="select-none mt-2 p-3 rounded-md border-2 border-amber-600 hover:border-amber-300"
              style="box-shadow:2px 2px 8px #1b1b1b" >
      <div class="flex justify-between">
        <div class>
          <h3 class=" pl-4 mb-3 flex-1 text-xl font-bold text-amber-100 uppercase">${char.name}</h3>
          <p class=" pl-4 mb-3 flex-1 text-sm font-bold text-amber-100 capitalize">Gender: ${char.gender} <br> Birth Year: ${char.birth_year}</p>
        </div>  
        <div>
          <button onclick="deleteTask(${char.id})" class=" inline-block bg-amber-100 text-md font-bold text-slate-900 border-2 border-amber-600 px-3 py-1 rounded-md ml-2 hover:bg-orange-400 hover:border-amber-300">Delete</button>
        </div>
      </div>`;

    char.comment&&

    (html += `
      <h3 class=" pl-4 mb-3 flex-1 text-sm font-bold text-amber-100 capitalize">Comment:</h3>
      <div style="word-break: break-word;">
        <p class="ml-8 mt-2 text-md italic text-amber-100">${char.comment}</p>
      </div>
  `);

  html +=`
    </li>`;

  return html;
}

// Funktion för att ta bort en karaktär. Denna funktion är kopplad som eventlyssnare i HTML-koden som genereras i renderChar
function deleteTask(id) {

  // Api-klassen har en metod, remove, som sköter DELETE-anrop mot vårt egna backend.
  api.remove(id).then((result) => {
    // När REMOVE-förfrågan är skickad till backend via vår Api-klass och ett svar från servern har kommit, kan vi på nytt anropa renderList.

    renderList();
  });
}

renderList();