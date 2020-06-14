<template>
  <div>
    Hello from the about page<br />
    <router-link
      class="text-blue-500 hover:underline"
      :to="{ name: 'home' }">
      Go to home page
    </router-link>
  </div>
</template>
