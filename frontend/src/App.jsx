import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, Link, useParams } from "react-router-dom";

const SpiritPage = () => {
  const { spiritId } = useParams();

  const [spirit, setSpirit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3000/spirits/${spiritId}`);
      const data = await response.json();

      setSpirit(data);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading && !spirit) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <h1>{spirit.name}</h1>
    </div>
  );
};

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [spirits, setSpirits] = useState([]);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    favoriteSpiritId: "",
  });

  useEffect(() => {
    // fetch data from http://localhost:3000/users

    const getUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    };

    const getSpirits = async () => {
      const response = await fetch("http://localhost:3000/spirits");
      const data = await response.json();

      setNewUser({
        ...newUser,
        favoriteSpiritId: data[0].id,
      });
      setSpirits(data);
    };

    const getData = async () => {
      await getUsers();

      await getSpirits();
    };

    getData();
  }, []);

  const onNewUserChange = (event) => {
    if (event.target.name === "favoriteSpiritId") {
      setNewUser({
        ...newUser,
        [event.target.name]: Number(event.target.value),
      });
      return;
    }

    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const create = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    setUsers([...users, data]);
  };

  // whenever you make a CRUD call like this
  // it's always like 3 steps
  // 1. make the backend endpoint to serve the fetch request
  // 2. make the fetch request
  // 3. update your state with the new data

  const onDelete = async (user) => {
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((userState) => userState.id !== user.id));
  };

  return (
    <>
      <form onSubmit={create}>
        <input
          name="firstName"
          value={newUser.firstName}
          onChange={onNewUserChange}
          placeholder="First name"
        />
        <input
          name="lastName"
          value={newUser.lastName}
          onChange={onNewUserChange}
          placeholder="Last name"
        />
        <select
          name="favoriteSpiritId"
          value={newUser.favoriteSpiritId}
          onChange={onNewUserChange}
        >
          {spirits.map((spirit) => (
            <option value={spirit.id} key={spirit.id}>
              {spirit.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>

      <ul>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/spirits/${user.favoriteSpiritId}`}>
              <li>
                {user.firstName} {user.lastName}
              </li>
            </Link>
            <button onClick={() => onDelete(user)}>X</button>
          </div>
        ))}
      </ul>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/spirits/:spiritId" element={<SpiritPage />} />
    </Routes>
  );
}

export default App;
