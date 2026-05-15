# Les Gourmandises de Cassou — Site de commande

Version actuelle : V17 — expérience client améliorée

---

## 1. Ce que contient le site

Le site est séparé en plusieurs pages :

- `index.html` : page d’accueil
- `crepes.html` : menu des crêpes
- `gaufres.html` : menu des gaufres
- `milkshakes.html` : menu des milk-shakes
- `jus.html` : menu des jus locaux
- `formules.html` : formules personnalisables
- `paiement.html` : panier, paiement et envoi de commande sur WhatsApp
- `style.css` : design du site
- `config.js` : configuration principale du site
- `app.js` : fonctionnement du panier, WhatsApp, paiement et mode sombre
- `assets/images/` : toutes les images utiles du site (logo, visuels de catégories, hero et sprites produits)

---

## 2. Fonctionnement général

Le client arrive sur la page d’accueil.

Il peut choisir une catégorie :

- Crêpes
- Gaufres
- Milk-shakes
- Jus locaux
- Formules

Il ajoute les produits au panier avec les boutons `+` et `−`.

Ensuite, il va sur la page `paiement.html`.

Sur cette page, il peut :

- vérifier son panier ;
- indiquer son prénom ;
- indiquer son heure de retrait ;
- choisir son mode de paiement ;
- ajouter une remarque ;
- envoyer la commande sur WhatsApp.

Le message WhatsApp contient automatiquement :

- les produits commandés ;
- les quantités ;
- les choix de formule ;
- le total ;
- le prénom ;
- l’heure de retrait ;
- le mode de paiement ;
- les remarques.

---

## 3. Panier entre les pages

Le panier reste sauvegardé quand le client change de page.

Exemple :

1. Il ajoute une crêpe.
2. Il va sur la page gaufres.
3. Il ajoute une gaufre.
4. Il va sur la page paiement.
5. Les deux produits sont encore dans le panier.

Le panier utilise `localStorage`, donc il est sauvegardé localement dans le navigateur du client.

Important :

- les données ne sont pas envoyées à un serveur ;
- les données du panier restent sur l’appareil du client ;
- ce n’est pas chiffré dans le navigateur ;
- le résumé de commande est envoyé à WhatsApp seulement quand le client clique sur le bouton WhatsApp.

Pour un petit site de commande simple, c’est suffisant. Pour un vrai système avec comptes clients, paiement intégré sécurisé ou historique de commandes, il faudrait un backend sécurisé.

---

## 4. Fichier principal à modifier : `config.js`

La plupart des informations importantes sont dans `config.js`.

Tu dois ouvrir ce fichier si tu veux modifier :

- le numéro WhatsApp ;
- le lien Snapchat ;
- le lien Google Maps ;
- le lien PayPal ;
- le lien Revolut ;
- le texte de localisation ;
- le thème par défaut ;
- les produits, prix et descriptions.

---

## 5. Modifier le numéro WhatsApp

Dans `config.js`, cherche :

```js
whatsappNumber: "594694130640",
```

Le numéro doit être au format international :

- sans `+`
- sans espace
- sans tiret

Exemple pour la Guyane :

```js
whatsappNumber: "594694130640",
```

Si tu changes de numéro, remplace simplement la valeur entre guillemets.

---

## 6. Modifier le lien Snapchat

Dans `config.js`, cherche :

```js
snapUrl: "#",
```

Quand tu auras le vrai lien Snap, remplace `#`.

Exemple :

```js
snapUrl: "https://www.snapchat.com/add/tonpseudo",
```

Le lien Snap est affiché dans le bas du site.

---

## 7. Modifier la localisation Google Maps

Dans `config.js`, cherche :

```js
mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cit%C3%A9%20Lumi%C3%A8re%2C%20Kourou%2C%20Guyane",
```

Quand tu auras la vraie position Google Maps, remplace ce lien par ton vrai lien.

Exemple :

```js
mapsUrl: "https://maps.app.goo.gl/TONLIEN",
```

Ensuite, cherche aussi :

```js
locationText: "Cité Lumière, Kourou",
```

Tu peux changer le texte affiché sur le site.

Exemple :

```js
locationText: "Cité Lumière, près du terrain, Kourou",
```

Résumé :

- `mapsUrl` = le lien qui s’ouvre quand le client clique ;
- `locationText` = le texte affiché sur le site.

---

## 8. Modifier PayPal

Dans `config.js`, cherche :

