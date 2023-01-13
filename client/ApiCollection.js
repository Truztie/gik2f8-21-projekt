
class ApiCollection {
    // Medlemsvariabel url, för att lagra en grund-url till servern.
    url = '';
  
    // När en instans av klassen skapas skickas url in som parametern
    constructor(url) {
      this.url = url;
    }

    create(data) {
      // Konverterar inskickat JavaScriptobjekt, i detta fall är det en karaktär, till en sträng så att den kan skickas över HTTP.
      const JSONData = JSON.stringify(data);
      // Utskrift till logg för att se vad som ska skickas och vart det ska skickas.
      console.log(`Sending ${JSONData} to ${this.url}`);

      const request = new Request(this.url, {
        method: 'POST',
        body: JSONData,
        headers: {
          'content-type': 'application/json'
        }
      });
  
      return (
        fetch(request)
          .then((result) => result.json())
          .then((data) => data)
          .catch((err) => console.log(err))
      );
    }

    getAll() {
      return fetch(this.url)
        .then((result) => result.json())
        .then((data) => data)
        .catch((err) => console.log(err));
    }

    remove(id) {
      console.log(`Removing task with id: ${id}.`);
      return fetch(`${this.url}/${id}`, {
        method: 'DELETE'
      })
        .then((result) => result)
        .catch((err) => console.log(err));
    }
  }