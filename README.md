Projet 7 du parcours Web d'Openclassrooms 'Créez un réseau social d'entreprise'

Prerequis

- Pour le serveur : Node.js et Express framework
- Pour la base de données : MongoDB
- Pour le frontend : Vue.js (Vue Router, Vuex), Sass, Bootsrap et BootsrapVue

Installation :
Clonez ce projet depuis GitHub

Front-End:

À la racine du dossier frontend:  
npm install;  
npm run serve;

Ouvrir le navigateur à l'adresse `http://localhost:8080/`

Back-End:

À la racine du dossier backend:  
npm install;  
node ou nodemon server;

Accès serveur backend `http://localhost:3000/`

Base de données:

Connexion à MongoDB

Dans backend, creér un fichier .env et ajouter et personnaliser vos informations ajouter après "=" :  
• JWTTOKEN= mots de passe composé de chiffres, alphabet majuscule/minuscule,  
• USER_DB= votre nom d'utilisateur de la base de données,  
• PASSWORD_DB= votre mot de passe de la base de données

Pour importer le fichier avce des collections JSON posts et users

-sur ligne de commande:  
mongoimport (necessite installation de MongoDB Database Tools)  
ou  
sur MOngoDB Compas- creéer un nouveau Database et importer les collections users et posts en cliquant sur ADD DATA- Import file
