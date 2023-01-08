

const collectionListElement = document.getElementById('collectionList');
/* Jag använder oftast getElementById, men andra sätt är att t.ex. använda querySelector och skicka in en css-selektor. I detta fall skulle man kunna skriva document.querySelector("#todoList"), eftersom # i css hittar specifika id:n. Ett annat sätt vore att använda elementet document.querySelector("ul"), men det är lite osäkert då det kan finnas flera ul-element på sidan. Det går också bra att hämta på klassnamn document.querySelector(".todoList") om det hade funnits ett element med sådan klass (det gör det inte). Klasser är inte unika så samma kan finnas hos flera olika element och om man vill hämta just flera element är det vanligt att söka efter dem via ett klassnamn. Det man behöver veta då är att querySelector endast kommer att innehålla ett enda element, även om det finns flera. Om man vill hitta flera element med en viss klass bör man istället använda querySelectorAll.  */

/* Här anges startvärde för tre stycken variabler som ska användas vid validering av formulär. P.g.a. lite problem som bl.a. har med liveServer att göra, men också att formuläret inte rensas har dessa satts till true från början, även om det inte blir helt rätt. Dessa ska i alla fall tala om för applikationen om de olika fälten i formulären har fått godkänd input.  */
let inCollectionValid = true;

/* Här skapas en instans av api-klassen som finns i filen Api.js.
Där skrevs en konstruktor, som skulle ta emot en url.
constructor(url) {...}
Denna url skickas in till Api-klassen genom att man anger new, klassens namn (Api), parenteser. Inom parenteserna skickas sedan det som konstruktorn vill ta emot - dvs. url:en till vårt api.
Adressen som skickas in är http://localhost:5000/tasks och innan det fungerar är det viktigt att ändra det i servern. I Lektion 5 sattes alla routes till /task. Dessa ska ändras till /tasks. Dessa routes är första argumenten till app.get, app.post och app.delete, så det ser ut ungefär app.get("/task",...). Alla sådana ska ändras till "/tasks". */
const api = new ApiCollection('http://localhost:5000/collections');

/* Nedan följer callbackfunktionen som är kopplad till alla formulärets fält, när någon skriver i det eller lämnar det.
Funktionen tar emot en parameter - field - som den får genom att e.target skickas till funktionen när den kopplas med addEventListener ovan. */
// function validateField(keypress) {
//   /* Destructuring används för att plocka ut endast egenskaperna name och value ur en rad andra egenskaper som field har. Mer om destructuring https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment */

//   /* Name är det name-attribut som finns på HTML-taggen. title i detta exempel: <input type="text" id="title" name="title" />
//   value är innehållet i fältet, dvs. det någon skrivit. */
//   const { name, value } = field;

//   /* Sätter en variabel som framöver ska hålla ett valideringsmeddelande */
//   let = validationMessage = '';
//   /* En switchsats används för att kolla name, som kommer att vara title om någon skrivit i eller lämnat titlefältet, annars description eller date.   */
//   switch (name) {
//     /* Så de olika fallen - case - beror på vilket name-attribut som finns på det elementet som skickades till validateField - alltså vilket fält som någon skrev i eller lämnade. */

//     /* Fallet om någon skrev i eller lämnade fältet med name "title" */
//     case 'title': {
//       /* Då görs en enkel validering på om värdet i title-fältet är kortare än 2 */
//       if (value.length < 2) {
//         /* Om det inte är två tecken långt kommer man in i denna if-sats och titleValid variabeln sätts till false, validationMessage sätts till ett lämpligt meddelande som förklarar vad som är fel.  */
//         titleValid = false;
//         validationMessage = "The field 'Titel' need atleast 2 characters.";
//       } else if (value.length > 100) {
//         /* Validering görs också för att kontrollera att texten i fältet inte har fler än 100 tecken. */
//         titleValid = false;
//         validationMessage =
//           "The field 'Titel' can only contain of maximum 100 characters.";
//       } else {
//         /* Om ingen av dessa if-satser körs betyder det att fältet är korrekt ifyllt. */
//         titleValid = true;
//       }
//       break;
//     }
//     /* Fallet om någon skrev i eller lämnade fältet med name "description" */
//     case 'description': {
//       /* Liknande enkla validering som hos title */
//       if (value.length > 500) {
//         descriptionValid = false;
//         validationMessage =
//           "The field 'Description' can only contain a maximum of 500 characters.";
//       } else {
//         descriptionValid = true;
//       }
//       break;
//     }
//     /* Fallet om någon skrev i eller lämnade fältet med name "dueDate" */
//     case 'dueDate': {
//       /* Här är valideringen att man kollar om något alls har angetts i fältet. dueDate är obligatoriskt därför måste det vara mer än 0 tecken i fältet */
//       if (value.length === 0) {
//         /* I videon för lektion 6 är nedanstående rad fel, det står där descriptionValid =  false;, men ska förstås vara dueDateValid = false; */
//         dueDateValid = false;
//         validationMessage = "The field 'Due date' needs a valid due date.";
//       } else {
//         dueDateValid = true;
//       }
//       break;
//     }
//   }
//   /* När alla fall sökts igenom sätts här attribut på fältets förra syskon-element, previousElementSibling.
//   Det fungerar så att alla element som ligger inom samma element är syskon. I index.html omsluts alla <input>-element av ett <section>-element. I samma <section>-element finns ett <label>-element och ett <p>-element  <p>-elementen ligger innan <input>-elementen, så alla <p>-element är föregående syskon till alla <input>-element - previousSiblingElement.