```js
paypalUrl: "",
```

Quand tu auras ton lien PayPal, mets-le entre les guillemets.

Exemple simple :

```js
paypalUrl: "https://paypal.me/TONCOMPTE",
```

Exemple avec montant automatique, si ton lien l’accepte :

```js
paypalUrl: "https://paypal.me/TONCOMPTE/{amount}",
```

Le site remplacera `{amount}` par le total de la commande.

Important : tous les liens PayPal ne gèrent pas forcément le montant automatique. Il faut tester.

---

## 9. Modifier Revolut

Dans `config.js`, cherche :

```js
revolutUrl: "",
```

Quand tu auras ton lien Revolut, mets-le entre les guillemets.

Exemple :

```js
revolutUrl: "https://revolut.me/TONPSEUDO",
```

Exemple avec montant automatique, si ton lien l’accepte :

```js
revolutUrl: "https://revolut.me/TONPSEUDO/{amount}",
```

Le site remplacera `{amount}` par le total de la commande si le lien contient `{amount}`.

---

## 10. Paiement et WhatsApp

Il faut garder WhatsApp.

Le rôle de chaque élément :

- WhatsApp = recevoir le détail de la commande ;
- PayPal / Revolut = recevoir le paiement ;
- espèces / carte = paiement sur place.

Le client peut :

1. préparer son panier ;
2. choisir PayPal ou Revolut ;
3. payer ;
4. envoyer la commande sur WhatsApp.

C’est important, parce que sinon tu pourrais recevoir un paiement sans savoir exactement ce que la personne a commandé.

---

## 11. Modifier le thème par défaut

Dans `config.js`, cherche :

```js
defaultTheme: "light"
```

Pour démarrer le site en mode clair :

```js
defaultTheme: "light"
```

Pour démarrer le site en mode sombre :

```js
defaultTheme: "dark"
```

Le client peut ensuite changer lui-même avec le bouton en bas de page.

Son choix est sauvegardé dans son navigateur.

---

## 12. Où se trouvent les modifications du mode sombre

Le mode sombre a été ajouté dans plusieurs fichiers :

### `config.js`

Contient le thème par défaut :

```js
defaultTheme: "light"
```

### `style.css`

Contient les couleurs et le design du mode sombre.

La partie commence par :

```css
body.dark-mode{
```

Le style du bouton est aussi dans `style.css`, avec :

```css
.theme-toggle-wrap
```

et :

```css
.theme-toggle
```

### `app.js`

Contient le fonctionnement du bouton.

Fonctions importantes :

```js
getSavedTheme()
applyTheme(theme)
toggleTheme()
```

### Les fichiers HTML

Chaque page contient le bouton en bas :

```html
<div class="theme-toggle-wrap">
  <button class="theme-toggle" id="themeToggle" type="button">🌙 Mode sombre</button>
</div>
```

---

## 13. Modifier les produits, prix et descriptions

Les produits sont dans `config.js`, dans la partie :

```js
const PRODUCTS = [
```

Chaque produit ressemble à ça :

```js
{
  id:"crepe-nutella",
  categoryId:"crepes",
  type:"simple",
  name:"Crêpe Nutella",
  price:3.5,
  desc:"Crêpe sucrée au Nutella.",
  badge:"Sucrée"
}
```

Tu peux modifier :

- `name` : nom affiché ;
- `price` : prix ;
- `desc` : description ;
- `badge` : petite étiquette ;
- `categoryId` : catégorie.

Catégories utilisées :

- `crepes`
- `gaufres`
- `milkshakes`
- `jus`
- `formules`

Attention : évite de modifier `id` si le site est déjà en ligne, sauf si tu sais ce que tu fais.

---

## 14. Modifier les formules

Les formules sont aussi dans `config.js`.

Exemple :

```js
{
  id:"formule-crepe",
  categoryId:"formules",
  type:"combo",
  name:"Formule crêpe + milk-shake",
  price:6,
  desc:"Choisis ta crêpe sucrée et ton milk-shake.",
  badge:"Formule",
  choice1Label:"Choix de la crêpe",
  choice2Label:"Choix du milk-shake",
  choices1:["Crêpe Nutella","Crêpe au miel","Crêpe sucre"],
  choices2:["Milk-shake fraise","Milk-shake Nutella","Milk-shake Oreo"]
}
```

Tu peux modifier :

