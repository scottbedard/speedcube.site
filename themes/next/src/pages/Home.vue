<template>
  <div>
    Hello from the home page<br />
    <router-link
      class="text-blue-500 hover:underline"
      :to="{ name: 'about' }">
      Go to about page
    </router-link>
  </div>
</template>
