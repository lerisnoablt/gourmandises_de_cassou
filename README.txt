LES GOURMANDISES DE CASSOU — VERSION 4 MULTI-PAGES

Cette version est séparée proprement en plusieurs fichiers :
- index.html : page d’accueil
- crepes.html : menu crêpes
- gaufres.html : menu gaufres
- milkshakes.html : menu milk-shakes
- jus.html : menu jus locaux
- formules.html : formules personnalisables
- paiement.html : panier, paiement et envoi WhatsApp
- style.css : design du site
- config.js : liens, numéro WhatsApp, Snap, localisation, PayPal, Revolut, produits
- app.js : logique panier, WhatsApp, paiement

OÙ METTRE TES VRAIS LIENS ?

Ouvre le fichier config.js.

1. Numéro WhatsApp :
whatsappNumber: "594694130640",

2. Lien Snapchat :
snapUrl: "#",

Remplace # par ton vrai lien Snap, par exemple :
snapUrl: "https://www.snapchat.com/add/tonpseudo",

3. Localisation Google Maps :
mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cit%C3%A9%20Lumi%C3%A8re%2C%20Kourou%2C%20Guyane",

Remplace ce lien par ton vrai lien Google Maps.

4. Texte de localisation affiché :
locationText: "Cité Lumière, Kourou"

Remplace par le texte exact que tu veux afficher.

5. PayPal :
paypalUrl: "",

Exemple :
paypalUrl: "https://paypal.me/TONCOMPTE/{amount}",

6. Revolut :
revolutUrl: "",

Exemple :
revolutUrl: "https://revolut.me/TONPSEUDO/{amount}",

IMPORTANT :
Le panier fonctionne entre les pages grâce au stockage local du navigateur.
Le client peut ajouter une crêpe, changer de page, ajouter une gaufre, puis aller au paiement.
