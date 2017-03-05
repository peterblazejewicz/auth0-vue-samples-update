<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary fixed-top">
        <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/" class="navbar-brand">Auth0 - Vue.js</router-link>
          <div class="navbar-collapse collapse" id="navbarsExampleDefault" aria-expanded="false">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/public">Public Route</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/private" v-show="authenticated">Private Route</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <button class="btn btn-primary" v-show="!authenticated" @click="login">Log In</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-primary" v-show="authenticated" @click="logout">Log Out</button>
              </li>
            </ul>
          </div>
      </nav>
    </header>
    <main class="container">
      <router-view></router-view>
      <div v-show="authenticated">
        <button class="btn btn-primary" @click="getSecretThing()">Get Secret Thing</button>
        <h3>{{secretThing}}</h3>
      </div>
    </main>
  </div>
</template>

<script>
  import Home from './components/Home.vue';
  import Public from './components/Public.vue';
  import Private from './components/Private.vue';
  import NotFound from './components/NotFound.vue';
  import Auth0Lock from 'auth0-lock';
  import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './auth0-variables';

  export default {
    components: [
      Home,
      Public,
      Private,
      NotFound
    ],
    name: 'app',
    data() {
      return {
        authenticated: false,
        secretThing: '',
        lock: new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
          oidcConformant: true,
          autoclose: true,
          auth: {
            responseType: 'token id_token',
            audience: `https://${AUTH0_DOMAIN}/userinfo`
          }
        })
      }
    },
    methods: {
      login() { },
      logout() { }
    }
  }

</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
  @import "scss/main";
  [v-cloak] {
    display: none;
  }
</style>
