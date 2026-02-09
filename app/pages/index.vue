<script setup lang="ts">
const count = ref(0)
const increment = (): void => {
  count.value++
}
</script>

<template>
  <div class="home">
    <h1>Welcome to Nuxt 4 Template</h1>
    <p>
      This template is configured with TypeScript, ESLint, Prettier, Vitest, Playwright, and
      more.
    </p>

    <div class="card">
      <button type="button" @click="increment">Count is {{ count }}</button>
      <p>
        Edit <code>app/pages/index.vue</code> to test hot module replacement.
      </p>
    </div>

    <p>
      <NuxtLink to="/about">Check out About page</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2em;
}

.card {
  padding: 2em;
}

button {
  margin-bottom: 1em;
  padding: 0.5em 1em;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}
</style>