//   så field.previousElementSibling hittar det <p>-element som ligger innan det inputfält som någon just nu har skrivit i eller lämnat.
//   */

//   /* <p>-elementets innerText (textinnehåll) sätts till den sträng som validationMessage innehåller - information om att titeln är för kort, exempelvis.  */
//   field.previousElementSibling.innerText = validationMessage;
//   /* Tailwind har en klass som heter "hidden". Om valideringsmeddelandet ska synas vill vi förstås inte att <p>-elementet ska vara hidden, så den klassen tas bort. */
//   field.previousElementSibling.classList.remove('hidden');
// }
/* Callbackfunktion som används för eventlyssnare när någon klickar på knappen av typen submit */

function onAddToCollection(name, gender, birth) {
  api.getAll().then((list) => {
    let nameExists = false;

    list.forEach((listItem) => {
      if (name === listItem.name) {
        nameExists = true;
      }
    });

    if (nameExists) {
      console.log("name already exists");
      let html = `<div id="modalWindow" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                    <div class="rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-teal-400 to-violet-500 m-48 p-5 flex flex-col justify-center">
                      <p class="font-bold">You are trying to add a characther that already exist in the collection.</p>
                      <p class="font-bold flex justify-center">Click on "close" to close this window and try again.</p>
                      <div class="flex justify-center m-3">
                        <button id="closeButton" onclick="closeModalWindow()" class=" font-bold rounded-md border-2 border-slate-900 hover:border-fuchsia-500 px-5 py-1 bg-emerald-300" style="box-shadow:2px 2px 8px #2b2b2b">Close</button>
                      </div>
                    </div>
                  </div>`
      document.getElementById('root').insertAdjacentHTML("beforeend", html);
  
  
    } else {
      console.log("name does not exist");
      let html = `<div id="modalWindow" class="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center">
                    <section id="submitWindow" class="flex-1 rounded-md border-2 border-slate-900 absolute bg-gradient-to-tr from-teal-400 to-violet-500 m-48 p-5">
                      <form id="commentForm"
                            name="commentForm">
                        <section class="mb-2">
                          <label class="block pr-5 mb-2 text-xl"
                                style="text-shadow:4px 4px 5px #606061 word-break: break-word;"
                                for="comment">Add comment or not for <u>${name}</u>, then click the submit button</label>
                          <p class="message text-md text-rose-600 mb-2 hidden">
                            Error message
                          </p>
                          <textarea maxlength="500"
                                    rows="5"
                                    id="comment"
                                    name="comment"
                                    class="resize-none w-full rounded-md border-violet-400 border-2 focus-within:outline-none focus:border-fuchsia-500 px-4 py-2"></textarea>
                        </section>
                        <button name="submitCommentForm" type="submit"
                                class="rounded-md bg-violet-300 border-2 border-violet-400 hovler:bg-gradient-to-br from-teal-400 via-violet-500 to-fuchsia-500 px-4 py-1">
                          Submit
                        </button>
                      </form>
                    </section>
                  </div>`
      document.getElementById(`characterListItem${name}`).insertAdjacentHTML("afterend", html);
      if(document.getElementById("submitWindow")){
        commentForm.addEventListener('submit', (e) =>{
          onSubmit(e, name, gender, birth, commentForm.comment.value);
          if(onSubmit){
            closeModalWindow();
          }
        });
        
      }
    }
  });
}

function closeModalWindow(){
  let modal = document.getElementById('modalWindow')
  modal.remove()
}

