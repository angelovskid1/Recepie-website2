var RECIPES = [
  { id: 'r1', title: 'Garlic Lemon Chicken Pasta', minutes: 20, vegetarian: false,
    ingredients: ['chicken','pasta','garlic','lemon','olive oil','parsley'],
    image: 'https://picsum.photos/seed/pasta/800/600' },
  { id: 'r2', title: 'Veggie Stir-Fry', minutes: 18, vegetarian: true,
    ingredients: ['broccoli','carrot','bell pepper','soy sauce','garlic','ginger'],
    image: 'https://picsum.photos/seed/stirfry/800/600' },
  { id: 'r3', title: 'Avocado Toast Deluxe', minutes: 10, vegetarian: true,
    ingredients: ['bread','avocado','lemon','chili flakes'],
    image: 'https://picsum.photos/seed/avotoast/800/600' },
  { id: 'r4', title: 'Salmon & Rice Bowl', minutes: 25, vegetarian: false,
    ingredients: ['salmon','rice','soy sauce','sesame','scallion'],
    image: 'https://picsum.photos/seed/salmon/800/600' },
  { id: 'r5', title: 'Tomato Basil Soup', minutes: 30, vegetarian: true,
    ingredients: ['tomato','basil','onion','garlic','cream'],
    image: 'https://picsum.photos/seed/soup/800/600' }
];

var DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var LS_KEYS = { PLAN:'rfmp.plan.v1', FAVS:'rfmp.favs.v1' };

function normalizePlan(obj) {
  var base = {};
  for (var i=0;i<DAYS.length;i++) base[DAYS[i]]=[];
  if(!obj)return base;
  for (var j=0;j<DAYS.length;j++){
    var d=DAYS[j];
    if(Array.isArray(obj[d])) base[d]=obj[d];
  }
  return base;
}
function getPlan(){
  var raw=localStorage.getItem(LS_KEYS.PLAN);
  try{return normalizePlan(JSON.parse(raw));}
  catch(e){return normalizePlan();}
}
function setPlan(plan){localStorage.setItem(LS_KEYS.PLAN,JSON.stringify(plan));}

function getFavs(){
  var raw=localStorage.getItem(LS_KEYS.FAVS);
  try{return new Set(JSON.parse(raw)||[]);}
  catch(e){return new Set();}
}
function setFavs(f){localStorage.setItem(LS_KEYS.FAVS,JSON.stringify(Array.from(f)));}

var q=document.getElementById('q');
var filter=document.getElementById('filter');
var list=document.getElementById('list');
var favsEl=document.getElementById('favs');
var planTableBody=document.getElementById('planTable').querySelector('tbody');
var clearBtn=document.getElementById('clearData');

function renderRecipes(){
  var term=q.value.toLowerCase().trim();
  var mode=filter.value;
  var favs=getFavs();
  var items=RECIPES.filter(function(r){
    var nameMatch=r.title.toLowerCase().indexOf(term)!==-1;
    var ingredientMatch=r.ingredients.some(function(ing){
      return ing.toLowerCase().indexOf(term)!==-1;
    });
    var filterMatch=(mode==='all')||
      (mode==='veg'&&r.vegetarian)||
      (mode==='quick'&&r.minutes<25);
    return(!term||nameMatch||ingredientMatch)&&filterMatch;
  });
  var html='';
  for(var i=0;i<items.length;i++){
    html+=cardHTML(items[i],favs);
  }
  list.innerHTML=html;
  for(var k=0;k<items.length;k++){
    attachCardHandlers(items[k].id);
  }
}

function cardHTML(r,favs){
  var favOn=favs.has(r.id);
  var dayOpts='<option value="">Add to day…</option>';
  for(var i=0;i<DAYS.length;i++){
    dayOpts+='<option value="'+DAYS[i]+'">'+DAYS[i]+'</option>';
  }
  return ''+
  '<article class="card" id="card-'+r.id+'">'+
    '<img src="'+r.image+'" alt="'+r.title+'">'+
    '<div class="pad">'+
      '<div class="title">'+r.title+'</div>'+
      '<div class="muted">'+r.ingredients.join(', ')+'</div>'+
      '<div class="tags">'+
        '<span class="tag">'+r.minutes+' min</span>'+
        (r.vegetarian?'<span class="tag">Vegetarian</span>':'')+
      '</div>'+
      '<div class="row">'+
        '<select id="day-'+r.id+'">'+dayOpts+'</select>'+
        '<div class="row">'+
          '<button class="primary" id="add-'+r.id+'">Add</button>'+
          '<button class="ghost" id="fav-'+r.id+'">'+(favOn?'★':'☆')+'</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</article>';
}