- le prix ;
- le nom ;
- les choix de crêpes ;
- les choix de gaufres ;
- les choix de milk-shakes.

Si tu veux ajouter un choix, ajoute-le dans la liste entre guillemets.

Exemple :

```js
choices2:["Milk-shake fraise","Milk-shake Nutella","Milk-shake Oreo","Milk-shake caramel"]
```

---

## 15. Modifier le design

Le design est dans :

```txt
style.css
```

Tu peux y modifier :

- couleurs ;
- tailles ;
- espacements ;
- arrondis ;
- ombres ;
- mode sombre ;
- apparence des boutons.

Les couleurs principales sont au début du fichier :

```css
:root{
  --bg:#fff7ef;
  --card:#ffffff;
  --text:#29160f;
  --muted:#80665a;
  --pink:#d6287d;
  --pink-dark:#a8185c;
  --gold:#f3bd3f;
  --border:#efd7c5;
}
```

La couleur principale du site est surtout :

```css
--pink:#d6287d;
```

---

## 16. Modifier les images

Les images du site sont :

- `hero.png`
- `crepes.png`
- `gaufres.png`
- `boissons.png`

Tu peux les remplacer par tes propres images.

Important :

- garde les mêmes noms de fichiers ;
- remplace simplement l’image dans le dossier ;
- garde le format `.png`, ou alors il faudra modifier les noms dans les fichiers HTML.

---

## 17. Où mettre le site en ligne

Tu peux mettre ce site en ligne avec :

- Netlify ;
- Vercel ;
- GitHub Pages ;
- un hébergeur classique.

Le plus simple pour commencer : Netlify.

Méthode simple :

1. Va sur Netlify.
2. Crée un compte.
3. Glisse-dépose le dossier du site.
4. Netlify te donne un lien.
5. Tu utilises ce lien pour créer ton QR code.

---

## 18. QR code

Le QR code doit pointer vers le lien du site.

Exemple :

```txt
https://ton-site.netlify.app
```

Ne fais pas forcément un QR code direct vers WhatsApp, parce que le client doit d’abord choisir ses produits.

Le bon ordre :

1. QR code vers le site ;
2. client choisit ses produits ;
3. client va au panier ;
4. client envoie la commande sur WhatsApp.

---

## 19. Sécurité et données

Le site actuel est un site simple sans serveur.

Ce que ça veut dire :

- le panier est stocké dans le navigateur du client ;
- les données ne sont pas sauvegardées chez toi ;
- les données ne sont pas visibles depuis un tableau de bord ;
- tu reçois uniquement la commande envoyée sur WhatsApp.

À savoir :

- `localStorage` n’est pas chiffré ;
- le client peut voir ses propres données sur son appareil ;
- personne ne peut consulter les paniers des autres via le site ;
- la commande part vers WhatsApp uniquement au moment où le client clique.

Pour un usage simple, c’est correct.

Pour un système plus professionnel, il faudrait ensuite :

- une vraie base de données ;
- un système de commandes côté serveur ;
- un tableau de bord vendeur ;
- une confirmation automatique ;
- un vrai paiement intégré.

---

## 20. Ce qui pourrait être amélioré plus tard

Idées d’amélioration possibles :

- ajouter un statut “produit indisponible” ;
- ajouter des options comme supplément chantilly, coulis, topping ;
- ajouter un temps de préparation estimé ;
- ajouter une page “Contact” ;
- ajouter une page “À propos” ;
- ajouter un vrai logo ;
- ajouter des photos réelles des produits ;
- ajouter un système de commande avec numéro de commande ;
- ajouter une confirmation automatique après envoi ;
- ajouter un tableau de bord pour gérer les commandes ;
- connecter un vrai paiement en ligne sécurisé ;
- ajouter une option “retrait” ou “livraison” ;
- ajouter des horaires d’ouverture par jour ;
- ajouter un message automatique si le stand est fermé.

---

## 21. Ordre conseillé avant publication

Avant de mettre le site en ligne, vérifie :

1. Le numéro WhatsApp.
2. Le lien Snapchat.
3. La localisation Google Maps.
4. Les prix.
5. Les produits.
6. Les formules.
7. Les liens PayPal/Revolut si tu veux les activer.
8. Le mode clair/sombre.
9. Le site sur téléphone.
10. Le message WhatsApp généré après une commande test.

---

## 22. Fichiers à ne pas supprimer

Ne supprime pas :

