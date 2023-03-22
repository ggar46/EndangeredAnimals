import { useState } from "react";

const Form = (props) => {

  const {initialAnimal = {
                          id_animal: null, 
                          nickname: "", 
                          animal_record_timestamp: "",
                          date_of_sighting: "",
                          location_of_sighting: "",
                          healthy: false}} = props;


  // This is the original State with not initial student 
  const [animal, setAnimal] = useState(initialAnimal);

  //create functions that handle the event of the user typing into the form//---------------------------------------------------------------------------
  const handleNicknameChange = (event) => {
    const nickname = event.target.value;
    setAnimal((animal) => ({ ...animal, nickname}));
  };


////------------------------------------------------------------------------------------
  const handleTimestampChange = (event) => {
    const animal_record_timestamp = event.target.value;
    setAnimal((animal) => ({ ...animal, animal_record_timestamp }));
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

//health of animal-----------------------------------------------------------------------------------
  const handleHealth = (event) => {
    const healthy = event.target.value;
    setAnimal((animal) => ({ ...animal, healthy}));
  }



//A function to handle the post request----------------------------------------------------------------
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
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>

        <label>Animal Name</label>
        <input
          type="text"
          id="add-animal-name"
          placeholder="Animal Name"
          required
          value={animal.nickname}
          onChange={handleNicknameChange}
        />

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

        <label>Health</label>
        <input
          type="text"
          id="add-health"
          placeholder="Animal Health"
          required
          value={animal.healthy}
          onChange={handleHealth}
        />


        <label>Animal Record Timestamp</label>
        <input
          type="date"
          id="add-record-timestamp"
          placeholder="Timestamp"
          required
          value={animal.animal_record_timestamp}
          onChange={handleTimestampChange}
        />
      </fieldset>
      <button type="submit">{!animal.id_animal ? "ADD": "SAVE"}</button>
    </form>
  );
};

export default Form;
