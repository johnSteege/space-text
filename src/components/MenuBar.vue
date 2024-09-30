<script setup lang="ts"></script>

<template>
  <div class="menu-bar">
    <RouterLink to="/"><button>&lt; Menu</button></RouterLink>
    <RouterLink to="/game/ship"><button>Ship</button></RouterLink>
    <RouterLink to="/game/inventory"><button>Inventory</button></RouterLink>
    <RouterLink to="/game/story"><button>Story</button></RouterLink>
  </div>
</template>

<style scoped>
.menu-bar {
  margin-bottom: 10px;
}
</style>
