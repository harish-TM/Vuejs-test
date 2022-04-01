<template>
  <div class="navbar">
    <nav class="nav-extended teal darken-2">
      <div class="nav-content container">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title">Cooking Recipes </span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink pulse">
          <router-link :to="{ name: 'AddRecipe' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {

    }
  }
}
</script>

<style>
.navbar nav{
  padding: 0 20px;
}
</style>