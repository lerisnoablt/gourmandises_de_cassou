const CONFIG = {
  businessName: "Les Gourmandises de Cassou",
  whatsappNumber: "594694130640",
  snapUrl: "#",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cit%C3%A9%20Lumi%C3%A8re%2C%20Kourou%2C%20Guyane",
  paypalUrl: "",
  revolutUrl: "",
  openingText: "Ouvert tous les jours · à partir de 15h",
  locationText: "Cité Lumière, Kourou"
};

const PRODUCTS = [
  { id:"crepe-steak-jambon-fromage", categoryId:"crepes", type:"simple", name:"Crêpe steak jambon fromage", price:6, desc:"Crêpe salée complète et gourmande.", badge:"Salée" },
  { id:"crepe-jambon-fromage", categoryId:"crepes", type:"simple", name:"Crêpe jambon fromage", price:4, desc:"Classique, simple et efficace.", badge:"Salée" },
  { id:"crepe-steak-fromage", categoryId:"crepes", type:"simple", name:"Crêpe steak fromage", price:5, desc:"Crêpe salée avec steak et fromage.", badge:"Salée" },
  { id:"crepe-nutella", categoryId:"crepes", type:"simple", name:"Crêpe Nutella", price:3.5, desc:"Crêpe sucrée au Nutella.", badge:"Sucrée" },
  { id:"crepe-miel", categoryId:"crepes", type:"simple", name:"Crêpe au miel", price:3, desc:"Crêpe sucrée au miel.", badge:"Sucrée" },
  { id:"crepe-sucre", categoryId:"crepes", type:"simple", name:"Crêpe sucre", price:2.5, desc:"Crêpe sucrée simple.", badge:"Sucrée" },

  { id:"gaufre-nutella", categoryId:"gaufres", type:"simple", name:"Gaufre Nutella", price:5, desc:"Gaufre généreuse au Nutella.", badge:"Gourmande" },
  { id:"gaufre-miel", categoryId:"gaufres", type:"simple", name:"Gaufre miel", price:5, desc:"Gaufre sucrée au miel.", badge:"Sucrée" },
  { id:"gaufre-sucre", categoryId:"gaufres", type:"simple", name:"Gaufre sucre", price:5, desc:"Gaufre sucrée simple.", badge:"Sucrée" },
  { id:"gaufre-glace", categoryId:"gaufres", type:"simple", name:"Gaufre + boule de glace", price:7, desc:"Gaufre avec boule de glace au choix.", badge:"Dessert" },

  { id:"milk-fraise", categoryId:"milkshakes", type:"simple", name:"Milk-shake fraise", price:5, desc:"Milk-shake frais et fruité.", badge:"Milk-shake" },
  { id:"milk-nutella", categoryId:"milkshakes", type:"simple", name:"Milk-shake Nutella", price:5, desc:"Milk-shake gourmand au Nutella.", badge:"Milk-shake" },
  { id:"milk-oreo", categoryId:"milkshakes", type:"simple", name:"Milk-shake Oreo", price:5, desc:"Milk-shake aux biscuits Oreo.", badge:"Milk-shake" },
  { id:"milk-vanille", categoryId:"milkshakes", type:"simple", name:"Milk-shake vanille", price:5, desc:"Milk-shake classique à la vanille.", badge:"Milk-shake" },
  { id:"milk-speculoos", categoryId:"milkshakes", type:"simple", name:"Milk-shake Spéculoos", price:5, desc:"Milk-shake au goût spéculoos.", badge:"Milk-shake" },
  { id:"milk-mms", categoryId:"milkshakes", type:"simple", name:"Milk-shake M&M’s", price:5, desc:"Milk-shake gourmand aux M&M’s.", badge:"Milk-shake" },

  { id:"jus-cerise", categoryId:"jus", type:"simple", name:"Jus local cerise", price:2.5, desc:"Petite bouteille.", badge:"Jus local" },
  { id:"jus-gingembre", categoryId:"jus", type:"simple", name:"Jus local gingembre", price:2.5, desc:"Petite bouteille.", badge:"Jus local" },
  { id:"jus-moubin", categoryId:"jus", type:"simple", name:"Jus local moubin", price:2.5, desc:"Petite bouteille.", badge:"Jus local" },

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
    choices2:["Milk-shake fraise","Milk-shake Nutella","Milk-shake Oreo","Milk-shake vanille","Milk-shake Spéculoos","Milk-shake M&M’s"]
  },
  {
    id:"formule-gaufre",
    categoryId:"formules",
    type:"combo",
    name:"Formule gaufre + milk-shake",
    price:8,
    desc:"Choisis ta gaufre et ton milk-shake.",
    badge:"Formule",
    choice1Label:"Choix de la gaufre",
    choice2Label:"Choix du milk-shake",
    choices1:["Gaufre Nutella","Gaufre miel","Gaufre sucre"],
    choices2:["Milk-shake fraise","Milk-shake Nutella","Milk-shake Oreo","Milk-shake vanille","Milk-shake Spéculoos","Milk-shake M&M’s"]
  }
];