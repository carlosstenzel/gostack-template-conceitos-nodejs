const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repositorio = { id: uuid(), title, url, techs, likes: 0};

  repositories.push(repositorio);

  return response.json(repositorio);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const respoindex = repositories.findIndex(respo => respo.id === id);

  if(respoindex < 0) {
    return response.status(400). json({ error: "Repositorie not found"});
  }

  const respo = {
    id,
    title,
    url,
    techs,
    "likes": repositories[respoindex].likes
  }

  repositories[respoindex] = respo;

  return response.json(respo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const respoindex = repositories.findIndex(respo => respo.id === id);

  if(respoindex < 0) {
    return response.status(400). json({ error: "Repositorie not found"});
  }

  repositories.splice(respoindex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const respoindex = repositories.findIndex(respo => respo.id === id);

  if(respoindex < 0) {
    return response.status(400). json({ error: "Repositorie not found"});
  }

  const likes = repositories[respoindex].likes + 1;

  const respo = {
    id,
    "title": repositories[respoindex].title,
    "url": repositories[respoindex].url,
    "techs": repositories[respoindex].techs,
    likes
  }

  repositories[respoindex] = respo;

  return response.json(respo);
});

module.exports = app;
