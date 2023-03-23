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

//GET request - ANIMALS---------------------------------------------------------
//as long as both tables share a field, you can join on them, usually a key but doesn't have to be
app.get('/api/animals', cors(), async (req, res) => {
  try {
    const { rows: animal } = await 
    db.query('SELECT * FROM animal');
    //db.query('SELECT * FROM sightings LEFT JOIN animal ON sightings.id_animal=animal.id_animal');
    res.send(animal);
  } catch (e) {
    return res.status(400).json({ e });
  }
});


//GET request - SIGHTINGS+ANIMALS JOIN*-----------------------------------------------------
//cannot access all sightings, is this necessary to make post req. to this table?
// app.get('/api/sightings', cors(), async (req, res) => {
//   try {
//     const { rows: sightings } = await db.query('SELECT * FROM sightings');
//     res.send(sightings);
//   } catch (e) {
//     return res.status(400).json({ e });
//   }
// });


//GET request - SPECIES-----------------------------------------------------
app.get('/api/species', cors(), async (req, res) => {
  try {
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});



// //POST request - attempt to combine ANIMALS and SIGHTINGS-----------------------------------------------------------
// app.post('/api/sightingsanimal', cors(), async (req, res) => {
//   const client = await db.connect();

//   try {
//     await client.query('BEGIN');

//     const insertAnimals = `
//       INSERT INTO individuals(nickname) 
//       VALUES($1) 
//       ON CONFLICT (nickname) DO UPDATE SET nickname = Excluded.nickname
//       RETURNING id_animal
//     `;
//     const newAnimal = await client.query(insertAnimals, [req.body.nickname, newSpecies.rows[0].species_id]);






//     const insertSightings = `
//       INSERT INTO sightings(date_of_sighting, location_of_sighting, sighter_email, healthy, id_animal)
//       VALUES($1, $2, $3, $4, $5)
//       ON CONFLICT (date_of_sighting, location_of_sighting, sighter_email, healthy, id_animal) DO UPDATE SET date_of_sighting = Excluded.date_of_sighting
//       RETURNING sightings_id
//     `;
//     await client.query(insertSightings, 
//       [req.body.date_sighted, req.body.location, req.body.healthy, req.body.email, newIndividual.rows[0].individual_id]
//     );
//     await client.query('COMMIT');







//   } catch (e) {
//     await client.query('ROLLBACK');
//     throw e

//   } finally {
//     client.release();
//   }
//   res.status(200).send("New sighting was added successfully");
// });


//POST request - ANIMALS-----------------------------------------------------
//works
// app.post('/api/animals', cors(), async (req, res) => {
//   console.log("working")
//   const newAnimal = {
//     nickname: req.body.nickname,
//     animal_record_timestamp: req.body.animal_record_timestamp
//   };
  
//   const result = await db.query(
//     'INSERT INTO animal(nickname, animal_record_timestamp) VALUES($1, $2) RETURNING *',
//     [newAnimal.nickname, newAnimal.animal_record_timestamp],
//   );
//   console.log(result.rows[0]);
//   res.json(result.rows[0]);
// });

// POST request - SIGHTINGS-----------------------------------------------------
//does not work
//Recommendation: Put both post requests into the same one to make things easier front-end
app.post('/api/sightings', cors(), async (req, res) => {
  console.log("working")
   const newSighting = {
    date_of_sighting: req.body.date_of_sighting,
    location_of_sighting: req.body.location_of_sighting,
    healthy: req.body.healthy
  };
  const result = await db.query(
    'INSERT INTO sighting(date_of_sighting, location_of_sighting, healthy) VALUES($1, $2, $3) RETURNING *',
    [newSighting.date_of_sighting, newSighting.location_of_sighting, newSighting.healthy],
  );
  
  res.json(result.rows[0]);
});
  

//PUT request - Update an animal-----------------------------------------------------
app.put('/api/animals/:animal_Id', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const animal_Id = req.params.animal_Id
  const updatedAnimal = { nickname: req.body.nickname, animal_record_timestamp: req.body.animal_record_timestamp}
  console.log("In the server from the url - the student id", animal_Id);
  console.log("In the server, from the react - the student to be edited", updatedAnimal);
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE animal SET nickname=$1, animal_record_timestamp=$2 WHERE id=${animal_Id} RETURNING *`;
  const values = [updatedAnimal.nickname, updatedAnimal.animal_record_timestamp];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})



// console.log that your server is up and running-------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
