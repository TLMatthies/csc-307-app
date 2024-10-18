// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./form";


// src/MyApp.js (a new inner function inside MyApp())

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

function deleteUser(userId) {
  const promise = fetch("http://localhost:8000/users/"+userId,
                       {method: "DELETE", 
                        headers: { "Content-Type": "application/json",
                        },
                       });
  return promise;
}

function MyApp() {
  const [characters, setCharacters] = useState([
    ]);
    function removeOneCharacter(index) {
      deleteUser(characters[index].id)
      .then((res) => res.status == 204 ?
        index: undefined)
      .then((successful_index) => {
        const updated = characters.filter((characters, i) => {
          return i !== successful_index;
        });
        console.log("Delete");
        setCharacters(updated)
      })
      .catch((error) => {
        console.log(error);
      })
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => {
          setCharacters(res);
        })
        //.then((json) => {
        //  setCharacters(json);
        //})
        .catch((error) => { 
          console.log("Error");
          console.log(error); });
    });

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function updateList(person) {
      postUser(person)
        .then((res) => res.status == 201 ?
          res.json(): undefined)
        .then((json) => {
          console.log(json);
          setCharacters([...characters, json]);})
        .catch((error) => {
          console.log(error);
        })
  }

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );
}

export default MyApp;