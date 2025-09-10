// Load all plants
const loadAllPlants = async () => {
    
    const url = 'https://openapi.programming-hero.com/api/plants';
    const getPlant = await fetch(url);
    const data = await getPlant.json();
    disPlayAllPlants(data.plants);
};

const loadPlantDetail = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    console.log(details);
    displayPlantsDetails(details.plants)
;
};
const displayPlantsDetails = (plants)=>{
    console.log(plants);
    const detailsBox = document.getElementById("details-container");
//     "plants": {
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// }
    detailsBox.innerHTML=`
    <h1 class="text-xl font-bold text-gray-800">${plants.name}</h1>
        <img src="${plants.image}" alt="${plants.name}" 
             class="w-80 h-40 mx-auto object-cover rounded-lg shadow-md border" />
        <p class="text-sm text-gray-600"><span class="font-semibold">Category:</span> ${plants.category}</p>
        <p class="text-sm text-gray-600"><span class="font-semibold">Price:</span> ${plants.price} </p>
        <p class="text-sm text-gray-700 leading-relaxed"><span class="font-semibold">Description:</span> ${plants.description}</p>
    `;
    document.getElementById("word_modal").showModal();

};

// Display all plants
const disPlayAllPlants = (plants) => {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    plants.forEach(plant => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.innerHTML = `
            <div class="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
                <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-md">
                <h3 onclick="loadPlantDetail(${plant.id})" class="font-semibold text-lg">${plant.name}</h3>
                <p class="text-gray-600 text-sm">${plant.description}</p>
                <div class="flex justify-between items-center mt-2 mb-2">
                    <button  class="bg-[#DCFCE7] text-[#15803D] text-xs px-3 py-1 rounded-lg">${plant.category}</button>
                    <p class="font-semibold text-gray-800"> ${plant.price}</p>
                </div>
                <button onclick="addToCart(${plant.id})" class="bg-[#15803D] text-white rounded-xl w-full py-2 font-semibold hover:bg-green-700 transition">
                    Add to Cart
                </button>
            </div>
        `;
        mainContainer.append(postCard);
    });
    
};

// Cart array to store selected plants
let cartItems = [];

// Add to cart function
const addToCart = async (id) => {
    const url = 'https://openapi.programming-hero.com/api/plants';
    const res = await fetch(url);
    const data = await res.json();
    const plant = data.plants.find(p => p.id === id);

    if (plant && !cartItems.find(item => item.id === plant.id)) {
        cartItems.push(plant);
        displayCart();
    }
};

// Remove from cart
const removeFromCart = (id) => {
    cartItems = cartItems.filter(item => item.id !== id);
    displayCart();
};

// Display cart items
const displayCart = () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = `<h1 class="text-xl font-semibold mb-4">Your Cart</h1>`;

    cartItems.forEach(plant => {
        const cartPost = document.createElement("div");
        cartPost.classList.add("post-card", "bg-[#f3f4f6]", "p-3", "rounded-lg", "mb-3", "flex", "justify-between", "items-center");
        cartPost.innerHTML = `
            <div>
                <h2 class="font-semibold">${plant.name}</h2>
                <p>${plant.price} × 1</p>
            </div>
            <button onclick="removeFromCart(${plant.id})" class="text-red-500 font-bold text-lg hover:text-red-700">&times;</button>
        `;
        cartContainer.append(cartPost);
    });

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("font-semibold", "text-lg", "mt-2", "border-t", "pt-2", "flex", "justify-between");
    totalDiv.innerHTML = `<span>Total:</span><span>৳ ${total}</span>`;
    cartContainer.append(totalDiv);
};

// initial
loadAllPlants();





