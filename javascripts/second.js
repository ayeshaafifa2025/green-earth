
// spinner function (shared)
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  if (status) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// Load all categories
const loadAllCategory = async () => {
  manageSpinner(true);

  try {
    const url = `https://openapi.programming-hero.com/api/categories`;
    const getCategory = await fetch(url);
    const data = await getCategory.json();
    disPlayCategories(data.categories);
  } catch (err) {
    console.error("Error loading categories:", err);
  } finally {
    manageSpinner(false);
  }
};

// Remove active
const removeActive = () => {
  const plantButtons = document.querySelectorAll(".plant-btn");
  plantButtons.forEach(btn => btn.classList.remove("active"));
};

// Load plants by category
const loadCategories = async (id) => {
  manageSpinner(true);

  try {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    removeActive();
    document.getElementById(`category-btn-${id}`).classList.add("active");
    displayTree(data.plants);
  } catch (err) {
    console.error("Error loading category plants:", err);
  } finally {
    manageSpinner(false);
  }
};

// Display plants
const displayTree = (plants) => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";

  if (plants.length === 0) {
    mainContainer.innerHTML = `<div class="text-center py-10 text-gray-500">No plants found.</div>`;
    return;
  }

  plants.forEach(plant => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-md">
        <h3 onclick="loadPlantDetail(${plant.id})" class="font-semibold text-[16px] mb-2">${plant.name}</h3>
        <p class="text-[13px] text-gray-600 mb-3">${plant.description}</p>
        <div class="flex justify-between items-center">
          <button class="bg-[#DCFCE7] text-[#15803D] text-[12px] px-3 py-1 rounded-lg mb-3">${plant.category}</button>
          <p class="font-semibold text-gray-800">${plant.price}</p>
        </div>
        <button onclick="addToCart(${plant.id})" class= "bg-[#15803D] text-white rounded-xl w-full py-3 font-semibold hover:bg-green-700 transition">Add to Cart</button>
      </div>
    `;
    mainContainer.append(postCard);
  });
};

// Display categories 
const disPlayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  categories.forEach(category => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="category-btn-${category.id}" onclick="loadCategories(${category.id})" class="btn btn-outline w-full plant-btn">
        ${category.category_name}
      </button>
    `;
    categoryContainer.append(btnDiv);
  });
};

// Initial load
loadAllCategory();   
