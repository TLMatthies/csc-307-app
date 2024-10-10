// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id_to_delete) => {
  const new_list = users["users_list"].filter((user) => user.id != id_to_delete);
  if (users["users_list"] === new_list)
  {
    return false;
  }
  users["users_list"] = new_list;
  return true;
};

const find_entry_by_name_and_job = (name, job) => {
  const new_list = users["users_list"].filter((user) => user.name == name & user.job == job);
  return new_list;
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = Math.floor(Math.random() * 100000)
  addUser(userToAdd);
  res.status(201)
  res.send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params["id"];
  if (!deleteUser(userId))
  {
    res.status(404).send();
  }
  else
  {
    res.status(204).send()
  }
});

app.get("/users/:name/:job", (req, res) => {
  const name = req.params["name"];
  const job = req.params["job"];
  let result = find_entry_by_name_and_job(name, job);
  if (result == undefined){
    res.status(404).send("Entry not found.");
  }
  else{
    res.send(result);
  }

});