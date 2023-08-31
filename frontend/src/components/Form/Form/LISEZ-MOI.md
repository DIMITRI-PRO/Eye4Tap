# Readme - Forms Component

Le composant `Form` est un composant React qui facilite la création de formulaires en encapsulant la logique de gestion des soumissions et la gestion des erreurs. Il prend en charge la gestion des champs de formulaire, la validation des données et la gestion des messages d'erreur.

## Installation

Pour utiliser le composant `Form`, vous devez d'abord l'installer dans votre application React.

1. Copiez le code du composant `Form` dans votre projet.

2. Importez le composant `Form` et utilisez-le dans votre code :

   ```jsx
   import React from "react";
   import PropTypes from "prop-types";
   import { Form } from "chemin-vers-le-fichier/Form";

   const MyForm = () => {
     const handleSubmit = (data) => {
       // Gérer la soumission du formulaire
       console.log(data);
     };

     return <Form onSubmit={handleSubmit}>{/* Contenu du formulaire */}</Form>;
   };

   export default MyForm;
   ```

## Utilisation

Le composant `Form` prend en charge les fonctionnalités suivantes :

- Soumission du formulaire : Le composant gère la soumission du formulaire en écoutant l'événement `submit` et en appelant la fonction `onSubmit` avec les données du formulaire en tant qu'argument.

- Gestion des champs de formulaire : Vous pouvez inclure des champs de formulaire à l'intérieur du composant `Form` en utilisant le composant `FormItem`. Le composant `FormItem` encapsule la logique de rendu des champs de formulaire, y compris les étiquettes, les messages d'erreur et les types de champs.

- Validation des données : Vous pouvez spécifier les règles de validation pour chaque champ de formulaire en utilisant les attributs `required` et `readOnly` du composant `FormItem`. Les messages d'erreur correspondants seront affichés en cas de validation incorrecte.

- Personnalisation : Vous pouvez personnaliser l'apparence des champs de formulaire en utilisant des classes CSS ou en ajoutant des styles spécifiques.

## Exemples

Voici un exemple d'utilisation du composant `Form` avec des champs de formulaire :

```jsx
import React from "react";
import { Form, FormItem } from "chemin-vers-le-fichier/Form";

const MyForm = () => {
  const handleSubmit = (data) => {
    // Gérer la soumission du formulaire
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem label="Nom" type="text" dataName="name" required />

      <FormItem label="Email" type="email" dataName="email" required />

      <FormItem
        label="Mot de passe"
        type="password"
        dataName="password"
        required
      />

      <button type="submit">Soumettre</button>
    </Form>
  );
};

export default MyForm;
```

## Props

### Form

- `onSubmit` (fonction) : La fonction de rappel à appeler lors de la soumission du formulaire. Les données du formulaire seront passées en tant qu'argument.

### FormItem

- `label` (chaîne) : L'étiquette du champ de formulaire.
- `type` (chaîne) : Le type de champ de formulaire (par défaut : "text").
- `dataName` (chaîne, requis) : Le nom du champ de formulaire.
- `defaultValue` (nœud) : La valeur par défaut du champ de formulaire.
- `errorMessage` (objet) : L'objet contenant le message d'erreur associé au champ de formulaire.
- `required` (booléen) : Indique si le champ de formulaire est requis.
- `readOnly` (booléen) : Indique si le champ de formulaire est en lecture seule.

---

Ceci est un guide de base pour utiliser le composant `Form` dans votre application React. N'hésitez pas à adapter le code en fonction de vos besoins spécifiques. Vous pouvez également consulter les propTypes des composants pour obtenir plus d'informations sur les props disponibles.

**Note :** N'oubliez pas d'installer la dépendance `prop-types` avant d'utiliser le composant `Form`.
