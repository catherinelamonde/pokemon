# Projet Pokémon API

Ce projet consiste à créer un serveur Node.js avec Express qui interagit avec l'API Pokémon pour récupérer des informations sur les Pokémons et les renvoyer sous forme de données JSON.

## Objectif

L'objectif de ce projet est de créer un serveur qui expose une API RESTful permettant aux clients de récupérer les types de Pokémon en fonction de leur nom.

## Instructions

Suivez ces étapes pour exécuter et tester le projet localement :

1. **Installation des dépendances** :

   - Assurez-vous d'avoir Node.js installé sur votre machine.
   - Installez les dépendances du projet en exécutant la commande suivante :

   ```sh
   npm install
   ```

2. **Exécution du serveur** :

   - Pour démarrer le serveur en mode développement avec TypeScript, utilisez la commande :

   ```sh
   npm start
   ```

## API Endpoints

- `GET /pokemon/:name` :
  - Renvoie les types d'un Pokémon spécifié par son nom.

## Structure du projet

- `app.ts` : Le fichier principal contenant le code du serveur.
- `tsconfig.json` : Configuration TypeScript.

## Dépendances principales

- **Express** : Framework Web pour Node.js.
- **Axios** : Bibliothèque HTTP pour effectuer des requêtes vers l'API Pokémon.

## Auteurs

Ce projet a été réalisé par Laetitia Constantin - Explor.AI
