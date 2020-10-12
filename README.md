Instructions pour lancer en local 
fais un git clone du repo 
pour voir les dossiers disponible, taper la commande ls et les dossiers seront afficher, continue a taper ls jusqa que tu trouve le fichier index.js
qd tu est arrivé a la racine du projet (tu sera ca lorsque tu tape ls, index.js sera affich'),tape la commande npm install 


Concernant la bdd, il faut installer le logiciel pgadmin et appliquer les configurations correpondante
ensuite il faut rentrer dans le dossier migrations_v1 en faisant un cd migrations_v1
initialiser le logicial sqitch en lisant la documentation de sqitch qui est assez claire
taper la commande createdb nom_de_la_bdd et une bdd sera automatiquement creer sur pgadmin
ensuite lancer la commande sqitch deploy:db:pg:nom_de_la_bdd 

Sortir du dossier migrations_v1 en tapant la commande cd ../ ensuite vous allez retourner a la racine de index.js 

lancer la commande npx nodemon index.js et le serveur sera lancé
