const express = require("express");
const axios = require("axios");
const app = express();

app.get("/pokemon/:name", async (req: any, res: any) => {
  const name = req.params.name;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (response.status === 200) {
      const data = response.data;

      if (data && data.types) {
        let types = [];
        for (let i = 0; i < data.types.length; i++) {
          if (data.types[i] && data.types[i].type && data.types[i].type.name) {
            types.push(data.types[i].type.name);
          }
        }

        res.status(200).send(JSON.stringify(types));
      } else {
        res.status(500).send("Invalid Pokémon data structure");
      }
    } else {
      res.status(500).send("Failed to fetch Pokémon data");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