function onSubmit(e, name, gender, birth, comment){
  e.preventDefault();
  saveTask(name, gender, birth, comment);
  let submitWindow = document.getElementById('submitWindow');
  submitWindow.remove();
}
/* Funktion för att ta hand om formulärets data och skicka det till api-klassen. */
function saveTask(name, gender, birth, comment) {
  /* Ett objekt vid namn task byggs ihop med hjälp av formulärets innehåll */
  /* Eftersom vi kan komma åt fältet via dess namn - todoForm - och alla formulärets fält med dess namn - t.ex. title - kan vi använda detta för att sätta värden hos ett objekt. Alla input-fält har sitt innehåll lagrat i en egenskap vid namn value (som också används i validateField-funktionen, men där har egenskapen value "destrukturerats" till en egen variabel. ) */
  const chara = { 
    name: name,
    gender: gender,
    birth_year: birth,
    comment: comment
  };
  /* Ett objekt finns nu som har egenskaper motsvarande hur vi vill att uppgiften ska sparas ner på servern, med tillhörande värden från formulärets fält. */

  /* Api-objektet, d.v.s. det vi instansierade utifrån vår egen klass genom att skriva const api = new Api("http://localhost:5000/tasks); en bit upp i koden.*/

  /* Vår Api-klass har en create-metod. Vi skapade alltså en metod som kallas create i Api.js som ansvarar för att skicka POST-förfrågningar till vårt eget backend. Denna kommer vi nu åt genom att anropa den hos api-objektet.  */

  /* Create är asynkron och returnerar därför ett promise. När hela serverkommunikationen och create-metoden själv har körts färdigt, kommer then() att anropa. Till then skickas den funktion som ska hantera det som kommer tillbaka från backend via vår egen api-klass.

  Callbackfunktionen som används i then() är en anonym arrow-function som tar emot innehållet i det promise som create returnerar och lagrar det i variabeln chara.
  */

  api.create(chara).then((chara) => {

    /* Task kommer här vara innehållet i promiset. Om vi ska följa objektet hela vägen kommer vi behöva gå hela vägen till servern. Det är nämligen det som skickas med res.send i server/api.js, som api-klassens create-metod tar emot med then, översätter till JSON, översätter igen till ett JavaScript-objekt, och till sist returnerar som ett promise. Nu har äntligen det promiset fångats upp och dess innehåll - uppgiften från backend - finns tillgängligt och har fått namnet "chara".  */
    if (chara) {
      /* När en kontroll har gjorts om task ens finns - dvs. att det som kom tillbaka från servern faktiskt var ett objekt kan vi anropa renderList(), som ansvarar för att uppdatera vår todo-lista. renderList kommer alltså att köras först när vi vet att det gått bra att spara ner den nya uppgiften.  */
      renderList();
    }
  });
}

/* En funktion som ansvarar för att skriva ut todo-listan i ett ul-element. */
function renderList() {
  /* Logg som visar att vi hamnat i render-funktionen */
  console.log('rendering');

  /* Anrop till getAll hos vårt api-objekt. Metoden skapades i Api.js och har hand om READ-förfrågningar mot vårt backend. */
  api.getAll().then((chars) => {
    /* När vi fått svaret från den asynkrona funktionen getAll, körs denna anonyma arrow-funktion som skickats till then() */

    /* Här används todoListElement, en variabel som skapades högt upp i denna fil med koden const todoListElement = document.getElementById('todoList');
     */

    /* Först sätts dess HTML-innehåll till en tom sträng. Det betyder att alla befintliga element och all befintlig text inuti todoListElement tas bort. Det kan nämligen finnas list-element däri när denna kod körs, men de tas här bort för att hela listan ska uppdateras i sin helhet. */
    collectionListElement.innerHTML = '';

    /* De hämtade uppgifterna från servern via api:et getAll-funktion får heta tasks, eftersom callbackfunktionen som skickades till then() har en parameter som är döpt så. Det är tasks-parametern som är innehållet i promiset. */

    /* Koll om det finns någonting i tasks och om det är en array med längd större än 0 */
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
      /* Om tasks är en lista som har längd större än 0 loopas den igenom med forEach. forEach tar, likt then, en callbackfunktion. Callbackfunktionen tar emot namnet på varje enskilt element i arrayen, som i detta fall är ett objekt innehållande en uppgift.  */
      chars.forEach((char) => {
        collectionListElement.insertAdjacentHTML('beforeend', renderTask(char));

        /* Om vi bryter ned nedanstående rad får vi något i stil med:
        1. todoListElement: ul där alla uppgifter ska finnas
        2. insertAdjacentHTML: DOM-metod som gör att HTML kan läggas till inuti ett element på en given position
        3. "beforeend": positionen där man vill lägga HTML-koden, i detta fall i slutet av todoListElement, alltså längst ned i listan.
        4. renderTask(task) - funktion som returnerar HTML.
        5. task (objekt som representerar en uppgift som finns i arrayen) skickas in till renderTask, för att renderTask ska kunna skapa HTML utifrån egenskaper hos uppgifts-objektet.
        */

        /* Denna kod körs alltså en gång per element i arrayen tasks, dvs. en  gång för varje uppgiftsobjekt i listan. */
      });
    }
  });
}

