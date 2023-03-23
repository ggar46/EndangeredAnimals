import { useState } from "react";
import {useEffect}  from  "react";


const Form = (props) => {

  const {initialSighting = {
                       
                          nickname: "", 
                          animal_record_timestamp: "",
                          date_of_sighting: "",
                          location_of_sighting: "",
                          id_animal: "",
                          healthy: "",
                          }} = props;


  // This is the original State with not initial student 
  const [sighting, setSighting] = useState(initialSighting);
  //const [sightings, setSightings] = useState([]);
  

  //create functions that handle the event of the user typing into the form//---------------------------------------------------------------------------
  // const handleNicknameChange = (event) => {
  //   const nickname = event.target.value;
  //   setAnimal((animal) => ({ ...animal, nickname}));
  // };

//event sighting//------------------------------------------------------------------------------------
  const handleDateOfSightingChange = (event) => {
    const date_of_sighting = event.target.value;
    setSighting((sighting) => ({ ...sighting, date_of_sighting }));
  }

//location of sighting//-------------------------------------------------------------------------------
  const handleLocationOfSightingChange = (event) => {
    const location_of_sighting = event.target.value;
    setSighting((sighting) => ({ ...sighting, location_of_sighting }));
  }

//email-----------------------------------------------------------------------------------
  const handleEmail = (event) => {
    const email = event.target.value;
    setSighting((sighting) => ({ ...sighting, email}));
  }

//health---------------------------------------------------------------------------------
  const handleSightingHealth = (event) => {
    const healthy = event.target.value;
    setSighting((sighting) => ({ ...sighting, healthy}));
  }


//event handler for animal  dropdown----------------------------------------------------------------------------
//if there is a nickname chosen, add to animals state using
//if there is no nickname chosen from animals,  
//is sending nickname and associating id to sighting
const handleAnimalIdDropdown = (event) =>{
  const selection = event.value;
  setSighting(selection);
}


//A function to handle animals post request----------------------------------------------------------------
  //need to call both urls in the backend, the queries are synchronous (sighting/animal, animal before sighting)
  //add error display next to submit button if the insert for one table fails
  //put both 
  // const postAnimal = (newAnimal) => {
  //   console.log("I am in my post request");
  //   return fetch("http://localhost:8085/api/animals", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newAnimal),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("From the post ", data);
  //       console.log("postAnimal is working")
  //       props.saveAnimal(data);
  //     });
  // };
  
//POST request to handle SIGHTINGS get request//-----------------------------------------------------------------
const postSighting = (newSighting) => {
  console.log("I am in my post request");
  return fetch("http://localhost:8085/api/sightings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSighting),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("From the post ", data);
      console.log("postSighting is working")
      setSighting((sighting) => ({ ...sighting, data}));
    });
};


//ANIMALS get request setting animals state (A repeat)-----------------------------------------------------------------
useEffect((props) => {
  fetch("http://localhost:8085/api/sightings")
    .then((response) => response.json())
    .then((sightings) => {
          props.sendData(sightings);
        });
}, []);

//A function to handle the Update request//-----------------------------------------------------------------
  //   const updateAnimal = (existingAnimal) =>{
  //     return fetch(`http://localhost:8085/api/animals/${existingAnimal.id}`, {
  //         method: 'PUT',
  //         headers: {'Content-Type': 'application/json'}, 
  //         body: JSON.stringify(existingAnimal)
  //       }).then((response) => {
  //           return response.json()
  //       }).then((data) => {
  //         console.log("From put request ", data);
  //         props.saveAnimal(data);
  //     });

  // }


//Submit Button Event Handler----------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    postSighting(sighting);
    // if(animal.id_animal){
    //   updateAnimal(animal);
    // } else{
    //   postAnimal(animal);
    // }
    
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


//return to sightings
//need to add species dropdown and also make 
return (
  <div  id="formdiv">
  <form onSubmit={handleSubmit}>
    <fieldset>
    

    {/* referencing array of animals from the animals.js component passed as props (columns nickname and id) */}
      <label>Animal Name</label>
         <select onChange={handleAnimalIdDropdown}>
         {props.animalsArray.map((element) => {
             return (
               <option value={element.id_animal}>
                 {element.nickname}
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
        value={sighting.date_of_sighting}
        onChange={handleDateOfSightingChange}
      />

      <label>Location of Sighting</label>
      <input
        type="text"
        id="add-location-text"
        placeholder="Animal Location"
        required
        value={sighting.location_of_sighting}
        onChange={handleLocationOfSightingChange}
      />

      <label>Your Email</label>
      <input
        type="email"
        id="add-email"
        placeholder="Sighter Email"
        required
        value={sighting.sighter_email}
        onChange={handleEmail}
      />

      <label>Health</label>
      <input
        type="text"
        id="add-health"
        placeholder="Health Status"
        required
        value={sighting.healthy}
        onChange={handleSightingHealth}
      />


    </fieldset>
    <button type="submit">{!sighting.id_sighting ? "ADD": "SAVE"}</button>
  </form>
  </div>
);
};

export default Form;
