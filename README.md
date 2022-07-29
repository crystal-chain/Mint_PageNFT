Il s'agit de la page de Mint permettant à un utilisateur Channel enregistré de créer un NFT avec des caractéristiques précises.
Cette page est vouée à être implémentée dans la plateforme pour faire suite à l'application de traçabilité.

## Utiliser .env pour gérer les variables locales

npm install 
vim .env
REACT_APP_INFURA_KEY = <infura-key>
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
Puis vous pourrez lancer la page avec "npm start"

## Fonctionnement de la page

Il s'agit d'une SPA, la page création Front est visible dans Minter.js.
Les fonctions qui vont être appelées (Connexion Wallet, Transaction Contrat...) sont disponibles dans /utils .

## Relier cette page à un contrat.

Attention si vous avez modifier le contrat (Vous pouvez le faire avec le dépôt Deploy_SmartContrat), il vous faudra changer le fichier contract-abi.json et la variable "contractAddress" dans /utils/interact.js .
Pour trouver l'abi du contrat, il vous faut valider le contrat sur Etherscan.