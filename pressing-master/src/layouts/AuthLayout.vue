<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #1a037e" elevated>
      <q-toolbar>
        <q-toolbar-title
          ><div class="toolbar-title">Le Pressing</div>
        </q-toolbar-title>
        <router-link to="/login">Login</router-link>

        <router-link to="/register">Register</router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 25px;
  letter-spacing: 5px;
  font-weight: bold;
  color: gainsboro;
}
.q-layout {
  background-color: gainsboro;
}
a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  border-radius: max;
  padding: 1rem 1rem;
  display: inline-block;
}
a:hover,
a:active,
a.active,
a.router-link-active {
  font-weight: bold;
  color: rgb(221, 127, 142);
  border-color: #ffffff;
  background-color: #1a037e;
}
</style>
