// fetch data
const loadData = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`)
    .then(response => response.json())
    .then(data => loadMeals(data.meals))
}


// loop on meals
const loadMeals = (meals) => {
    // meal container
    const mealsContainer = document.getElementById('meals-container');
    // clear previous result
    mealsContainer.innerHTML = '';
    
    meals.forEach(meal => {
        // create element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('card', 'w-full', 'bg-base-100', 'shadow-xl');
        mealDiv.innerHTML = `
        <figure class="h-[200px]"><img class="" src="${meal.strMealThumb}" alt="meal photo" /></figure>
        <div class="card-body">
          <h2 class="card-title">${meal.strMeal}</h2>
          <p>Origin: ${meal.strArea}</p>
          <div class="card-actions justify-end">
            <label for="my-modal-5" onclick="loadDetails('${meal.idMeal}')" class="btn btn-primary">Learn making</label>
          </div>
        </div>
        `;
        mealsContainer.appendChild(mealDiv);
    });
}



//  load single meal details by "idMeal"
const loadDetails = (idMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response => response.json())
    .then(data => showDetails(data.meals))
}


// show details
const showDetails = (meal) => {
    
    // get container
    const modalBody = document.getElementById('modal-body');
    // reset body
    modalBody.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="modal-action">
            <label for="my-modal-5" class="btn btn-circle">✕</label>
        </div>
        <h1 class="text-3xl">${meal[0].strMeal}</h1>
        <p>${meal[0]. strCategory} , ${meal[0].strArea}</p>
        <div class="">
            <img class="w-full h-full object-cover my-2"src="${meal[0].strMealThumb}" >
            <div>${meal[0].strInstructions}</div>
        </div>
    `;

    modalBody.appendChild(div);

}




// search meal
const searchMeal = () => {
    const searchFor = document.getElementById('search-field').value;
    loadData(searchFor);
}





// function called (main api)
loadData('fish');