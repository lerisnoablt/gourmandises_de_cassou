LES GOURMANDISES DE CASSOU — PACK V2

Contenu :
- index.html : site mis à jour
- hero-illustration.png : visuel principal
- crepe-illustration.png : visuel crêpes
- waffle-illustration.png : visuel gaufres
- drinks-illustration.png : visuel boissons

Améliorations ajoutées :
1. Jus locaux séparés :
   - jus local cerise
   - jus local gingembre
   - jus local moubin

2. Formules personnalisables :
   - Formule crêpe + milk-shake : choix de la crêpe sucrée + choix du milk-shake
   - Formule gaufre + milk-shake : choix de la gaufre + choix du milk-shake

3. Visuels / illustrations ajoutés pour rendre le site plus vivant.

4. Paiement :
   - sur place espèces
   - sur place carte
   - PayPal (à configurer)
   - Revolut (à configurer)

IMPORTANT POUR PAYPAL / REVOLUT :
Ouvre le fichier index.html, cherche :
const PAYMENT_LINKS = {
  paypal: "",
  revolut: ""
};

Remplace par exemple par :
const PAYMENT_LINKS = {
  paypal: "https://paypal.me/TONCOMPTE/{amount}",
  revolut: "https://revolut.me/TONPSEUDO/{amount}"
};

Le site remplacera automatiquement {amount} par le total de la commande si ton lien l'accepte.

Mise en ligne :
- Netlify (très simple)
- Vercel
- GitHub Pages
- Hébergeur classique

Si tu me donnes ton lien PayPal.me et ton lien Revolut.me, je peux te faire une V3 directement prête.
