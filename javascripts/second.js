// async method to load all categories
const loadAllCategory = async () => {
    
    const url = `https://openapi.programming-hero.com/api/categories`;
    const getCategory = await fetch(url);
    const data = await getCategory.json();
    console.log(data);
    disPlayCategories(data.categories);
};

const removeActive = ()=>{
    const plantButtons = document.querySelectorAll(".plant-btn");
    // console.log(plantButtons);
    plantButtons.forEach(btn=> btn.classList.remove("active"));
}


// load plants by category
const loadCategories = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // removed all active  class
            removeActive(); 
            const clickBtn = document.getElementById(`category-btn-${id}`);
            // console.log(clickBtn);
            // added active class
            clickBtn.classList.add("active");
            displayTree(data.plants)
            
        });
};

// display plants by category
const displayTree = (plants) => {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";

    plants.forEach(plant => {
        const postCard = document.createElement("div");
        postCard.innerHTML = `
            <div class="post-card">
                <img src="${plant.image}" alt="" class="w-full h-40 object-cover rounded-md">
                <h3 onclick="loadPlantDetail(${plant.id})" class="font-semibold text-[16px] mb-2">${plant.name}</h3>
                <p class="text-[13px] text-gray-600 mb-3">${plant.description}</p>
                <div class="flex justify-between items-center">
                    <button class="bg-[#DCFCE7] text-[#15803D] text-[12px] px-3 py-1 rounded-lg mb-3">
                        ${plant.category}
                    </button>
                    <p class="font-semibold text-gray-800">৳ ${plant.price}</p>
                </div>
                <button onclick="addToCart(${plant.id})" 
                    class="bg-[#15803D] text-white rounded-xl w-full py-3 font-semibold hover:bg-green-700 transition">
                    Add to Cart
                </button>
            </div>
        `;
        mainContainer.append(postCard);
    });
    
};

// display category buttons
const disPlayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="category-btn-${category.id}"  onclick="loadCategories(${category.id})" 
                class="btn btn-outline w-full plant-btn">
                ${category.category_name}
            </button>
        `;
        categoryContainer.append(btnDiv);
    });
    
};

loadAllCategory();