Instructions pour lancer en local 
fais un git clone du repo 
navigue dans le dossier a la racine du fichier index.js
tape la commande npm install 


Concernant la bdd, il faut installer le logiciel pgadmin et appliquer les configurations correpondante
ensuite il faut rentrer dans le dossier migrations_v1 en faisant un cd migrations_v1
initialiser le logicial sqitch en lisant la documentation de sqitch qui est assez claire
taper la commande createdb nom_de_la_bdd et une bdd sera automatiquement creer sur pgadmin
ensuite lancer la commande sqitch deploy:db:pg:nom_de_la_bdd 

Sortir du dossier migrations_v1 en tapant la commande cd ../ ensuite vous allez retourner a la racine de index.js 

lancer la commande npx nodemon index.js et le serveur sera lancé
