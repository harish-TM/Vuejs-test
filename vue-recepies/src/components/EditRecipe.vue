<template>
  <div v-if="recipe" class="edit-recipe container z-depth-1">
    <h2 class="teal-text center-align">Edit {{ recipe.title }} Recipe</h2>
    <form @submit.prevent="editRecipe">
      <div class="field title">
        <label for="title">Recipe title:</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div
        v-for="(ing, index) in recipe.ingredients"
        class="field ingredient"
        :key="index"
      >
        <label for="ingredient">Ingredient:</label>
        <input
          type="text"
          name="ingredient"
          v-model="recipe.ingredients[index]"
        />
        <i class="material-icons delete pink-text text-darken-3" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient"
          >Add an ingredient (press tab to add):</label
        >
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import recipesColRef from "@/firebase/init";
import { getDoc, doc, setDoc } from "firebase/firestore";
import slugify from "slugify";

export default {
  name: "EditRecipe",
  data() {
    return {
      docRef:null,
      recipe: null,
      another: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    async editRecipe() {
      if (this.recipe.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        // update recipe in firestore
         await setDoc(this.docRef,{
             title: this.recipe.title,
             ingredients:this.recipe.ingredients,
             slug: this.slug,
         });
        this.$router.push({ name: "Index" });
      } else {
        this.feedback = "You must enter a recipe title";
      }
    },
    addIng() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add another ingredient";
      }
    },
    deleteIng(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(
        (ingredient) => {
          return ingredient != ing;
        }
      );
    },
    async getRecipe() {
      let recipeRef = doc(recipesColRef, this.slug);
      this.docRef = recipeRef;
        let recipe = await getDoc(this.docRef);
        let recipeData = recipe.data();
        this.recipe = recipeData;
    },
  },
  created() {
    this.slug = this.$route.params.recipe_slug;
    this.getRecipe();
  },
};
</script>
 
<style>
.edit-recipe {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}
.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
 