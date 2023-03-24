import { useState, useEffect } from "react";
import Form from "./form";

function Animals() {
  

  const [animals, setAnimals] = useState([]);
  const [editAnimalId, setEditAnimalId] = useState(null);
  const [species, setSpecies] = useState([]);


//API CALL - SPECIES TABLE-----------------------------------------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/species")
    .then((response) => response.json())
    .then((speciesdata) => {
          setSpecies(speciesdata);
        });
}, []);


//API CALL - ANIMALS table//--------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/animals")
    .then((response) => response.json())
    .then((animals) => {
          setAnimals(animals);
        });
}, []);

  const addAnimal = (newAnimal) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setAnimals((animal) => [...animals, newAnimal]);
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
  
////--------------------------------------------------------------------------------------------------------
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
      <h1> Animal Sightings </h1>

      <h3> Enter a new sighting! </h3>
      <Form speciesArray={species} sendData={sendData} animalsArray={animals} saveAnimal={addAnimal} />
      <h3> List of Sightings </h3>
      <ul>
        {animals.map((animal) => {
          if(animal.id_animal === editAnimalId){
            //something needs to happento allow the user edit that existing student
            // At some point I need to pass the update function as props - connect this to the backend
            return <Form initialAnimal={animal} saveAnimal={updateAnimal}/>
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
