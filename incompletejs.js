const recipes=[{
  recipeId:1,
  time:5,
  name:"Peanut Butter & Jelly",
  ingredients:["bread","jelly","penutbutter"],},
{recipeId: 2,
time:120,
name:"Spaghetti & MeatBalls",
ingredients: ["pasta","Ground Beef","Tomatoe Suace"]},{recipeId:3,
 name: "Mac & Cheese",
 time: 30,
 ingredients:["macoroni","milk","cheese"]},
{recipeId:4,
  time:60,
  name:"Rice & Steak",
  ingredients:["rice","seasoning","steak"]},
{recipeId:5,
time:60,
name:"Burger",
ingredients:["patty","buns","lettuce","tomatoes","Mayo"],
}
];
function displayRecipes() {
  const container = document.getElementById('list');
  container.innerHTML = '';
  
  for (let recipe of recipes) {
    const card = `
      <div class="card">
        <div class="pad">
          <div class="title">${recipe.name}</div>
          <div class="muted">${recipe.time} min</div>
        </div>
      </div>
    `;
    
    container.innerHTML += card;
  }
}

displayRecipes();