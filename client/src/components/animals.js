import { useState, useEffect } from "react";
import SightingsForm from "./sightingsform.js";
import AnimalsForm from "./animalsform.js";
import SpeciesForm from "./speciesform.js";


function Animals() {
  
  const [editAnimalId, setEditAnimalId] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [toggle1, setToggle1] = useState(false);
  const [toggle, setToggle] = useState(false);



//API CALL - ALL FIELDS----------------------------------------------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/allfields")
    .then((response) => response.json())
    .then((fieldsData) => {
          setAllFields(fieldsData);
        });
}, []);

  
//API CALL - SPECIES TABLE-----------------------------------------------------------------------------------
//use if you want code to trigger if something channges on the webpage (ex: after typing, etc) 
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
  const addAnimal = (newAnimal) => {
    setAnimals((animal) => [...animals, newAnimal]);
  };


//set state to new sightings-------------------------------------------------------------------------------------------------
  const addSighting = (newSighting) => {
    setSightings((sighting) => [...sightings, newSighting]);
};


//set state to add new species-----------------------------------------------------------------------------------------------
  const addSpecies = (newSpecies) => {
    setSpecies((specie) => [...species, newSpecies]);
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

//Toggle Functions------------------------------------------------------------------------------------------------------
const showSpecies = (event) => {
  setToggle(!toggle);
}

const showAnimals = (event) => {
  setToggle1(!toggle1);
}




  return (
    <div className="animals">
      <h1> Endangered Animal Sightings </h1>


      <SightingsForm speciesArray={species} sendData={sendData} animalsArray={animals} saveSighting={addSighting}  />
      <button onClick={showSpecies}>Add New Species</button>       <button onClick={showAnimals}>Add New Animal</button>


      {toggle? <SpeciesForm saveSpecies={addSpecies}/> : ""}
      {toggle1?  <AnimalsForm speciesArray={species} saveAnimal={addAnimal} sendData={sendData}/> : ""}
    
      <div class="space">




      </div>
      <h3> List of Sightings </h3>
      <div class="space">


      </div>
     <div className="griddiv">
      <ul className="unordered">
        {allFields.map((oneAnimal) => {
          if (oneAnimal.id_animal === editAnimalId){
            return <SightingsForm speciesArray={species} sendData={sendData} animalsArray={animals} saveSighting={addSighting}/>
          } else {
            return (
            
              <div className="eachAnimalInfo">
              <li className="listItem" key={oneAnimal.id_animal}>
                <p className="oneAnimalText">{oneAnimal.nickname} the {oneAnimal.common_name}</p>
               
                  {/* <p className="oneAnimalText">{oneAnimal.common_name}</p> */}
                  <p className="oneAnimalText">Date: {oneAnimal.date_of_sighting}</p>
                  <p className="oneAnimalText">Sighter Email: {oneAnimal.sighter_email}</p>
                  <p className="oneAnimalText">Spotted in {oneAnimal.location_of_sighting}</p>
                  <p className="oneAnimalText">{oneAnimal.nickname} is {oneAnimal.healthy ? "in good health": "unwell"}</p>
                  

                {/* <button key={oneAnimal.id_animal} type="button" onClick={() =>{onEdit(oneAnimal)}}>EDIT</button> */}
              </li>
              </div>
            )
          }
        })}
      </ul>
      </div>
    </div>
  );
}

export default Animals;
