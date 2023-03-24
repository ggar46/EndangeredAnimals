const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 8085;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api---------------------------------------
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});


//GET request - ALL TABLES---------------------------------------------------------
app.get('/api/allfields', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await 
    db.query('SELECT animal.nickname, species.common_name, sightings.date_of_sighting, sightings.location_of_sighting, sightings.healthy, sightings.sighter_email FROM sightings INNER JOIN animal ON sightings.id_animal=animal.id_animal INNER JOIN species ON species.id_species=animal.id_species');
    console.log
    res.send(sightings);
    console.log("All data coming up!", sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});



//GET request - ANIMALS---------------------------------------------------------
//as long as both tables share a field, you can join on them, usually a key but doesn't have to be
app.get('/api/animals', cors(), async (req, res) => {
  try {
    const { rows: animals } = await 
    db.query('SELECT * FROM animal');
    //db.query('SELECT * FROM sightings LEFT JOIN animal ON sightings.id_animal=animal.id_animal');
    res.send(animals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


//GET request - SIGHTINGS-----------------------------------------------------
//cannot access all sightings, is this necessary to make post req. to this table?
app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await 
    db.query('SELECT * FROM sightings');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});



//GET request - SPECIES-----------------------------------------------------
//working
app.get('/api/species', cors(), async (req, res) => {
  console.log("species route in backend")
  try {
    console.log("species route in backend")
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});



//POST request - ANIMAL-----------------------------------------------------
//works
app.post('/api/postanimals', cors(), async (req, res) => {
  console.log("working")
  const newAnimal = {
    id_species: req.body.id_species,
    nickname: req.body.nickname,
  };
  
  const result = await db.query(
    'INSERT INTO animal(id_species, nickname) VALUES($1, $2) RETURNING *',
    [newAnimal.id_species, newAnimal.nickname],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});




// POST request - SIGHTINGS-----------------------------------------------------
//does not work
//Recommendation: Put both post requests into the same one to make things easier front-end
app.post('/api/postsightings', cors(), async (req, res) => {
  console.log("post sightings is working")
   const newSighting = {
    id_animal: req.body.id_animal,
    date_of_sighting: req.body.date_of_sighting,
    location_of_sighting: req.body.location_of_sighting,
    sighter_email: req.body.sighter_email,
    healthy: req.body.healthy
  };
  const result = await db.query(
    'INSERT INTO sightings(id_animal, date_of_sighting, location_of_sighting, sighter_email, healthy) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [newSighting.id_animal, newSighting.date_of_sighting, newSighting.location_of_sighting, newSighting.sighter_email, newSighting.healthy],
  );
  
  res.json(result.rows[0]);
});
  



// POST request - SPECIES-----------------------------------------------------
//does not work
app.post('/api/postspecies', cors(), async (req, res) => {
  console.log("working")
   const newSpecies = {
    common_name: req.body.common_name,
    species_name: req.body.species_name,
    number_in_wild: req.body.number_in_wild
  };
  const result = await db.query(
    'INSERT INTO species(common_name, species_name, number_in_wild) VALUES($1, $2, $3) RETURNING *',
    [newSpecies.common_name, newSpecies.species_name, newSpecies.number_in_wild],
  );
  
  res.json(result.rows[0]);
});




// console.log that your server is up and running-------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




//PUT request - Update an animal-----------------------------------------------------
// app.put('/api/animals/:animal_Id', cors(), async (req, res) =>{
//   console.log(req.params);
//   //This will be the id that I want to find in the DB - the student to be updated
//   const animal_Id = req.params.animal_Id
//   const updatedAnimal = { nickname: req.body.nickname, animal_record_timestamp: req.body.animal_record_timestamp}
//   console.log("In the server from the url - the student id", animal_Id);
//   console.log("In the server, from the react - the student to be edited", updatedAnimal);
//   // UPDATE students SET lastname = "something" WHERE id="16";
//   const query = `UPDATE animal SET nickname=$1, animal_record_timestamp=$2 WHERE id=${animal_Id} RETURNING *`;
//   const values = [updatedAnimal.nickname, updatedAnimal.animal_record_timestamp];
//   try {
//     const updated = await db.query(query, values);
//     console.log(updated.rows[0]);
//     res.send(updated.rows[0]);

//   }catch(e){
//     console.log(e);
//     return res.status(400).json({e})
//   }
// })
