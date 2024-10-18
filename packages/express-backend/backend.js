// backend.js
import express from "express";
import cors from "cors";
import services from "./models/user-services.js"

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
  services.findUserByName(name)
  .then((result) => {
    if (result) return result;
    else return undefined;
  })
  .catch((error) => 
    console.log(error.name));
};

const findUserById = (id) => {
  services.findUserById(id)
  .then((result) => {
    if (result) return result;
    else return undefined;
  })
  .catch((error) => 
    console.log(error.name));
};

const addUser = (user) => {
  services.addUser(user)
  .then((result) => {
    return result._id;})
  .catch((error) => console.log(error.name));
};

const deleteUser = (id_to_delete) => {
  services.deleteUserById(id_to_delete)
  .then((result) => {
    if (result) return true;
    else return false;
  })
  .catch((error) => console.log(error.name));
};

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
  services.getUsers(name, job)
  .then((result) =>{
    console.log(result)
    if (result) res.status(200).send(result);
    else res.status(404).send();
  })
  .catch((error) => console.log(error));
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
  userToAdd.id = addUser(userToAdd);
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