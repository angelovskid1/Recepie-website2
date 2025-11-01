
const recipes = [
  {
    recipeId: 1,
    time: 5,
    name: "Peanut Butter & Jelly",
    ingredients: ["bread", "jelly", "peanut butter"],
    image: "pbj.jpg"//https://www.google.com/search?sca_esv=67b46ba106913391&rlz=1C5CHFA_enUS963US963&sxsrf=AE3TifMGodvldQAWR3EcaePogbQuHBUvhQ:1762015715522&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIemkjk18Cn72Gp24fGkjjh6zx5r9-tqg6OrBVOwHghPIhPvquPADFA24QJT-Bzhg0sdEv2AZEe6DYcOhCUJtLB-h4BzINphHW5Pd6IMDRsAPfY4H30pFPFp1UJaMV2FFto3wUVCcMKnmm8cF0_ib64psTJy81B0_Z7JGwUsbAe4CVhBD_WQ&q=peanut+butter+and+jelly&sa=X&ved=2ahUKEwiexr-GtNGQAxV5GFkFHSuYJSgQtKgLegQIERAB&biw=1760&bih=887&dpr=2#vhid=RKBG_F2lxGiakM&vssid=mosaic
  },
  {
    recipeId: 2,
    time: 120,
    name: "Spaghetti & Meatballs",
    ingredients: ["pasta", "Ground Beef", "Tomato Sauce"],
    image: "sm.jpg"//https://www.google.com/search?q=spaghetti+and+meatballs&sca_esv=67b46ba106913391&rlz=1C5CHFA_enUS963US963&udm=2&biw=1760&bih=887&sxsrf=AE3TifNJj7wUD9SSkusuT_xlE0RxHgjMfg%3A1762015718739&ei=5jkGabLkLJav5NoP6L-72QM&oq=spaghetti+and+meat&gs_lp=Egtnd3Mtd2l6LWltZyISc3BhZ2hldHRpIGFuZCBtZWF0KgIIADIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIwllQpwJYg05wAngAkAEAmAHdAaABrBCqAQYzOS4wLjG4AQHIAQD4AQGYAiqgAusRqAIKwgINEAAYgAQYsQMYQxiKBcICBhAAGAcYHsICBxAjGCcYyQLCAgoQABiABBhDGIoFwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICEBAAGIAEGLEDGEMYgwEYigXCAgoQIxgnGMkCGOoCmAMEiAYBkgcGNDEuMC4xoAeygwKyBwYzOS4wLjG4B98RwgcGMC4yLjQwyAeaAQ&sclient=gws-wiz-img#vhid=0E6RQiz56biFTM&vssid=mosaic
  },
  {
    recipeId: 3,
    name: "Mac & Cheese",
    time: 30,
    ingredients: ["macaroni", "milk", "cheese"],
    image: "maccheese.jpg"//https://www.google.com/search?q=mac+and+cheese&sca_esv=67b46ba106913391&rlz=1C5CHFA_enUS963US963&udm=2&biw=1760&bih=887&sxsrf=AE3TifPNMAS5MLPmCdbeqClgUzXv_QF_qA%3A1762015797126&ei=NToGafKxB56u5NoP3tng4Ag&ved=0ahUKEwiyoLSttNGQAxUeF1kFHd4sGIwQ4dUDCBQ&uact=5&oq=mac+and+cheese&gs_lp=Egtnd3Mtd2l6LWltZyIObWFjIGFuZCBjaGVlc2UyDRAAGIAEGLEDGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCBAAGIAEGLEDMgoQABiABBhDGIoFMgUQABiABDIKEAAYgAQYQxiKBTIFEAAYgAQyCBAAGIAEGLEDMgoQABiABBhDGIoFSNd8UO8DWIo_cAN4AJABAJgBRaAB2g2qAQIzN7gBA8gBAPgBAZgCKKAChQ-oAgrCAgYQABgHGB7CAgcQIxgnGMkCwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICChAjGCcYyQIY6gLCAgoQABiABBixAxgKwgIHEAAYgAQYCsICDRAAGIAEGLEDGIMBGAqYAwSIBgGSBwI0MKAH-PUBsgcCMze4B_gOwgcGMC4zLjM3yAeLAQ&sclient=gws-wiz-img#vhid=voyCEWPf5vG4sM&vssid=mosaic
  },
  {
    recipeId: 4,
    time: 60,
    name: "Rice & Steak",
    ingredients: ["rice", "seasoning", "steak"],
    image: "ricesteak.jpg"//https://www.google.com/search?q=rice+and+steak&sca_esv=67b46ba106913391&rlz=1C5CHFA_enUS963US963&udm=2&biw=1760&bih=887&sxsrf=AE3TifMMtkGwBcR3IqQY0B2sWnOzMXIrQw%3A1762015859573&ei=czoGaZi_Irrf5NoPuarpyAg&ved=0ahUKEwjYxJfLtNGQAxW6L1kFHTlVGokQ4dUDCBQ&uact=5&oq=rice+and+steak&gs_lp=Egtnd3Mtd2l6LWltZyIOcmljZSBhbmQgc3RlYWsyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESPQhUOoGWMUccAF4AJABAJgBN6ABwwWqAQIxNLgBA8gBAPgBAZgCD6AChwaoAgrCAgoQIxgnGMkCGOoCwgIHECMYJxjJAsICCBAAGIAEGLEDwgILEAAYgAQYsQMYgwHCAgoQABiABBhDGIoFwgIOEAAYgAQYs
  },
  {
    recipeId: 5,
    time: 60,
    name: "Burger",
    ingredients: ["patty", "buns", "lettuce", "tomatoes", "Mayo"],
    image: "burger.jpg"//https://www.google.com/search?q=burger&sca_esv=67b46ba106913391&rlz=1C5CHFA_enUS963US963&udm=2&biw=1760&bih=887&sxsrf=AE3TifMQLgwDeaGD-b0H37ZjfOigqfqKww%3A1762015896680&ei=mDoGadyfKcKl5NoPgvad-Qk&ved=0ahUKEwjcy_DctNGQAxXCElkFHQJ7J58Q4dUDCBQ&uact=5&oq=burger&gs_lp=Egtnd3Mtd2l6LWltZyIGYnVyZ2VyMgoQABiABBhDGIoFMgoQABiABBhDGIoFMg0QABiABBixAxhDGIoFMggQABiABBixAzIKEAAYgAQYQxiKBTIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBUiwNlDBBViDLXACeACQAQCYAcEBoAGFCaoBBDE3LjK4AQPIAQD4AQGYAhWgAukJqAIKwgIGEAAYBxgewgIFEAAYgATCAgcQIxgnGMkCwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICChAjGCcYyQIY6gKYAwSIBgGSBwQxOS4yoAftc7IHBDE3LjK4B98JwgcEMi0yMcgHUQ&sclient=gws-wiz-img#vhid=b6mtbcLrqxSqOM&vssid=mosaic
  }
];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let currentSearch = '';

    // This is what display the recipes 
    function displayRecipes() {
      const container = document.getElementById('list');
      const searchText = currentSearch.toLowerCase();
      container.innerHTML = '';

      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let showRecipe = false;

        if (searchText === '') {
          showRecipe = true;
        } else {
          if (recipe.name.toLowerCase().includes(searchText)) {
            showRecipe = true;
          }
          for (let j = 0; j < recipe.ingredients.length; j++) {
            if (recipe.ingredients[j].toLowerCase().includes(searchText)) {
              showRecipe = true;
            }
          }
        }

        if (showRecipe) {
          displayRecipeCard(recipe, container);
        }
      }
    }

    
    function displayRecipeCard(recipe, container) {
      const favorites = localStorage.getItem('favorites');
      let favArray = favorites ? JSON.parse(favorites) : [];
      let isFavorite = favArray.includes(recipe.recipeId);

      let ingredientTags = '';
      for (let j = 0; j < recipe.ingredients.length; j++) {
        ingredientTags += '<span class="tag">' + recipe.ingredients[j] + '</span>';
      }

      let dayOptions = '<option value="">Add to plan...</option>';
      for (let d = 0; d < days.length; d++) {
        dayOptions += '<option value="' + days[d] + '">' + days[d] + '</option>';
      }

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML =
        '<img src="' + recipe.image + '" alt="' + recipe.name + '">' +
        '<div class="pad">' +
        '<div class="title">' + recipe.name + '</div>' +
        '<div class="muted">' + recipe.time + ' min</div>' +
        '<div class="tags">' + ingredientTags + '</div>' +
        '<div class="row">' +
        '<select class="daySelect" data-recipe-id="' + recipe.recipeId + '">' + dayOptions + '</select>' +
        '<button class="ghost favBtn" data-recipe-id="' + recipe.recipeId + '">' + (isFavorite ? '⭐' : '☆') + '</button>' +
        '</div>' +
        '</div>';

      container.appendChild(card);

   
      card.querySelector('.favBtn').onclick = function() {
        const recipeId = parseInt(this.getAttribute('data-recipe-id'));
        let favs = localStorage.getItem('favorites');
        let favArray = favs ? JSON.parse(favs) : [];
        const index = favArray.indexOf(recipeId);

        if (index > -1) {
          favArray.splice(index, 1);
        } else {
          favArray.push(recipeId);
        }

        localStorage.setItem('favorites', JSON.stringify(favArray));
        displayRecipes();
        displayFavorites();
      };

     
      card.querySelector('.daySelect').onchange = function() {
        const recipeId = parseInt(this.getAttribute('data-recipe-id'));
        const day = this.value;
        if (day !== '') {
          let plan = localStorage.getItem('weeklyPlan');
          let planObj = plan ? JSON.parse(plan) : {};
          planObj[day] = recipeId;
          localStorage.setItem('weeklyPlan', JSON.stringify(planObj));
          this.value = '';
          displayWeeklyPlan();
        }
      };
    }

    // This is what searches from the value you input in the search tab
    function performSearch() {
      currentSearch = document.getElementById('q').value;
      displayRecipes();
    }

    
    function displayWeeklyPlan() {
      const tbody = document.querySelector('#planTable tbody');
      tbody.innerHTML = '';
      const plan = localStorage.getItem('weeklyPlan');
      let planObj = plan ? JSON.parse(plan) : {};

      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const row = document.createElement('tr');
        const recipeId = planObj[day];
        let recipe = recipes.find(r => r.recipeId === recipeId);

        if (recipe) {
          row.innerHTML = '<th>' + day + '</th><td><div class="row"><div><strong>' + recipe.name + '</strong><span class="pill">' + recipe.time + ' min</span></div><button class="ghost removeBtn" data-day="' + day + '">✕</button></div></td>';
        } else {
          row.innerHTML = '<th>' + day + '</th><td><span class="muted">No meal planned</span></td>';
        }
        tbody.appendChild(row);
      }

      document.querySelectorAll('.removeBtn').forEach(btn => {
        btn.onclick = function() {
          const day = this.getAttribute('data-day');
          let plan = localStorage.getItem('weeklyPlan');
          let planObj = plan ? JSON.parse(plan) : {};
          delete planObj[day];
          localStorage.setItem('weeklyPlan', JSON.stringify(planObj));
          displayWeeklyPlan();
        };
      });
    }

    // shows the favorites
    function displayFavorites() {
      const container = document.getElementById('favs');
      const favorites = localStorage.getItem('favorites');
      let favArray = favorites ? JSON.parse(favorites) : [];

      if (favArray.length === 0) {
        container.innerHTML = '<div class="muted">No favorite recipes yet. Click the star on a recipe to add it!</div>';
        return;
      }

      container.innerHTML = '';
      for (let i = 0; i < favArray.length; i++) {
        const recipe = recipes.find(r => r.recipeId === favArray[i]);
        if (recipe) {
          const div = document.createElement('div');
          div.style.padding = '8px 0';
          div.style.borderBottom = '1px solid #e5e7eb';
          div.innerHTML = '<div class="row"><div><strong>' + recipe.name + '</strong><span class="muted" style="margin-left:8px;">' + recipe.time + ' min</span></div><button class="ghost unfavBtn" data-recipe-id="' + recipe.recipeId + '">✕</button></div>';
          container.appendChild(div);
        }
      }

      document.querySelectorAll('.unfavBtn').forEach(btn => {
        btn.onclick = function() {
          const recipeId = parseInt(this.getAttribute('data-recipe-id'));
          let favs = localStorage.getItem('favorites');
          let favArray = favs ? JSON.parse(favs) : [];
          const index = favArray.indexOf(recipeId);
          if (index > -1) favArray.splice(index, 1);
          localStorage.setItem('favorites', JSON.stringify(favArray));
          displayRecipes();
          displayFavorites();
        };
      });
    }

    
    function clearData() {
      localStorage.removeItem('favorites');
      localStorage.removeItem('weeklyPlan');
      displayRecipes();
      displayWeeklyPlan();
      displayFavorites();
    }

    
    document.getElementById('q').onkeydown = function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    };
    document.getElementById('searchBtn').onclick = performSearch;
    document.getElementById('clearData').onclick = clearData;

    displayRecipes();
    displayWeeklyPlan();
    displayFavorites();