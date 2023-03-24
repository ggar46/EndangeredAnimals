import {useState, useEffect} from 'react';

const SpeciesForm = () => {
    
    const speciesDefault = {       
                            common_name: "", 
                            species_name: "",
                            number_in_wild: "",
        };

    const [species, setSpecies] = useState(speciesDefault);

    //Common Name Event Listener ________________________________________________________________
    const handleCommonName = (event) => {
        const common_name = event.target.value;
        setSpecies((species) => ({...species, common_name}));
    }

    //Species Name Event Listener ________________________________________________________________
    const handleSpeciesName = (event) => {
        const species_name = event.target.value;
        setSpecies((species) => ({...species, species_name}));
    }

    //Species Name Event Listener ________________________________________________________________
    const handleNumberInWild = (event) => {
        const number_in_wild = event.target.value;
        setSpecies((species) => ({...species, number_in_wild}));
    }


    return(
        <div>

        </div>
    )

}

export default SpeciesForm;

























// import { useState } from "react";
// import {useEffect}  from  "react";


// const Form = (props) => {

//   const initialSighting = {
                       
//                           nickname: "", 
//                           animal_record_timestamp: "",
//                           date_of_sighting: "",
//                           location_of_sighting: "",
//                           id_animal: "",
//                           healthy: "",
//                           };


//   // This is the original State with not initial student 
//   const [sighting, setSighting] = useState(initialSighting);
//   //const [sighting, setSighting] = useState([]);
  

//   //create functions that handle the event of the user typing into the form//---------------------------------------------------------------------------
//   // const handleNicknameChange = (event) => {
//   //   const nickname = event.target.value;
//   //   setAnimal((animal) => ({ ...animal, nickname}));
//   // };

// //event sighting//------------------------------------------------------------------------------------
//   const handleDateOfSightingChange = (event) => {
//     const date_of_sighting = event.target.value;
//     setSighting((sighting) => ({ ...sighting, date_of_sighting }));
//   }

// //location of sighting//-------------------------------------------------------------------------------
//   const handleLocationOfSightingChange = (event) => {
//     const location_of_sighting = event.target.value;
//     setSighting((sighting) => ({ ...sighting, location_of_sighting }));
//   }

// //email-----------------------------------------------------------------------------------
//   const handleEmail = (event) => {
//     const email = event.target.value;
//     setSighting((sighting) => ({ ...sighting, email}));
//   }

// //health---------------------------------------------------------------------------------
//   const handleSightingHealth = (event) => {
//     const healthy = event.target.value;
//     setSighting((sighting) => ({ ...sighting, healthy}));
//   }


// //event handler for animal  dropdown----------------------------------------------------------------------------
// //if there is a nickname chosen, add to animals state using
// //if there is no nickname chosen from animals,  
// //is sending nickname and associating id to sighting
// // const handleAnimalIdDropdown = (event) => {
// //   const selection = event.value;
// //   setSighting(selection);
// // }


// //A function to handle animals post request----------------------------------------------------------------
//   //need to call both urls in the backend, the queries are synchronous (sighting/animal, animal before sighting)
//   //add error display next to submit button if the insert for one table fails
//   //put both 
//   // const postAnimal = (newAnimal) => {
//   //   console.log("I am in my post request");
//   //   return fetch("http://localhost:8085/api/animals", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(newAnimal),
//   //   })
//   //     .then((response) => {
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       console.log("From the post ", data);
//   //       console.log("postAnimal is working")
//   //       props.saveAnimal(data);
//   //     });
//   // };
  
// //POST request to handle SIGHTINGS get request//-----------------------------------------------------------------
// const postSighting = (newSighting) => {
//   console.log("I am in my post request");
//   return fetch("http://localhost:8085/api/postsightings", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(newSighting),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log("From the post ", data);
//       console.log("postSighting is working")
//       setSighting((sighting) => ({ ...sighting, data}));
//     });
// };


// //ANIMALS get request setting animals state (A repeat)-----------------------------------------------------------------
// useEffect((props) => {
//   fetch("http://localhost:8085/api/sightings")
//     .then((response) => response.json())
//     .then((sightings) => {
//           props.sendData(sightings);
//         });
// }, []);

// //A function to handle the Update request//-----------------------------------------------------------------
//   //   const updateAnimal = (existingAnimal) =>{
//   //     return fetch(`http://localhost:8085/api/animals/${existingAnimal.id}`, {
//   //         method: 'PUT',
//   //         headers: {'Content-Type': 'application/json'}, 
//   //         body: JSON.stringify(existingAnimal)
//   //       }).then((response) => {
//   //           return response.json()
//   //       }).then((data) => {
//   //         console.log("From put request ", data);
//   //         props.saveAnimal(data);
//   //     });

//   // }


// //Submit Button Event Handler----------------------------------------------------------------------------
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postSighting(sighting);
//     // if(animal.id_animal){
//     //   updateAnimal(animal);
//     // } else{
//     //   postAnimal(animal);
//     // }
    
//   };
// //--------------------------------------------------------------------------------------------------------
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
//           <option value={-1}>add a new species</option>

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


// return to sightings
// need to add species dropdown and also make 
// return (
//   <div  id="formdiv">
//   <form onSubmit={handleSubmit}>
//     <fieldset>
    

//     {/* referencing array of animals from the animals.js component passed as props (columns nickname and id) */}
//       <label>Animal Name</label>
//          <select>
//          {props.animalsArray.map((element) => {
//              return (
//                <option value={element.id_animal}>
//                  {element.nickname}
//                </option>
//              );
//            })}
//            <option value={-1}>create a new animal</option>
//          </select>


//       <label>Species</label>
//         <select>
//         {props.speciesArray.map((element) => {
//             return (
//               <option value={element.id_species}>
//                 {element.species_name}{" "}
//               </option>
//             );
//           })}
//           <option value={-1}>add a new species</option>
//         </select>

//       <label>Date of Sighting</label>
//       <input
//         type="date"
//         id="add-sighting-date"
//         placeholder="Sighting Date"
//         required
//         value={sighting.date_of_sighting}
//         onChange={handleDateOfSightingChange}
//       />

//       <label>Location of Sighting</label>
//       <input
//         type="text"
//         id="add-location-text"
//         placeholder="Animal Location"
//         required
//         value={sighting.location_of_sighting}
//         onChange={handleLocationOfSightingChange}
//       />

//       <label>Your Email</label>
//       <input
//         type="email"
//         id="add-email"
//         placeholder="Sighter Email"
//         required
//         value={sighting.sighter_email}
//         onChange={handleEmail}
//       />

//       <label>Health</label>
//       <input
//         type="text"
//         id="add-health"
//         placeholder="Health Status"
//         required
//         value={sighting.healthy}
//         onChange={handleSightingHealth}
//       />

//           {/* <img id="redpanda" src="https://images.ctfassets.net/cnu0m8re1exe/c175AfE5netP1i6bvd5tc/84a983d021f09be04717afa9374b4473/red_panda_lead.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill"></img> */}

//     </fieldset>
   
//     <button id="submitSighting" type="submit">{!sighting.id_sighting ? "ADD SIGHTING": "SAVE SIGHTING"}</button>
//   </form>
//   </div>
// );
// };

// export...


