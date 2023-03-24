import { useState, useEffect } from "react";
import SightingsForm from "./sightingsform.js";
import AnimalsForm from "./animalsform.js";
import SpeciesForm from "./speciesform.js";


function Animals() {
  
  const [editAnimalId, setEditAnimalId] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);


//API CALL - SPECIES TABLE-----------------------------------------------------------------------------------
//use if you want code to trigger if something channges on the webpage (ex: after typing, etc)
//ex: [pst request] - 
useEffect(() => {
  fetch("http://localhost:8085/api/species")
    .then((response) => response.json())
    .then((speciesdata) => {
          setSpecies(speciesdata);
        });
}, []);


//API CALL - ANIMALS table--------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/animals")
    .then((response) => response.json())
    .then((animalsdata) => {
          setAnimals(animalsdata);
        });
}, []);


//API CALL - SIGHTINGS table---------------------------------------------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/sightings")
    .then((response) => response.json())
    .then((sightingsdata) => {
          setSightings(sightingsdata);
        });
}, []);



//Set state to new animal-------------------------------------------------------------------------------------------------
  // const addAnimal = (newAnimal) => {
  //   setAnimals((animal) => [...animals, newAnimal]);
  // };


//set state to new sightings-------------------------------------------------------------------------------------------------
  const addSighting = (newSighting) => {
    setSightings((sighting) => [...sightings, newSighting]);
};

//A function to control the update in the parent (student component)--------------------------------
  const updateAnimal = (savedAnimal) =>{
    console.log("Line 29 savedAnimal", savedAnimal);
    // This function should update the whole list of students - 
    setAnimals((animals) => {
      const newArrayAnimals = [];
      for(let animal of animals){
        if(animal.id === savedAnimal.id){
          newArrayAnimals.push(savedAnimal);
        } else {
          newArrayAnimals.push(animal);
        }
      }
      return newArrayAnimals;
    })
    // This line is only to close the form;
    setEditAnimalId(null);
  }
  
//--------------------------------------------------------------------------------------------------------
  const onEdit = (animal) =>{
    console.log("This is line 26 on animal component", animal);
    const editingID = animal.id;
    console.log("Just the animal id", animal.id)
    setEditAnimalId(editingID);
  }

//handle the animals state function from other form component-------------------------------------------------------
  const sendData = (selection) => {
    setAnimals((selection) => [...animals, selection]);
  }


////--------------------------------------------------------------------------------------------------------
  return (
    <div className="animals">
      <h1> Endangered Animal Sightings </h1>

      <h3> Enter a new sighting! </h3>
      <SightingsForm speciesArray={species} sendData={sendData} animalsArray={animals} saveSighting={addSighting} /><AnimalsForm/><SpeciesForm/>


      

      <h3> List of Sightings </h3>
      <ul>
        {animals.map((animal) => {
          if(animal.id_animal === editAnimalId){
            //something needs to happento allow the user edit that existing student
            // At some point I need to pass the update function as props - connect this to the backend
            return <SightingsForm initialAnimal={animal} saveAnimal={updateAnimal}/>
          } else{
            return (
              <li key={animal.id_animal}>
           {animal.nickname} <button key={animal.id_animal} type="button" onClick={() =>{onEdit(animal)}}>EDIT</button>
              </li>
            )
          }
        })}
      </ul>
     
    </div>
  );
}

export default Animals;
