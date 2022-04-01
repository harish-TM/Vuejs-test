<template>
<div class="index-wrapper container">
    <h2 class="title pink-text text-darken-3">
      Here are some amazing recipes !
    </h2>
    <div class="field title">
        <input type="text" name="title" v-model="search" placeholder="Enter the ingredient or recipe name" />
        <button class="btn pink search-button" @click="filterRecipe()">Search Recipe</button>
    </div>
  <div class="index">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete pink-text text-darken-3" @click="deleteRecipe(recipe.id)">delete</i>
        <h2 class="teal-text">{{ recipe.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in recipe.ingredients" :key="index">
            <span class="chip pink lighten-5">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditRecipe', params: {recipe_slug: recipe.id}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
  </div>
</template>

<script>
import { getDocs, doc, deleteDoc } from "firebase/firestore"
import recipesColRef from '@/firebase/init'

export default {
  name: 'Index',
  data(){
    return{
      recipes: [],
      search:"",
    }
  },
  methods: {
    async deleteRecipe(id){
      let recipeRef = doc (recipesColRef, id);
      await deleteDoc(recipeRef);
      this.fetchRecipes();
    },
    async fetchRecipes(){
    let snapshot = await getDocs(recipesColRef);
    console.log(snapshot);
    let recipes = [];
    snapshot.forEach(recipe =>{
      let recipeData = recipe.data();
      recipeData.id = recipe.id;
      recipes.push(recipeData);
    })
    this.recipes = recipes;
    },
    filterRecipe(){      
      this.recipes = this.recipes.filter(recipe => {
        if(recipe.title.toLocaleLowerCase().match(this.search)){
          return true;
        }
        let isAnIngredient = false;
        recipe.ingredients.forEach( ing => {
         if( ing.toLocaleLowerCase().match(this.search)){
           isAnIngredient = true
         }
        })
        return isAnIngredient;
      })
    }
  },
  created(){
    this.fetchRecipes();
}
}
</script>

<style>
.index-wrapper .title{
  font-weight: 600;
}
.index-wrapper .search-button{
  margin-top: 15px;
}
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}
.index .ingredients .chip{
  margin-right: 10px;
  margin-top: 10px;
}
.index .delete{
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.6em;
}

.card {
  border-radius: 8px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card:hover {
	-webkit-transform: scale(1.05, 1.05);
	transform: scale(1.05, 1.05);
  box-shadow:  0 6px 20px rgba(0, 0, 0, 0.1);
  }

 .teal-text {
  font-weight: 600;
}

@media only screen and (max-width: 1200px) {
.index{
  grid-template-columns: 1fr 1fr;
}
}

@media only screen and (max-width: 768px) {
.index{
  grid-template-columns: 1fr ;
}
}
</style>