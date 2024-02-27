const urlInicio = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`;
const containerMeals = document.querySelector(".container-meals");
const containerMealsByIngredient = document.querySelector(".conteiner-MainIngredientMeal")

const fetchData = async (urlApi) => {
  try {
    const response = await fetch(urlApi);

    if (!response.ok) {
      throw new Error("La solicitud falló");
    }

    const data = await response.json();
    renderMeals(data.meals);

  } catch (error) {
    console.error("Error:", error);
  }
};


const renderMeals =(dataMeals)=>{
  const view = dataMeals.map(meal => `
  <div>
      <div class="container-img">
          <img src="${meal.strMealThumb}" alt="Imagen de plato de comida">
      </div>
      <h3 class="title-meals">${meal.strMeal}</h3>
  </div>
`).slice(0, 12)

containerMeals.innerHTML = view;
}


const fetchDataCategory = async (categorieSelected) => {
  const URL_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorieSelected}`;

  try{
    const response = await fetch(URL_CATEGORY)

    if (!response.ok) {
      throw new Error("La solicitud falló");
    }

    const data = await response.json()
    console.log(data)
    renderMeals(data.meals)

  }catch(error){
    console.error("Error:", error);
  }

}

const attachClickEvent = (buttonClass, categorie) => {
  const button = document.querySelector(buttonClass);

  const removePressedClassFromAll = () => {
    document.querySelectorAll(".buttonFilter").forEach((btn) => {
      btn.classList.remove("pressed");
    });
  };

  const handleClick = () => {
    fetchDataCategory(categorie);
    removePressedClassFromAll();
    button.classList.add("pressed");
  };

  button.addEventListener("click", handleClick);
};

const fetchCategory = () => {
  attachClickEvent(".button-breakfast", "Breakfast");
  attachClickEvent(".button-lunch", "Vegetarian");
  attachClickEvent(".button-dessert", "Dessert");
};

const fetchIngredients = async (ingredientSelected) => {
    const URL_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientSelected}`;

    try{
      const response = await fetch(URL_INGREDIENT)
  
      if (!response.ok) {
        throw new Error("La solicitud falló");
      }
  
      const data = await response.json()
      console.log(data)
      renderMealsByIngredient(data.meals)
  
    }catch(error){
      console.error("Error:", error);
    }
  
};

const renderMealsByIngredient =(dataMeals)=>{
  

  const view = dataMeals.map(meal => `
  <div>
      <div class="container-img">
          <img src="${meal.strMealThumb}" alt="Imagen de plato de comida">
      </div>
      <h3 class="title-meals">${meal.strMeal}</h3>
  </div>
`).slice(0, 4)

containerMealsByIngredient.innerHTML = view;
}

const  eventClickIngredient = (buttonClass) => {
  console.log(buttonClass)
  const button = document.querySelector(buttonClass);
  const ingredient = buttonClass.substring(1)
  button.addEventListener("click", ()=> fetchIngredients(ingredient))
};

const fetchByIngredient = () => {
  eventClickIngredient(".Beef");
  eventClickIngredient(".Avocado");
  eventClickIngredient(".Veal");
  eventClickIngredient(".Celery");
};


fetchData(urlInicio);
fetchCategory();
fetchByIngredient();