- `config.js`
- `app.js`
- `style.css`
- les fichiers `.html`
- les images utilisées

Si tu supprimes `app.js`, le panier ne fonctionnera plus.

Si tu supprimes `config.js`, les produits, WhatsApp et les liens ne fonctionneront plus.

Si tu supprimes `style.css`, le site n’aura plus de design.

---

## 23. Résumé rapide

Pour modifier les infos importantes :

- WhatsApp : `config.js`
- Snapchat : `config.js`
- Localisation : `config.js`
- PayPal : `config.js`
- Revolut : `config.js`
- Produits : `config.js`
- Prix : `config.js`
- Thème par défaut : `config.js`
- Design : `style.css`
- Fonctionnement panier : `app.js`
- Pages visibles : fichiers `.html`

Le fichier le plus important pour toi est donc :

```txt
config.js
```

---

## V7 — Illustrations séparées et mini visuels par spécialité

Corrections principales :

- séparation des illustrations de **Milk-shakes** et **Jus locaux** ;
- la catégorie **Milk-shakes** utilise maintenant une vraie image de milk-shakes ;
- la catégorie **Jus locaux** utilise maintenant une vraie image de jus ;
- correction du parfum **monbin** (et non **monbin**) partout dans le site ;
- ajout de **mini illustrations** dans les cartes produits du menu ;
- chaque spécialité affiche maintenant un petit visuel à côté du nom du produit ;
- les crêpes salées, crêpes sucrées, gaufres, milk-shakes et jus locaux ont chacun un visuel adapté ;
- mise à jour du README avec ces nouvelles corrections.

Fichiers principalement modifiés pour cette version :

- `config.js` : correction de **monbin**, ajout des mini vignettes produits ;
- `app.js` : affichage des mini illustrations dans les cartes des produits ;
- `style.css` : style des mini vignettes dans le menu ;
- `index.html` : image séparée pour la carte Milk-shakes et pour la carte Jus locaux ;
- `milkshakes.html` : illustration dédiée aux milk-shakes ;
- `jus.html` : illustration dédiée aux jus locaux ;
- nouveaux fichiers images :
  - `milkshakes.png`
  - `jus-locaux.png`
  - `thumb-crepe-salee.png`
  - `thumb-crepe-sucree.png`
  - `thumb-gaufre.png`
  - `thumb-milkshake.png`
  - `thumb-jus.png`

---

## V8 — Finalisation, vérification et checklist de test

Cette version garde la V7 intacte et ajoute une étape de finalisation.

Ajouts principaux :

- ajout du fichier `CHECKLIST_TESTS.txt` ;
- checklist complète pour tester le site avant mise en ligne ;
- vérification des points importants :
  - accueil ;
  - crêpes ;
  - gaufres ;
  - milk-shakes ;
  - jus locaux ;
  - formules ;
  - panier ;
  - WhatsApp ;
  - PayPal ;
  - Revolut ;
  - Snapchat ;
  - localisation ;
  - mode clair / sombre ;
  - affichage mobile.

But de cette version :

- t’aider à tester le site proprement ;
- éviter d’oublier un détail avant de publier ;
- préparer la mise en ligne avec un QR code.

---

## V9 — Intégration du vrai logo

Ajouts et corrections principales :

- intégration du **vrai logo** fourni ;
- remplacement de l’ancien petit logo générique dans le header ;
- ajout du logo dans le **footer** ;
- ajout du logo sur la **page d’accueil** ;
- ajout du logo comme **favicon** (icône de l’onglet du navigateur) ;
- conservation du nom **Les Gourmandises de Cassou** à côté du logo pour une meilleure lisibilité.

Fichiers principalement modifiés :

- `index.html` : logo ajouté dans l’accueil ;
- tous les fichiers `.html` : logo dans le header + favicon ;
- `style.css` : style du logo header, footer et accueil ;
- nouveau fichier : `logo-cassou.jpg`.

---

## V10 — Vignettes spécifiques par produit et correction visuelle du monbin

Corrections principales :

