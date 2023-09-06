# MVC Express

## Description

Ce référentiel est une structure MVC Express simple créée à partir de zéro.

## Étapes

1. Clonez ce référentiel depuis GitHub.

2. Exécutez `npm install` ou `yarn install` pour installer les dépendances nécessaires.

3. Créez un fichier `.env` en copiant le contenu du fichier `.env.sample` et ajoutez vos paramètres de base de données. Assurez-vous de ne pas supprimer le fichier `.env.sample`, car il doit être conservé.

   Exemple de contenu pour `.env` :

   ```plaintext
   APP_PORT=5000
   FRONTEND_URL=http://localhost:3000
   DB_HOST=YOUR_DB_HOST
   DB_PORT=YOUR_DB_PORT
   DB_USER=YOUR_DB_USER
   DB_PASSWORD=YOUR_DB_PASSWORD
   DB_NAME=YOUR_DB_NAME
   NAME_COOKIE=YOUR_NAME_COOKIE
   JWT_SECRET=YOUR_JWT_SECRET
   EXPIRE_TIME=86400
   ACTIVE_TOKEN=true
   ```

4. Personnalisez le fichier `_database.sql` avec vos propres tables. Vous pouvez importer le script dans votre serveur SQL soit manuellement, soit en exécutant le script _migrate_ à l'aide de la commande `npm run migrate` ou `yarn run migrate`.

5. Démarrez le serveur en mode développement avec `npm run dev` ou `yarn run dev`. Cela exécutera le fichier `index.js` en utilisant _nodemon_.

6. Accédez à `localhost:5000` dans votre navigateur préféré.

7. À partir de ce kit de démarrage, vous pouvez créer votre propre application web.

### Utilisateurs Windows

Si vous développez sous Windows, nous vous recommandons de configurer Git pour changer vos règles de fin de ligne avec la commande suivante :

```
git config --global core.autocrlf true
```

## Modèle

Voici un exemple de modèle. Il utilise des classes et des méthodes pour définir les requêtes et la connexion à la base de données. Le fichier modèle se trouve dans `src/models/AbstractManager.js`. Chaque dossier de modèle doit être organisé comme suit :

1. Le nom du dossier doit correspondre au nom de la classe étendue et être au pluriel (par exemple, "Items").

2. Dans ce dossier, créez un fichier `index.js`.

3. Importez le package Joi pour les schémas et les validations.

4. Spécifiez le schéma et la table dans le constructeur.

### Exemple

Chemin : `src/models/Items/index.js`

```javascript
import Joi from "joi";
import AbstractManager from "../AbstractManager.js";

class Items extends AbstractManager {
  constructor() {
    super({
      table: "items",
      schema: Joi.object({
        name: Joi.string().max(45).required(),
        description: Joi.string().max(45).required(),
      }),
    });
  }
}

export default new Items();
```

## Contrôleurs

Voici un exemple de contrôlleur. Il utilise un mappage sur les dossiers et en reprend le nom comme nom de route principal. Le fichier `src/controllers/index.js` permet ceci. Chaque dossier de contrôleur doit être organisé comme suit :

1. Le nom du dossier doit être en minuscule et avoir un nom explicite (par exemple, "items").

2. Dans ce dossier, créez un fichier `index.js`.

3. Importez le modèle et autre fonction.

4. L'export du fichier doit être fait de la manière (!! Important !! on déclare name + Controllers).

### Exemple

Chemin : `src/models/Items/index.js`

```javascript
import models from "../../models/index.js";

const { Items } = models;
const { validateSchema } = Items;

// ... reste du code

const itemsControllers = (router) => {
  router.route("/").get(getItems).post(validateSchema, postItem);
  router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

  return router;
};

export default { itemsControllers };
```

## Methode de base

Dans cette section, nous décrirons les principales méthodes de la classe `AbstractManager` qui vous permettent de gérer les opérations CRUD sur une table de base de données.

### `insert(body)`

- Cette méthode permet d'insérer une nouvelle ligne dans la table de base de données.
- Elle prend en paramètre un objet `body` contenant les données à insérer.
- La méthode formate la requête d'insertion et les valeurs correspondantes à partir de l'objet `body`.
- La requête SQL est ensuite exécutée pour effectuer l'insertion.

### `find({ selector = "", by = null, options = null })`

- Cette méthode permet de rechercher des données dans la table de base de données.
- Elle accepte trois paramètres optionnels :
  - `selector` : spécifie les colonnes à sélectionner dans la requête (par défaut, sélectionne toutes les colonnes).
  - `by` : spécifie les critères de recherche pour filtrer les résultats (par exemple, `{ id: 1 }`).
  - `options` : permet de définir des options de recherche avancées, telles que la pagination ou le tri.
- La méthode formate la requête de recherche en fonction des paramètres fournis et exécute la requête SQL correspondante.
- Elle renvoie les données correspondantes ainsi que des informations sur le nombre total de résultats.

### `update(body)`

- Cette méthode permet de mettre à jour des données existantes dans la table de base de données.
- Elle prend en paramètre un objet `body` contenant les données à mettre à jour, y compris l'ID de la ligne à modifier.
- La méthode formate la requête de mise à jour et les valeurs correspondantes à partir de l'objet `body`.
- La requête SQL est ensuite exécutée pour effectuer la mise à jour.

### `delete(id)`

- Cette méthode permet de supprimer une ligne de la table de base de données en spécifiant son ID.
- Elle prend en paramètre l'ID de la ligne à supprimer.
- La méthode formate la requête de suppression et exécute la requête SQL correspondante.

### `validateSchema(req, res, next)`

- Cette méthode est utilisée comme middleware pour valider les données avant de les insérer ou de les mettre à jour.
- Elle prend en paramètre les objets `req` et `res` de la requête HTTP et la fonction `next` pour passer au middleware suivant.
- La méthode utilise un schéma de validation pour vérifier si les données sont valides.
- En cas d'erreur de validation, elle renvoie une réponse avec les détails des erreurs. Sinon, elle appelle la fonction `next` pour poursuivre la gestion de la requête.

### `setConnection(connection)`

- Cette méthode permet de définir la connexion à la base de données à utiliser pour les opérations de la classe.
- Elle prend en paramètre un objet `connection` représentant la connexion à la base de données.
