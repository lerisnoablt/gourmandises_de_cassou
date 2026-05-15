const CART_KEY = "cassou_cart_v5";

function formatPrice(value){
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2
  }) + "€";
}

function loadCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  refreshPage();
}

function getCartItems(){
  return Object.values(loadCart()).filter(item => item.qty > 0);
}

function getTotal(){
  return getCartItems().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getWhatsAppContactUrl(){
  return `https://wa.me/${CONFIG.whatsappNumber}`;
}

function getRouteUrl(){
  const query = encodeURIComponent(CONFIG.routeQuery || CONFIG.locationText || "");
  return `geo:0,0?q=${query}`;
}

function applyConfig(){
  document.querySelectorAll("[data-opening]").forEach(el => el.textContent = CONFIG.openingText);
  document.querySelectorAll("[data-location]").forEach(el => el.textContent = CONFIG.locationText);
  document.querySelectorAll("[data-map-link]").forEach(el => el.href = CONFIG.mapsUrl);
  document.querySelectorAll("[data-snap-link]").forEach(el => el.href = CONFIG.snapUrl);
  document.querySelectorAll("[data-instagram-link]").forEach(el => el.href = CONFIG.instagramUrl);
  document.querySelectorAll("[data-phone-link]").forEach(el => el.href = CONFIG.phoneHref || `tel:${(CONFIG.phoneDisplay || '').replace(/\s+/g,'')}`);
  document.querySelectorAll("[data-phone-text]").forEach(el => el.textContent = CONFIG.phoneDisplay || "06 94 13 06 40");
  document.querySelectorAll("[data-whatsapp-link]").forEach(el => el.href = getWhatsAppContactUrl());
  document.querySelectorAll("[data-map-embed]").forEach(el => el.src = CONFIG.mapEmbedUrl || "");

  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  document.querySelectorAll("[data-route-link]").forEach(el => {
    if(mobile){
      el.setAttribute("href", getRouteUrl());
    }else{
      el.setAttribute("href", CONFIG.mapsUrl || "#");
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
}

function updateCartBadges(){
  const total = formatPrice(getTotal());
  document.querySelectorAll("[data-cart-total]").forEach(el => {
    if(el.classList && el.classList.contains("mobile-tab")){
      const label = el.querySelector("span:last-child");
      if(label) label.textContent = `Panier · ${total}`;
    } else {
      el.textContent = `Panier · ${total}`;
    }
  });
}

function renderMenu(){
  const grid = document.getElementById("menuGrid");
  if(!grid) return;

  const categoryId = grid.dataset.categoryId;
  const list = PRODUCTS.filter(product => product.categoryId === categoryId);

  if(!list.length){
    grid.innerHTML = `<div class="card"><p class="empty">Aucun produit disponible pour cette catégorie.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(renderProductCard).join("");
}

function renderThumb(item){
  if(item.thumbSprite){
    return `<div class="item-thumb is-sprite" role="img" aria-label="${item.name}" style="background-image:url('${item.thumbSprite}');background-size:${item.thumbSize || 'cover'};background-position:${item.thumbPosition || 'center'};"></div>`;
  }
  return `<img class="item-thumb" src="${item.thumb || 'assets/images/hero.webp'}" alt="${item.name}">`;
}

function renderProductCard(product){
  if(product.type === "combo") return renderComboCard(product);

  const cart = loadCart();
  const qty = cart[product.id]?.qty || 0;

  return `
    <article class="item">
      <div class="item-head">
        ${renderThumb(product)}
        <div class="item-main">
          <div class="row-top">
            <h3>${product.name}</h3>
            <div class="price">${formatPrice(product.price)}</div>
          </div>
          <span class="badge">${product.badge}</span>
          <p>${product.desc}</p>
        </div>
      </div>
      <div class="controls">
        <div class="qty">
          <button onclick="changeSimpleProduct('${product.id}', -1)" aria-label="Retirer">−</button>
          <span>${qty}</span>
          <button onclick="changeSimpleProduct('${product.id}', 1)" aria-label="Ajouter">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderComboCard(combo){
  return `
    <article class="item">
      <div class="item-head">
        ${renderThumb(combo)}
        <div class="item-main">
          <div class="row-top">
            <h3>${combo.name}</h3>
            <div class="price">${formatPrice(combo.price)}</div>
          </div>
          <span class="badge">${combo.badge}</span>
          <p>${combo.desc}</p>
        </div>
      </div>
      <div class="option-group">
        <div>
          <label for="${combo.id}-choice1">${combo.choice1Label}</label>
          <select id="${combo.id}-choice1">
            ${combo.choices1.map(choice => `<option>${choice}</option>`).join("")}
          </select>
        </div>
        <div>
          <label for="${combo.id}-choice2">${combo.choice2Label}</label>
          <select id="${combo.id}-choice2">
            ${combo.choices2.map(choice => `<option>${choice}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="controls">
        <span class="tiny">Ajoute la formule avec tes choix</span>
        <button class="btn btn-soft" onclick="addCombo('${combo.id}')">Ajouter</button>
      </div>
    </article>
  `;
}

function changeSimpleProduct(productId, delta){
  const product = PRODUCTS.find(p => p.id === productId);
  if(!product) return;

  const cart = loadCart();
  if(!cart[productId]){
    cart[productId] = {
      key: productId,
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 0,
      details: ""
    };
  }

  cart[productId].qty += delta;
  if(cart[productId].qty <= 0) delete cart[productId];

  saveCart(cart);
}

function addCombo(comboId){
  const combo = PRODUCTS.find(p => p.id === comboId);
  if(!combo) return;

  const choice1 = document.getElementById(`${combo.id}-choice1`).value;
  const choice2 = document.getElementById(`${combo.id}-choice2`).value;
  const key = `${combo.id}|${choice1}|${choice2}`;

  const cart = loadCart();
  if(!cart[key]){
    cart[key] = {
      key,
      id: combo.id,
      name: combo.name,
      price: combo.price,
      qty: 0,
      details: `${choice1} + ${choice2}`
    };
  }

  cart[key].qty += 1;
  saveCart(cart);
}

function renderCart(){
  const lines = document.getElementById("cartLines");
  const total = document.getElementById("totalPrice");
  if(!lines || !total) return;

  const items = getCartItems();

  if(!items.length){
    lines.innerHTML = `<p class="empty">Ton panier est vide pour l’instant.</p>`;
  } else {
    lines.innerHTML = items.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.qty} × ${item.name}</strong>
          ${item.details ? `<small>${item.details}</small>` : ""}
          <div class="line-actions">
            <button onclick="updateCartLine('${item.key}', -1)">−1</button>
            <button onclick="updateCartLine('${item.key}', 1)">+1</button>
            <button onclick="removeCartLine('${item.key}')">Supprimer</button>
          </div>
        </div>
        <strong>${formatPrice(item.qty * item.price)}</strong>
      </div>
    `).join("");
  }

  total.textContent = formatPrice(getTotal());
}

function updateCartLine(key, delta){
  const cart = loadCart();
  if(!cart[key]) return;

  cart[key].qty += delta;
  if(cart[key].qty <= 0) delete cart[key];

  saveCart(cart);
}

function removeCartLine(key){
  const cart = loadCart();
  delete cart[key];
  saveCart(cart);
}

function clearCart(){
  localStorage.removeItem(CART_KEY);
  refreshPage();
}

function buildSummaryText(){
  const items = getCartItems();
  let message = "Bonjour, je souhaite commander :\n\n";

  items.forEach(item => {
    message += `- ${item.qty} x ${item.name}`;
    if(item.details) message += ` (${item.details})`;
    message += ` — ${formatPrice(item.qty * item.price)}\n`;
  });

  message += `\nTotal : ${formatPrice(getTotal())}\n`;
  message += `Prénom : ${document.getElementById("name")?.value.trim() || "à préciser"}\n`;
  message += `Heure de retrait : ${document.getElementById("pickup")?.value.trim() || "à préciser"}\n`;
  message += `Paiement : ${document.getElementById("payment")?.value || "à préciser"}\n`;

  const notes = document.getElementById("notes")?.value.trim();
  if(notes) message += `Remarque : ${notes}\n`;

  return message;
}

function sendWhatsApp(){
  if(!getCartItems().length){
    alert("Ajoute au moins un produit au panier avant d’envoyer la commande.");
    return;
  }

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(buildSummaryText())}`;
  window.open(url, "_blank");
}

function copySummary(){
  if(!getCartItems().length){
    alert("Ajoute au moins un produit avant de copier le résumé.");
    return;
  }

  navigator.clipboard.writeText(buildSummaryText())
    .then(() => alert("Résumé copié."))
    .catch(() => alert("Impossible de copier automatiquement. Tu peux envoyer la commande sur WhatsApp directement."));
}

function resolvePaymentUrl(method){
  const total = getTotal().toFixed(2);
  let url = "";

  if(method === "PayPal") url = CONFIG.paypalUrl;
  if(method === "Revolut") url = CONFIG.revolutUrl;

  if(!url) return "";
  return url.includes("{amount}") ? url.replaceAll("{amount}", total) : url;
}

function openPayment(method){
  if(!getCartItems().length){
    alert("Ajoute d’abord des produits au panier pour avoir le montant total.");
    return;
  }

  const url = resolvePaymentUrl(method);
  if(!url){
    alert(`${method} n’est pas encore disponible. Tu peux choisir un paiement sur place ou envoyer la commande sur WhatsApp.`);
    return;
  }

  window.open(url, "_blank");
}

function updatePaymentHelp(){
  const method = document.getElementById("payment")?.value;
  const help = document.getElementById("paymentHelp");
  if(!help) return;

  if(method === "PayPal") help.textContent = "Tu as choisi PayPal. Ouvre le paiement, puis envoie ta commande sur WhatsApp.";
  else if(method === "Revolut") help.textContent = "Tu as choisi Revolut. Ouvre le paiement, puis envoie ta commande sur WhatsApp.";
  else help.textContent = "Pour un paiement sur place, envoie simplement la commande sur WhatsApp.";
}

function refreshPage(){
  renderMenu();
  renderCart();
  updateCartBadges();
  updatePaymentHelp();
}


function getSavedTheme(){
  return localStorage.getItem("cassou_theme") || CONFIG.defaultTheme || "light";
}

function applyTheme(theme){
  const finalTheme = theme === "dark" ? "dark" : "light";
  document.body.classList.toggle("dark-mode", finalTheme === "dark");
  localStorage.setItem("cassou_theme", finalTheme);

  const button = document.getElementById("themeToggle");
  if(button){
    button.textContent = finalTheme === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre";
  }
}

function toggleTheme(){
  const current = document.body.classList.contains("dark-mode") ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}


function handleMobileHeaderScroll(){
  const scrolled = window.scrollY > 36;
  document.body.classList.toggle("mobile-scrolled", scrolled);
}

function setActiveMobileTab(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  const hash = window.location.hash;
  document.querySelectorAll(".mobile-tab").forEach(tab => tab.classList.remove("is-active"));

  let selector = '.mobile-tab[href="index.html"]';
  if(path === "paiement.html") selector = '.mobile-tab[href="paiement.html"]';
  else if(hash === "#categories") selector = '.mobile-tab[href="index.html#categories"]';
  else if(hash === "#nous-trouver") selector = '.mobile-tab[href="index.html#nous-trouver"]';

  const active = document.querySelector(selector);
  if(active) active.classList.add("is-active");
}


document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getSavedTheme());
  applyConfig();
  refreshPage();
  handleMobileHeaderScroll();
  setActiveMobileTab();

  document.getElementById("clearCart")?.addEventListener("click", clearCart);
  document.getElementById("copySummary")?.addEventListener("click", copySummary);
  document.getElementById("whatsappBtn")?.addEventListener("click", sendWhatsApp);
  document.getElementById("paypalBtn")?.addEventListener("click", () => openPayment("PayPal"));
  document.getElementById("revolutBtn")?.addEventListener("click", () => openPayment("Revolut"));
  document.getElementById("payment")?.addEventListener("change", updatePaymentHelp);
  document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
  window.addEventListener("scroll", handleMobileHeaderScroll, { passive: true });
  window.addEventListener("hashchange", setActiveMobileTab);
});