- chaque carte produit affiche maintenant une **mini image qui correspond exactement au produit** ;
- les **milk-shakes** ont chacun leur propre visuel : fraise, Nutella, Oreo, vanille, Spéculoos, M&M’s ;
- les **crêpes salées** ont chacune leur propre visuel : steak jambon fromage, jambon fromage, steak fromage ;
- les **crêpes sucrées** ont chacune leur propre visuel : Nutella, miel, sucre ;
- les **gaufres** ont chacune leur propre visuel : Nutella, miel, sucre, boule de glace ;
- les **jus locaux** ont chacun leur propre visuel en **petite bouteille** ;
- correction du visuel du **monbin** : il n’est plus représenté comme un citron ;
- le monbin est maintenant représenté comme le **fruit jaune/orangé du monbin** (yellow mombin / *Spondias mombin*) ;
- amélioration de l’image principale des **jus locaux** pour montrer les petites bouteilles avec cerise, gingembre et monbin.

Technique utilisée :

- ajout de **sprites d’illustrations** pour afficher une vignette différente selon le produit ;
- chaque produit possède maintenant une position de vignette dédiée dans `config.js`.

Fichiers principalement modifiés :

- `config.js` : nouvelles vignettes spécifiques par produit ;
- `app.js` : affichage dynamique des vignettes produit ;
- `style.css` : affichage des sprites miniatures ;
- `jus-locaux.png` : nouvelle image principale des jus locaux ;
- nouveaux fichiers images :
  - `sprite-milkshakes.png`
  - `sprite-crepes-salees.png`
  - `sprite-crepes-sucrees.png`
  - `sprite-gaufres.png`
  - `sprite-jus-locaux.png`

---

## V11 — Correction du jus cerise en cerise acérola

Corrections principales :

- le jus local "cerise" a été corrigé pour devenir visuellement une **cerise acérola** ;
- les anciennes cerises classiques ont été retirées ;
- la vignette du premier jus montre maintenant des **acérolas** (petits fruits rouges côtelés, aussi appelés cerises de la Barbade) ;
- l’image principale de la page des jus locaux a aussi été remplacée pour afficher l’acérola correctement ;
- le produit a été renommé dans le menu en **"Jus local cerise acérola"** ;
- le badge du produit a été ajusté en **"Acérola"** ;
- la description du produit a été ajustée pour préciser qu’il s’agit d’une petite bouteille de cerise acérola.

Fichiers principalement modifiés :

- `config.js` : nom, badge et description du jus à l’acérola ;
- `sprite-jus-locaux.png` : nouvelle vignette des jus avec acérola ;
- `jus-locaux.png` : nouvelle image principale des jus locaux ;
- `README.txt` : ajout de la version V11.


---

## V12 — Mise à jour finale après validation des illustrations

Cette version regroupe la correction finale du site après validation des illustrations.

Corrections principales :

- intégration des dernières illustrations validées dans le site ;
- confirmation du jus **cerise acérola** dans le menu ;
- mise à jour des textes visibles de la catégorie **Jus locaux** pour afficher :
  - cerise acérola ;
  - gingembre ;
  - monbin ;
- conservation de toutes les améliorations précédentes :
  - logo intégré ;
  - mode clair / sombre ;
  - panier multi-pages ;
  - formules personnalisables ;
  - vignettes spécifiques par produit ;
  - README et checklist.

But de cette version :

- avoir une version finale cohérente entre les illustrations, les noms des produits et les textes visibles sur le site.


---

## V13 — Amélioration du design général

Cette version se concentre surtout sur l’apparence globale du site, sans casser le fonctionnement existant.

Améliorations principales :

- design global plus propre, plus moderne et plus gourmand ;
- hero d’accueil retravaillé avec une meilleure présence visuelle ;
- couleurs raffinées et harmonisées ;
- cartes catégories plus élégantes ;
- cartes produits plus lisibles ;
- prix mieux mis en valeur ;
- contrôles `+` et `−` plus propres ;
- meilleure hiérarchie visuelle dans les sections ;
- footer plus premium ;
- mode sombre amélioré pour rester cohérent avec le nouveau design ;
- légères améliorations de textes sur l’accueil et la page panier.

Fichiers principalement modifiés :

- `style.css` : amélioration majeure du design ;
- `index.html` : amélioration des textes de la page d’accueil ;
- `paiement.html` : texte plus propre pour la commande ;
- `README.txt` : ajout de la version V13.


---

## V14 — Direction artistique premium

Cette version pousse le design un peu plus loin, avec une direction plus premium et plus “marque”.

Améliorations principales :

- accueil plus impactant ;
- fond plus travaillé avec un léger motif ;
- header plus élégant ;
- logo mieux mis en valeur ;
- cartes catégories plus premium ;
- cartes produits plus modernes ;
- effets au survol plus propres ;
- meilleures ombres et meilleurs arrondis ;
- prix et badges plus visibles ;
- mode sombre retravaillé pour suivre le style premium ;
- petites animations légères pour rendre le site plus vivant.