/* renderTask är en funktion som returnerar HTML baserat på egenskaper i ett uppgiftsobjekt.
Endast en uppgift åt gången kommer att skickas in här, eftersom den anropas inuti en forEach-loop, där uppgifterna loopas igenom i tur och ordning.  */

/* Destructuring används för att endast plocka ut vissa egenskaper hos uppgifts-objektet. Det hade kunnat stå function renderTask(task) {...} här - för det är en hel task som skickas in - men då hade man behövt skriva task.id, task.title osv. på alla ställen där man ville använda dem. Ett trick är alltså att "bryta ut" dessa egenskaper direkt i funktionsdeklarationen istället. Så en hel task skickas in när funktionen anropas uppe i todoListElement.insertAdjacentHTML("beforeend", renderTask(task)), men endast vissa egenskaper ur det task-objektet tas emot här i funktionsdeklarationen. */
function renderTask(char) {
  /* Baserat på inskickade egenskaper hos task-objektet skapas HTML-kod med styling med hjälp av tailwind-klasser. Detta görs inuti en templatestring  (inom`` för att man ska kunna använda variabler inuti. Dessa skrivs inom ${}) */
  /*
  Det som skrivs inom `` är vanlig HTML, men det kan vara lite svårt att se att det är så. Om man enklare vill se hur denna kod fungerar kan man klistra in det i ett HTML-dokument, för då får man färgkodning och annat som kan underlätta. Om man gör det kommer dock ${...} inte innehålla texten i variabeln utan bara skrivas ut som det är. Men det är lättare att felsöka just HTML-koden på det sättet i alla fall.
  */
  /* Lite kort om vad HTML-koden innehåller. Det mesta är bara struktur och Tailwind-styling enligt eget tycke och smak. Värd att nämna extra är dock knappen, <button>-elementet, en bit ned. Där finns ett onclick-attribut som kopplar en eventlyssnare till klickeventet. Eventlyssnaren här heter onDelete och den får med sig egenskapen id, som vi fått med oss från task-objektet. Notera här att det går bra att sätta parenteser och skicka in id på detta viset här, men man fick inte sätta parenteser på eventlyssnare när de kopplades med addEventListener (som för formulärfälten högre upp i koden). En stor del av föreläsning 3 rörande funktioner och event förklarar varför man inte får sätta parenteser på callbackfunktioner i JavaScriptkod.
  När eventlyssnaren kopplas till knappen här nedanför, görs det däremot i HTML-kod och inte JavaScript. Man sätter ett HTML-attribut och refererar till eventlyssnarfunktionen istället. Då fungerar det annorlunda och parenteser är tillåtna. */
  let html = `
    <li class="select-none mt-2 p-3 rounded-md border-2 border-violet-400 hover:border-fuchsia-500"
              style="box-shadow:2px 2px 8px #1b1b1b" >
      <div class="flex justify-between">
        <div class>
          <h3 class=" pl-4 mb-3 flex-1 text-xl font-bold text-slate-900 uppercase">${char.name}</h3>
          <p class=" pl-4 mb-3 flex-1 text-sm font-bold text-slate-900 capitalize">Gender: ${char.gender} <br> Birth Year: ${char.birth_year}</p>
        </div>  
        <div>
          <button onclick="deleteTask(${char.id})" class=" inline-block bg-violet-300 text-md text-slate-900 border-2 border-violet-400 px-3 py-1 rounded-md ml-2 hover:bg-gradient-to-br from-teal-400 via-violet-500 to-fuchsia-500">Ta bort</button>
        </div>
      </div>`;

    char.comment&&

    /* Det som ska göras om description finns är att html-variabeln ska byggas på med HTML-kod som visar det som finns i description-egenskapen hos task-objektet. */
    (html += `
      <h3 class=" pl-4 mb-3 flex-1 text-sm font-bold text-slate-900 capitalize">Comment:</h3>
      <div style="word-break: break-word;">
        <p class="ml-8 mt-2 text-md italic">${char.comment}</p>
      </div>
  `);

  /* När html-strängen eventuellt har byggts på med HTML-kod för description-egenskapen läggs till sist en sträng motsvarande sluttaggen för <li>-elementet dit. */
  html +=`
    </li>`;
  /***********************Labb 2 ***********************/
  /* I ovanstående template-sträng skulle det vara lämpligt att sätta en checkbox, eller ett annat element som någon kan klicka på för att markera en uppgift som färdig. Det elementet bör, likt knappen för delete, också lyssna efter ett event (om du använder en checkbox, kolla på exempelvis w3schools vilket element som triggas hos en checkbox när dess värde förändras.). Skapa en eventlyssnare till det event du finner lämpligt. Funktionen behöver nog ta emot ett id, så den vet vilken uppgift som ska markeras som färdig. Det skulle kunna vara ett checkbox-element som har attributet on[event]="updateTask(id)". */
  /***********************Labb 2 ***********************/
  /* html-variabeln returneras ur funktionen och kommer att vara den som sätts som andra argument i todoListElement.insertAdjacentHTML("beforeend", renderTask(task)) */
  return html;
}

