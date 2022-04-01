<template>
  <div class="add-recipe container z-depth-1">
    <h2 class="center-align teal-text">Add New Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="field title">
        <label for="title">Recipe title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" class="field ingredient" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete pink-text text-darken-3" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient (press tab to add):</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import recipesColRef from '@/firebase/init'
import { addDoc } from "firebase/firestore";
import slugify from 'slugify'

export default {
  name: 'AddRecipe',
  data(){
    return{
      title: null,
      ingredients: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    async addRecipe(){
      if(this.title) {
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        //save smoothie to firestore
        await addDoc(recipesColRef, {
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
        });
        this.$router.push({ name: 'Index' })
      } else {
        this.feedback = 'You must enter a recipe title'
      }
    },
    addIng(){
      if(this.another){
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another ingredient'
      }
    },
    deleteIng(ing){
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-recipe{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipe h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field{
  margin: 20px auto;
}
.add-recipe .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
.add-recipe .ingredient{
    position: relative;
}
</style>
