import { useState } from "react";
import {useEffect}  from  "react";


const Form = (props) => {

  const {initialAnimal = {
                          id_animal: null, 
                          nickname: "", 
                          animal_record_timestamp: "",
                          date_of_sighting: "",
                          location_of_sighting: "",
                          }} = props;


  // This is the original State with not initial student 
  const [animal, setAnimal] = useState(initialAnimal);
  const [species, setSpecies] = useState([]);
  const [animals, setAnimals] = useState([]);

  //create functions that handle the event of the user typing into the form//---------------------------------------------------------------------------
  const handleNicknameChange = (event) => {
    const nickname = event.target.value;
    setAnimal((animal) => ({ ...animal, nickname}));
  };

//event sighting//------------------------------------------------------------------------------------
  const handleDateOfSightingChange = (event) => {
    const date_of_sighting = event.target.value;
    setAnimal((animal) => ({ ...animal, date_of_sighting }));
  }

//location of sighting//-------------------------------------------------------------------------------
  const handleLocationOfSightingChange = (event) => {
    const location_of_sighting = event.target.value;
    setAnimal((animal) => ({ ...animal, location_of_sighting }));
  }

//email-----------------------------------------------------------------------------------
  const handleEmail = (event) => {
    const email = event.target.value;
    setAnimal((animal) => ({ ...animal, email}));
  }



//A function to handle animals post request----------------------------------------------------------------
  //need to call both urls in the backend, the queries are synchronous (sighting/animal, animal before sighting)
  //add error display next to submit button if the insert for one table fails
  //put both 
  const postAnimal = (newAnimal) => {
    console.log("I am in my post request");
    return fetch("http://localhost:8085/api/animals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnimal),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        console.log("postAnimal is working")
        props.saveAnimal(data);
      });
  };
  
//A function to handle SPECIES get request//-----------------------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/species")
    .then((response) => response.json())
    .then((speciesdata) => {
          setSpecies(speciesdata);
        });
}, []);


//ANIMALS get request setting animals state (A repeat)-----------------------------------------------------------------
useEffect(() => {
  fetch("http://localhost:8085/api/animals")
    .then((response) => response.json())
    .then((animals) => {
          setAnimals(animals);
        });
}, []);

//A function to handle the Update request//-----------------------------------------------------------------
    const updateAnimal = (existingAnimal) =>{
      return fetch(`http://localhost:8085/api/animals/${existingAnimal.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(existingAnimal)
        }).then((response) => {
            return response.json()
        }).then((data) => {
          console.log("From put request ", data);
          props.saveAnimal(data);
      });

  }

//Submit Button Event Handler----------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if(animal.id_animal){
      updateAnimal(animal);
    } else{
      postAnimal(animal);
    }
    
  };
//--------------------------------------------------------------------------------------------------------
//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//       <fieldset>

//         <label>Species</label>
//         <select>
//         {species.map((element) => {
//             return (
//               <option value={element.id_species}>
//                 {element.species_name}{" "}
//               </option>
//             );
//           })}
//           <option value={-1}>create a new animal</option>

//         </select>
        
      
//         <label>Animal Name</label>
//         <input
//           type="text"
//           id="add-animal-name"
//           placeholder="Animal Name"
//           required
//           value={animal.nickname}
//           onChange={handleNicknameChange}
//         />

//         <label>Date of Sighting</label>
//         <input
//           type="date"
//           id="add-sighting-date"
//           placeholder="Sighting Date"
//           required
//           value={animal.date_of_sighting}
//           onChange={handleDateOfSightingChange}
//         />

//         <label>Location of Sighting</label>
//         <input
//           type="text"
//           id="add-location-text"
//           placeholder="Animal Location"
//           required
//           value={animal.location_of_sighting}
//           onChange={handleLocationOfSightingChange}
//         />


//       </fieldset>
//       <button type="submit">{!animal.id_animal ? "ADD": "SAVE"}</button>
//     </form>
//     </div>
//   );
// };

return (
  <div>
  <form onSubmit={handleSubmit}>
    <fieldset>
    
      <label>Animal Name</label>
         <select>
         {animals.map((element) => {
             return (
               <option value={element.id_animal}>
                 {element.nickname}{" "}
               </option>
             );
           })}
           <option value={-1}>create a new animal</option>
         </select>

      <label>Date of Sighting</label>
      <input
        type="date"
        id="add-sighting-date"
        placeholder="Sighting Date"
        required
        value={animal.date_of_sighting}
        onChange={handleDateOfSightingChange}
      />

      <label>Location of Sighting</label>
      <input
        type="text"
        id="add-location-text"
        placeholder="Animal Location"
        required
        value={animal.location_of_sighting}
        onChange={handleLocationOfSightingChange}
      />

      <label>Your Email</label>
      <input
        type="email"
        id="add-email"
        placeholder="Sighter Email"
        required
        value={animal.sighter_email}
        onChange={handleEmail}
      />


    </fieldset>
    <button type="submit">{!animal.id_animal ? "ADD": "SAVE"}</button>
  </form>
  </div>
);
};

export default Form;