Fichier principalement modifié :

- `style.css`

---

## V15 — Stabilisation, logo propre, images rangées et liens de contact

Corrections majeures :

- remplacement de l’ancien logo par un **logo propre et rééquilibré** basé sur le visuel "Cassou Gourmandises" ;
- toutes les images utilisées par le site ont été regroupées dans **`assets/images/`** ;
- suppression des **images non utilisées par le code** ;
- mise à jour des chemins d’images dans les pages HTML et dans `config.js` ;
- numéro de téléphone rendu **cliquable** (`tel:`) ;
- ajout d’un lien **Instagram** en plus de Snapchat dans les contacts ;
- ajout de **logos / icônes** pour téléphone, Snapchat et Instagram dans le footer ;
- ajout de **logos / icônes** PayPal et Revolut sur la page paiement, ainsi qu’un rappel dans les infos pratiques ;
- `config.js` enrichi avec :
  - `phoneDisplay` ;
  - `phoneHref` ;
  - `instagramUrl` ;
- README remis à niveau pour refléter la V15.

### Fichiers à modifier plus tard

Dans `config.js`, tu pourras mettre tes vrais liens ici :

- `snapUrl`
- `instagramUrl`
- `paypalUrl`
- `revolutUrl`
- `mapsUrl`
- `phoneDisplay` / `phoneHref`

### Nouveau rangement des images

Toutes les images utiles sont maintenant dans :

```
assets/images/
```

Exemples :

- `assets/images/logo-cassou.png`
- `assets/images/hero.png`
- `assets/images/crepes.png`
- `assets/images/gaufres.png`
- `assets/images/milkshakes.png`
- `assets/images/jus-locaux.png`
- `assets/images/sprite-crepes-salees.png`
- `assets/images/sprite-crepes-sucrees.png`
- `assets/images/sprite-gaufres.png`
- `assets/images/sprite-milkshakes.png`
- `assets/images/sprite-jus-locaux.png`

---

## V16 — Optimisation vitesse

Cette version garde le design et le fonctionnement de la V15, mais optimise le chargement du site.

Corrections principales :

- conversion des images utiles en **WebP** ;
- réduction des dimensions des grandes images ;
- réduction du poids du logo ;
- optimisation des sprites produits ;
- suppression des anciennes images PNG remplacées par les WebP ;
- mise à jour des chemins d’images dans les pages HTML ;
- mise à jour des chemins d’images dans `config.js` et `app.js` ;
- ajout de `loading="lazy"` sur les images non prioritaires ;
- ajout de `decoding="async"` sur les images ;
- conservation du chargement prioritaire du logo et des images principales.

But de cette version :

- garder le même site ;
- garder le même design ;
- accélérer le chargement, surtout sur téléphone ;
- réduire le poids total des images.

Les images sont toujours rangées dans :

```txt
assets/images/
```

Les fichiers principaux sont maintenant en `.webp`, par exemple :

```txt
assets/images/logo-cassou.webp
assets/images/hero.webp
assets/images/crepes.webp
assets/images/gaufres.webp
assets/images/milkshakes.webp
assets/images/jus-locaux.webp
```


---

## V17 — Expérience client et présentation améliorée

Principales améliorations :

- suppression des mentions non utiles au client, comme le texte “Logo officiel” ;
- intégration des logos visuels pour WhatsApp, Snapchat, Instagram, Revolut et PayPal ;
- amélioration de la présentation des contacts et du paiement ;
- retrait du rappel “Ouvert tous les jours à partir de 15h” dans le header pour éviter la répétition ;
- ajout d’une carte de type OpenStreetMap sur l’accueil ;
- ajout d’un bouton unique “Obtenir l’itinéraire” avec ouverture adaptée à l’appareil ;
- meilleure mise en avant de la catégorie Formules dans le menu d’accueil ;
- amélioration du rendu responsive sur mobile, tablette et ordinateur ;
- mise à jour de la typographie avec une police plus soignée et plus lisible.

À compléter plus tard si besoin dans `config.js` :

- `instagramUrl`
- `snapUrl`
- `paypalUrl`
- `revolutUrl`
- `mapsUrl`
- `routeQuery`
- `mapEmbedUrl`
