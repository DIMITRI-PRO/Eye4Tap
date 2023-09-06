## Figma

Design: [Lien vers le design](https://www.figma.com/file/jYmmSaHYxEUlsaakXWcTYJ/Eye-TAP-Game?type=design&node-id=0%3A1&mode=design&t=h9HLYsSAJAfk0RIv-1)

## Configuration et Utilisation

### Initialisation du Projet

- Dans VSCode, installez les plugins **Prettier - Code formatter** et **ESLint** et configurez-les.
- Clonez ce référentiel, puis entrez dans le dossier.
- Exécutez la commande `npm run setup`.
- _NB : Pour lancer le serveur backend, vous aurez besoin d'un fichier d'environnement contenant les informations d'identification de la base de données. Vous trouverez un modèle dans `backend/.env.sample`._

### Commandes Disponibles

- `setup` : Initialisation du frontend et du backend, ainsi que de tous les outils.
- `migrate` : Exécute le script de migration de la base de données.
- `migrate:clear` : Efface la base de données (supprime définitivement !!!).
- `dev` : Démarre les deux serveurs (frontend + backend) dans un seul terminal.
- `dev:front` : Démarre le serveur frontend React.
- `dev:back` : Démarre le serveur backend Express.
- `test:unit` : Teste les deux serveurs avec Jest.
- `test:front` : Teste l'application frontend.
- `test:back` : Teste l'application backend.
- `lint` : Exécute les outils de validation et refuse le code non propre (sera exécuté à chaque _commit_).
- `fix` : Corrige les erreurs du linter (exécutez-le si `lint` signale des problèmes dans votre code !).

### Outils

- _Concurrently_ : Permet d'exécuter plusieurs commandes simultanément dans la même interface en ligne de commande (CLI).
- _Husky_ : Permet d'exécuter des commandes spécifiques déclenchées par des événements _git_.
- _Vite_ : Alternative à _Create-React-App_, regroupe moins d'outils pour une expérience plus fluide.
- _ESLint_ : Outil de "qualité du code" qui garantit que les règles choisies seront respectées.
- _Prettier_ : Outil de "qualité du code" axé sur le guide de style.
- _ Airbnb Standard_ : L'une des normes les plus connues, même si elle n'est pas officiellement liée à ES/JS.
- _Nodemon_ : Permet de redémarrer le serveur à chaque mise à jour d'un fichier .js.

### À FAIRE

- Implémenter l'extension Jest dans VS pour le monorepo.