/* Funktion för att ta bort uppgift. Denna funktion är kopplad som eventlyssnare i HTML-koden som genereras i renderTask */
function deleteTask(id) {
  /* Det id som skickas med till deleteTask är taget från respektive uppgift. Eftersom renderTask körs en gång för varje uppgift, och varje gång innehåller en unik egenskap och dess uppgifter, kommer också ett unikt id vara kopplat till respektive uppgift i HTML-listan. Det är det id:t som skickas in hit till deleteTasks. */

  /* Api-klassen har en metod, remove, som sköter DELETE-anrop mot vårt egna backend */
  api.remove(id).then((result) => {
    /* När REMOVE-förfrågan är skickad till backend via vår Api-klass och ett svar från servern har kommit, kan vi på nytt anropa renderList för att uppdatera listan. Detta är alltså samma förfarande som när man skapat en ny uppgift - när servern är färdig uppdateras listan så att aktuell information visas. */

    renderList();
    /* Notera att parametern result används aldrig i denna funktion. Vi skickar inte tillbaka någon data från servern vid DELETE-förfrågningar, men denna funktion körs när hela anropet är färdigt så det är fortfarande ett bra ställe att rendera om listan, eftersom vi här i callbackfunktionen till then() vet att den asynkrona funktionen remove har körts färdigt. */
  });
}

/***********************Labb 2 ***********************/
/* Här skulle det vara lämpligt att skriva den funktion som angivits som eventlyssnare för när någon markerar en uppgift som färdig. Jag pratar alltså om den eventlyssnare som angavs i templatesträngen i renderTask. Det kan t.ex. heta updateTask.

Funktionen bör ta emot ett id som skickas från <li>-elementet.
*/
// function updateTask(id){
//   const checkBox = document.getElementById(`checkBox${id}`);
//   if(checkBox.checked == true){
//     const done = {"completed": true};
//     api.update(id, done).then((result) => renderList());
//   }else{
//     const unfinished = {"completed": false};
//     api.update(id, unfinished).then((result) => renderList());
//   }
// }

/* Inuti funktionen kan ett objekt skickas till api-metoden update. Objektet ska som minst innehålla id på den uppgift som ska förändras, samt egenskapen completed som true eller false, beroende på om uppgiften markerades som färdig eller ofärdig i gränssnittet.
Det finns några sätt att utforma det som ska skickas till api.update-metoden.
Alternativ 1: objektet består av ett helt task-objekt, som också inkluderar förändringen. Exempel: {id: 1,  title: "x", description: "x", dueDate: "x", completed: true/false}
Alternativ 2: objektet består bara av förändringarna och id på den uppgift som ska förändras. Exempel: {id: 1, completed: true/false }
Om du hittar något annat sätt som funkar för dig, använd för all del det, så länge det uppnår samma sak. :)
*/

/* Anropet till api.update ska följas av then(). then() behöver, som bör vara bekant vid det här laget, en callbackfunktion som ska hantera det som kommer tillbaka från servern via vår api-klass. Inuti den funktionen bör listan med uppgifter renderas på nytt, så att den nyligen gjorda förändringen syns. */

/***********************Labb 2 ***********************/

/* Slutligen. renderList anropas också direkt, så att listan visas när man först kommer in på webbsidan.  */
renderList();