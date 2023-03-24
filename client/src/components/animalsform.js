import {useState} from 'react';

const AnimalsForm = (props) => {
    
    const animalsDefault = {       
                            id_species: null, 
                            nickname: "",
        };

    const [animals, setAnimals] = useState(animalsDefault);

    //species id event handler (dropdown)____________________________________________________
    const handleSpeciesId = (event) => {
        console.log("it's not the event handler or rendered portion, hmmm", event.target.value)
        // const id_species = event.target.value;
        // setAnimals((animals) => ({...animals, id_species}));
    };

    //species nickname (text entry)____________________________________________________
    const handleNickname = (e) => {
        const nickname = e.target.value;
        setAnimals((animals) => ({ ...animals, nickname}));
    };


    //POST request to handle new animals
    const postAnimal = (newAnimal) => {
        return fetch("http://localhost:8085/api/postanimals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnimal),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            props.saveAnimal(data);
          });
        };
    


    //Submit Button Event Handler----------------------------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        postAnimal(animals);
        }


    
    return(
        <div id="formdiv">
        <h3>Add a new animal</h3>

            <form onSubmit={handleSubmit}>
            <fieldset>


            <label>Animal Nickname</label>
            <input
              type="text"
              id="add-nickname"
              placeholder="Nickname"
              required
              value={animals.nickname}
              onChange={handleNickname}
            />

 
            <label>Species</label>
              <select onChange={handleSpeciesId}>
              {props.speciesArray.map((element) => {
                  return (
                    <option value={element.id_species}>
                      {element.species_name}
                    </option>
                  );
            })}
            </select> 

            </fieldset>
            <button id="submitAnimal" type="submit">{!animals.id_animals ? "ADD ANIMAL": "SAVE ANIMAL"}</button>
            </form>
            
        </div>
    )

}

export default AnimalsForm;