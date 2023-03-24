import {useState, useEffect} from 'react';

const AnimalsForm = () => {
    
    const animalsDefault = {       
                            id_species: "", 
                            nickname: "",
        };

    const [animals, setAnimals] = useState(animalsDefault);


    return(
        <div>
            
        </div>
    )

}

export default AnimalsForm;