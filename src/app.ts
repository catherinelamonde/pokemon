// Note yuhec: La constante n'était pas nécessaire pour `express` et `axios`
import express, { Application, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { PokemonResponse, PokemonType } from "./types";

const app: Application = express();

app.get("/pokemon/:name", async (req: Request, res: Response) => {
  const name: string = req.params.name;

  try {
    const data: PokemonResponse = await fetchPokemonData(name);
    if (data && data.types) {
      const types: string[] = getPokemonTypes(data);
      // res.status(200).send(JSON.stringify(types)); // Pour une réponse en une seule ligne
      res.status(200).json(types); // Note yuhec: .json peut être utilisé, sinon, au lieu de .send et JSON.stringify
    } else {
      // Note yuhec: 400 au lieu de 500
      res.status(400).send("Invalid Pokémon data structure");
    }
  } catch (error) {
    console.error(error);
    // Note yuhec: Ajout de cette possibilité que ce soit une erreur Axios, dont le message d'erreur pourrait être utile au déboguage
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).send(error.message);
    } else {
      res.status(500).send("An internal server error occurred");
    }
  }
});

// Utils

const getPokemonTypes = (data: PokemonResponse): string[] => {
  return data.types
    .filter(typeInfo => typeInfo?.type?.name)
    .map(typeInfo => typeInfo.type.name);
};

const fetchPokemonData = async (name: string): Promise<PokemonResponse> => {
  const response: AxiosResponse<PokemonResponse> = await axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
