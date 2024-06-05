// Note yuhec: La constante n'était pas nécessaire pour `express` et `axios`
import express, { Application, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { PokemonResponse, PokemonTypeInfos, PokemonTypeName } from "./types";

const app: Application = express();

app.get("/pokemon/:name", async (req: Request, res: Response) => {
  const name: string = req.params.name;

  try {
    const response: AxiosResponse<PokemonResponse> = await fetchPokemonData(name);
    
    if (response.status === 200) {
      const data: PokemonResponse = response.data;

      if (data && data.types) {
        const types: PokemonTypeName[] = getPokemonTypes(data);
        // res.status(200).send(JSON.stringify(types)); // Pour une réponse en une seule ligne
        res.status(200).json(types); // Note yuhec: .json peut être utilisé, sinon, au lieu de .send et JSON.stringify
      } else {
        // Note yuhec: 400 au lieu de 500
        res.status(400).send("Invalid Pokémon data structure");
      }
    } else {
      // Note yuhec: response.status au lieu de 500
      res.status(response.status).send("Failed to fetch Pokémon data");
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

const getPokemonTypes = (data: PokemonResponse): PokemonTypeName[] => {
  // Note yuhec: Alternative pour itérer sur la liste et JUSTE ajouter le nom du type à la liste, quand le prédicat (filter) est true
  return data.types.reduce((types: PokemonTypeName[], { type }: PokemonTypeInfos) => {
    if (type?.name) types.push(type.name); // Note yuhec: On peut éviter de faire typeInfo?.type?.name ou `typeInfo && typeInfo.type && typeInfo.type.name`
    return types;
  }, []);
};

const fetchPokemonData = async (name: string): Promise<AxiosResponse<PokemonResponse>> => {
  return axios.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`);
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
