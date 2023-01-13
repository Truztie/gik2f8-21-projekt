const express = require('express');
const app = express();

const fs = require('fs/promises');
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
  
app.get('/collections', async (req, res) => {
  try {
    const characters = await fs.readFile('./collections.json');
    res.send(JSON.parse(characters));
  } catch (error) {
    res.status(500).send({ error });
  }
});
app.post('/collections', async (req, res) => {
  try {
    const char = req.body;
    const listBuffer = await fs.readFile('./collections.json');
    const currentCharacters = JSON.parse(listBuffer);
    let maxCharId = 1;
    if (currentCharacters && currentCharacters.length > 0) {
      maxCharId = currentCharacters.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
          maxCharId
      );
    }

    const newChar = { id: maxCharId + 1, ...char };
    const newList = currentCharacters ? [...currentCharacters, newChar] : [newChar];

    await fs.writeFile('./collections.json', JSON.stringify(newList));
    res.send(newChar);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.delete('/collections/:id', async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const listBuffer = await fs.readFile('./collections.json');
    const currentCharacters = JSON.parse(listBuffer);
    if (currentCharacters.length > 0) {
      await fs.writeFile(
        './collections.json',
        JSON.stringify(currentCharacters.filter((char) => char.id != id))
      );
      res.send({ message: `Character with id: ${id}, is deleted` });
    } else {
      res.status(404).send({ error: 'No character to delete.' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));