function renderPlan(){
  var plan=getPlan();
  var html='';
  for(var i=0;i<DAYS.length;i++){
    var d=DAYS[i];
    var ids=plan[d];
    var rows='';
    if(ids.length){
      for(var j=0;j<ids.length;j++){
        var r=findRecipeById(ids[j]);
        if(!r)continue;
        rows+='<div class="row" style="justify-content:space-between;">'+
          '<div>'+r.title+'</div>'+
          '<button class="ghost removeOne" data-day="'+d+'" data-index="'+j+'">Remove</button>'+
        '</div>';
      }
    }else rows='<span class="muted">Empty</span>';
    html+='<tr><th>'+d+'</th><td>'+rows+'</td>'+
      '<td><button data-day="'+d+'" class="ghost clearDay">Clear</button></td></tr>';
  }
  planTableBody.innerHTML=html;
  var clearBtns=planTableBody.querySelectorAll('.clearDay');
  for(var k=0;k<clearBtns.length;k++){
    clearBtns[k].addEventListener('click',function(e){
      var d=e.currentTarget.dataset.day;
      var p=getPlan();p[d]=[];setPlan(p);renderPlan();
    });
  }
  var removeBtns=planTableBody.querySelectorAll('.removeOne');
  for(var m=0;m<removeBtns.length;m++){
    removeBtns[m].addEventListener('click',function(e){
      var d=e.currentTarget.dataset.day;
      var i=parseInt(e.currentTarget.dataset.index);
      var p=getPlan();p[d].splice(i,1);setPlan(p);renderPlan();
    });
  }
}

function renderFavs(){
  var favs=getFavs();
  if(!favs.size){
    favsEl.innerHTML='<span class="muted">No favorites yet.</span>';return;
  }
  var html='';
  favs.forEach(function(id){
    var r=findRecipeById(id);
    if(!r)return;
    html+='<div class="row" style="justify-content:space-between;">'+
      '<div>'+r.title+'</div>'+
      '<button class="ghost unfav" data-id="'+id+'">Remove</button>'+
    '</div>';
  });
  favsEl.innerHTML=html;
  var rm=favsEl.querySelectorAll('.unfav');
  for(var i=0;i<rm.length;i++){
    rm[i].addEventListener('click',function(){
      var id=this.dataset.id;
      var set=getFavs();
      set.delete(id);
      setFavs(set);
      renderFavs();renderRecipes();
    });
  }
}

function attachCardHandlers(id){
  var addBtn=document.getElementById('add-'+id);
  var daySel=document.getElementById('day-'+id);
  var favBtn=document.getElementById('fav-'+id);

  if(addBtn){
    addBtn.addEventListener('click',function(){
      var d=daySel.value;if(!d)return;
      var p=getPlan();p[d].push(id);setPlan(p);daySel.value='';renderPlan();
    });
  }
  if(favBtn){
    favBtn.addEventListener('click',function(){
      var set=getFavs();
      if(set.has(id))set.delete(id);else set.add(id);
      setFavs(set);renderRecipes();renderFavs();
    });
  }
}

function findRecipeById(id){
  for(var i=0;i<RECIPES.length;i++){
    if(RECIPES[i].id===id)return RECIPES[i];
  }
  return null;
}

q.addEventListener('input',renderRecipes);
filter.addEventListener('change',renderRecipes);
clearBtn.addEventListener('click',function(){
  if(!confirm('Clear all saved data?'))return;
  localStorage.removeItem(LS_KEYS.PLAN);
  localStorage.removeItem(LS_KEYS.FAVS);
  renderPlan();renderFavs();renderRecipes();
});

renderRecipes();
renderPlan();
renderFavs();
window.addEventListener('storage',function(e){
  if(e.key===LS_KEYS.PLAN)renderPlan();
  if(e.key===LS_KEYS.FAVS){renderFavs();renderRecipes();}
});
