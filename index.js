const loadMealCatagories = ()=>
{
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;

    // const response = await fetch(url);
    // const data = await response.json();
    // displayMealDetail(data)
    
    fetch(url).then(response => response.json()).then(data => displayAllCatagoris(data))
    .catch(error =>{ 
        alert("!!! Error !!!")
        console.log(error)    } );;

}

  
function displayAllCatagoris(food)
{    
    const meals_categories = food.categories;
    
   
    //  console.log(food);
    //  console.log(meals_item);
     const mealDisplay = document.getElementById('mealCatagories')
     mealDisplay.innerHTML = ` `;
     console.log(meals_categories);
     if (meals_categories == null)
      {  
          console.log('no');
          alert("NO ITEM FOUND PLEASE SEARCH SOMETHING ELSE");
          mealDisplay.innerHTML = `<h1 class='text-white'>NO ITEM FOUND PLEASE SEARCH SOMETHING ELSE</h1> `;
         
     }
    //  for (const meal of meals_item)
    // {
    
    //     const mealContainer = document.createElement('div')
    //     mealContainer.className= 'col-3'

    //     mealContainer.innerHTML = 
    //     ` <img src= ${meal.strMealThumb} onclick='loadMealDetails(${meal.idMeal})' class="img-fluid" alt="">
    //       <p class="text-center text-warning">${meal.strMeal}</p>
    //     `
        
    //     mealDisplay.appendChild(mealContainer);
    //  }

    meals_categories.forEach(catagory => {
      const {idCategory,strCategory,strCategoryThumb}=catagory
      const name = strCategory;
      console.log();
      const mealContainer = document.createElement('div')
          mealContainer.className= 'col-4'
  
          mealContainer.innerHTML = 
          ` <img src= ${strCategoryThumb} onclick="displayItemsByCatagory('${name}')" class="img-fluid" alt="">
            <p class="text-center text-warning">${name}</p>
          `
         
          mealDisplay.appendChild(mealContainer);
      
    });
    return mealDisplay;
}

const displayItemsByCatagory =(category)=>{

   const find = category
   console.log(find);
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${find}`
       
 
  fetch(url).then(response => response.json()).then(data => displayAllItems(data));


}
loadMealCatagories()
const searchFood = ()=>
  {   
   
      const searchFild = document.getElementById('search');
      const searchFild2 = document.getElementById('search2');
    
        const searchText = searchFild.value||searchFild2.value;
        console.log(typeof searchText);
        searchFild.value='';

        if (searchText == 'x'|| searchText == 'y' )
        {
            alert('Please Enter Some Food Name!!!');
         
        }
         
        else
        {

            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
       
        
           fetch(url).then(response => response.json()).then(data => displayAllItems(data));

        }
        
     
          
   };

function displayAllItems(food)
{    
    const meals_item = food.meals;
    console.log(meals_item);
    //  console.log(meals_item);
     const mealDisplay = document.getElementById('mealDisplay')
     mealDisplay.innerHTML = ` `;
     console.log(meals_item);
     if (meals_item == null)
      {  
          console.log('no');
          alert("NO ITEM FOUND PLEASE SEARCH SOMETHING ELSE");
          mealDisplay.innerHTML = `<h1 class='text-white'>NO ITEM FOUND PLEASE SEARCH SOMETHING ELSE</h1> `;
         
     }
     for (const meal of meals_item)
    {
        const {idMeal,strMealThumb,strMeal}=meal
        const mealContainer = document.createElement('div')
        mealContainer.className= 'col-3'

        mealContainer.innerHTML = 
        ` <img src= ${strMealThumb}  data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onclick='loadMealDetails(${idMeal})' class="img-fluid" alt="">
          <p class="text-center text-warning">${strMeal}</p>
        `
        
        mealDisplay.appendChild(mealContainer);
     }
    return mealDisplay;
}

const loadMealDetails = (mealId)=>
{    
   
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    // const response = await fetch(url);
    // const data = await response.json();
    // displayMealDetail(data)
    
    fetch(url).then(response => response.json()).then(data => displayMealDetail(data))
    .catch(error =>{ 
        alert("!!! Error !!!")
        console.log(error)    } );;

}

const displayMealDetail = (mealDetail)=>

{   

    const eachMealDisplay = document.getElementById('mealDetail');
    
    const eachMeal = mealDetail.meals;
    eachMeal.forEach( meal =>
     { 
        eachMealDisplay.innerHTML = 
        `<div class="card mb-3  meal_detail_section  p-2">
        <div class="row g-0">
          <div class="col-md-4 ms-0">
            <img src=${meal.strMealThumb} class="img-fluid">
          </div>
          <div class="col-md-8">
            <div class="card-body">
             <ol>
                 <li>Name : ${meal.strMeal}</li>
                 <li>Catagory:${meal.strCategory}</li>
                 <li>Origine: ${meal.strArea}</li>   
             <a href=${meal.strYoutube} target='_blank_'> <button type="button" class="btn btn-outline-dark mt-2 text-white shadow "> VEDIO INSTRUCTION </button></a>
             </ol>
            </div>
          </div>
        </div>
        <div class="accordion accordion-flush mt-5 " id="accordionFlushExample">
        <div class="accordion-item w-75 ">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button  collapsed " type="button" data-bs-toggle="collapse"
             data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              **Recipy**
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body bg-dark">
             ${meal.strInstructions}
            </div>
          </div>
        </div> 
      </div>   
      </div>

        `
        console.log(eachMeal);
    });
    
}