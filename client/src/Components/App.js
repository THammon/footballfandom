import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar"
import ConferenceContainer from "./ConferenceContainer"
import UserContainer from "./UserContainer";
import Signup from "./Signup";
import Login from "./Login";
import FieldContainer from "./FieldContainer";



function App() {
  const [currentUser, setCurrentUser] = useState(false)
  const [errors, setErrors] = useState(false)
  const [fields, setFields] = useState([])
  const [conferences, setConferences] = useState([])
  const [rivalries, setRivalries] = useState([])
  const [search, setSearch] = useState("")
  const [beenTo, setBeenTo] = useState([])
  const [wantToGo, setWantToGo] = useState([])

  useEffect(() => {
    fetch("/fields")
    .then((r) => r.json())
    .then((data) => setFields(data))
  },[])

  useEffect(() => {
    fetch("/rivalries")
    .then((r) => r.json())
    .then((data) => setRivalries(data))
  },[])

  useEffect(() => {
    fetch("/conferences")
    .then((r) => r.json())
    .then((data) => setConferences(data))
  },[])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    }).then(() => {
      fetch(`/users/${currentUser.id}`)
     .then(res => {
        if(res.ok){
          res.json().then(user => {
              setCurrentUser(user)
            })
        }else {
            res.json().then(data => setErrors(data.error))
        }
    })
    })
  }, [fields]);

  function addNewFields(newFieldObj){
    setFields([...newFieldObj])
  }

  function addNewConf(newConfObj){
    setConferences(prev => [...prev, newConfObj])
  }

  function addNewRival(newRivalObj){
    setRivalries(prev =>[...prev, newRivalObj])
  }



  const displayedFields = fields?.filter((field) => {
    return field?.field_name?.toLowerCase().includes(search.toLowerCase())
  })

  const updateUser = (user) => setCurrentUser(user)

  return (
    <div className="App">
      <NavBar currentUser={currentUser} updateUser = {updateUser}/>
      <Routes>
        <Route exact path = "/" element={<ConferenceContainer conferences={conferences} />}/>
        <Route path = "/UserContainer" element={<UserContainer errors = {errors} fields={fields} addNewFields={addNewFields} user={currentUser} rivalries={rivalries} conferences={conferences} addNewConf={addNewConf} addNewRival={addNewRival} beenTo={beenTo} wantToGo={wantToGo}/>}/>
        <Route path = "/fields/:conference" element={<FieldContainer rivalries={rivalries} fields={displayedFields} setSearch={setSearch} beenTo={beenTo} wantToGo={wantToGo} setBeenTo={setBeenTo} setWantToGo={setWantToGo} currentUser={currentUser}/>}/>
        <Route path = "/Login" element={<Login updateUser={updateUser}/>}/>
        <Route path = "/Signup" element={<Signup updateUser={updateUser}/>}/>
      </Routes>
    </div>

  );
}

export default App;

