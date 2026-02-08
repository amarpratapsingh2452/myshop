let PRODUCTS = [];
let cart = [];
let page = "home";
fetch("https://dummyjson.com/products?limit=100")
.then(res => res.json())
.then(data => { PRODUCTS = data.products; render(); });
function go(p){
page = p;
if(p === "cart"){
document.getElementById("cart").classList.remove("hidden");
document.getElementById("products").classList.add("hidden");
document.getElementById("filterBar").style.display = "none";
renderCart();
} else {
document.getElementById("cart").classList.add("hidden");
document.getElementById("products").classList.remove("hidden");
document.getElementById("filterBar").style.display = "block";
render();
}
}
function showToast(){
const t = document.getElementById("toast");
t.style.display = "block";
setTimeout(()=> t.style.display="none", 1500);
}
function addToCart(id){
const p = PRODUCTS.find(x =>x.id === id);
cart.push(p);
document.getElementById("cartCount").innerText = cart.length;
showToast();
}
function removeFromCart(i){
cart.splice(i,1);
document.getElementById("cartCount").innerText = cart.length;
renderCart();
}
function render(){
const filter = document.getElementById("priceFilter").value;
const search = document.getElementById("searchBox").value.toLowerCase();
let items = [...PRODUCTS];
if(page === "accessories"){
items = items.filter(p =>
p.category.toLowerCase().includes("watches")
);

}
if(page === "groceries"){
items = items.filter(p =>
p.category.toLowerCase().includes("groceries") ||
p.category.toLowerCase().includes("food")
);
}
if(page === "beauty"){
items = items.filter(p =>
p.category.toLowerCase().includes("beauty") ||
p.category.toLowerCase().includes("fragrance")
);
}
if(page === "electronics"){
items = items.filter(p =>
p.category.toLowerCase().includes("laptop") ||
p.category.toLowerCase().includes("mobile-accessories")
);
}
if(filter !== "all"){
items = items.filter(p => p.price <= Number(filter));
}
if(search){
  items = items.filter(p => 
    p.title.toLowerCase().includes(search) //||
    // p.category.toLowerCase().includes(search) ||
    // p.brand.toLowerCase().includes(search) ||
    // (p.tags && p.tags.some(tag => tag.toLowerCase().includes(search)))
  );
}

const box = document.getElementById("products");
box.innerHTML = "";
if(items.length === 0){ box.innerHTML = "<p>No products found.</p>"; return; }
items.forEach(p=>{
box.innerHTML += `
<div class="card">
<img src="${p.thumbnail}" class="thumb" style="object-fit:contain;">

<div><strong>${p.title}</strong></div>
<div>$${p.price}</div>
<button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
</div>`;
});
}



function renderCart(){
const list = document.getElementById("cartItems");
const totalBox = document.getElementById("cartTotal");
list.innerHTML = "";
let total = 0;


if(cart.length === 0){ list.innerHTML = "<p>Your cart is empty.</p>"; totalBox.innerHTML = ""; return; }

cart.forEach((item,i)=>{
total += item.price;
list.innerHTML += `
<div class="item-row">
<span>${item.title}</span>

<span>$${item.price}</span>
<button onclick="removeFromCart(${i})">Remove</button>
</div>`;
});
totalBox.innerText = "Total: $" + total.toFixed(2);

}






