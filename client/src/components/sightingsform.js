import {useState} from 'react';

const SightingsForm = (props) => {
    
    const initialSighting = {
                       
        nickname: "", 
        date_of_sighting: "",
        location_of_sighting: "",
        id_animal: null,
        sighter_email: "",
        healthy: "",
        };

    const [sighting, setSighting] = useState(initialSighting);


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
    const sighter_email = event.target.value;
    setSighting((sighting) => ({ ...sighting, sighter_email}));
  }

    //health---------------------------------------------------------------------------------
  const handleSightingHealth = (event) => {
    const healthy = event.target.value;
    setSighting((sighting) => ({ ...sighting, healthy}));
  }


  //id---------------------------------------------------------------------------------
    const handleChange = (e) => {
        const id_animal = e.target.value;
        console.log("this is the animal id", e.target.value);
        setSighting((sighting) => ({ ...sighting, id_animal}));
    };


    //POST request to handle new SIGHTINGS//-----------------------------------------------------------------
    const postSighting = (newSighting) => {
    console.log("I am in my post request");
    return fetch("http://localhost:8085/api/postsightings", {
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
        props.saveSighting(data);
      });
    };

    //Submit Button Event Handler----------------------------------------------------------------------------
    const handleSubmit = (e) => {
    e.preventDefault();
    postSighting(sighting);
    }

    return (
        <div  id="formdiv">
        <form onSubmit={handleSubmit}>
        <h3> Enter a new sighting! </h3>
          <fieldset>
          {/* referencing array of animals from the animals.js component passed as props (columns nickname and id) */}
            <label>Animal Name</label>
               <select  onChange={handleChange}>
               {props.animalsArray.map((element) => {
                   return (
                     <option value={element.id_animal}>
                       {element.nickname}
                     </option>
                   );
                 })}
               </select>
      
      
            <label>Species</label>
              <select>
              {props.speciesArray.map((element) => {
                  return (
                    <option value={element.id_species}>
                      {element.common_name}{" "}
                    </option>
                  );
                })}
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
      
                {/* <img id="redpanda" src="https://images.ctfassets.net/cnu0m8re1exe/c175AfE5netP1i6bvd5tc/84a983d021f09be04717afa9374b4473/red_panda_lead.jpg?fm=jpg&fl=progressive&w=660&h=433&fit=fill"></img> */}
      
          </fieldset>
         
          <button id="submitSighting" type="submit">{!sighting.id_sighting ? "ADD SIGHTING": "SAVE SIGHTING"}</button>
        </form>
        </div>
      );
      };

export default SightingsForm;