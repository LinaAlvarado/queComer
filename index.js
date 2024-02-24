const urlInicio = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`;

const containerMeals = document.querySelector(".container-meals");

// const fetchData = (urlApi) => {
//   fetch(urlApi)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("La solicitud falló");
//       }
//       return response.json(); // Convertir la respuesta a JSON
//     })
//     .then((data) => {
//       console.log(data);
//       let view = `${data.meals.map(
//         (meal) => `
//       <div>
//           <div class="container-img">
//             <img src="${meal.strMealThumb}" alt="Imagen de plato de comida">
//           </div>
//           <h3 class="title-meals">${meal.strMeal}</h3>
//       </div>
//       `
//       )}`;

//       containerMeals.innerHTML = view;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

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


// const fetchDataCategory = (categorieSelected) => {
//   const URL_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorieSelected}`;
//   fetch(URL_CATEGORY)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       let view = `${data.meals
//         .map(
//           (meal) => `
//           <div>
//               <div class="container-img">
//                 <img src="${meal.strMealThumb}" alt="Imagen de plato de comida">
//               </div>
//               <h3 class="title-meals" >${meal.strMeal}</h3>
//           </div>
//           `
//         )
//         .slice(0, 12)}`;
//       containerMeals.innerHTML = view;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

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

const fetchIngredients = (urlI) => {
  fetch(urlI)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log("llll");
    });
};

fetchData(urlInicio);
fetchCategory();
fetchIngredients("https://www.themealdb.com/api/json/v1/1/filter.php?i=Salmon");
