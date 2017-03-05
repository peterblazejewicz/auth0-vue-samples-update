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

  // Utility to check auth status
  function checkAuth() {
    return !!localStorage.getItem('id_token');
  }
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
      login() {
        this.lock.show();
      },
      logout() {
        // To log out, we just need to remove the token and profile from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('profile');
        this.authenticated = false;
      },
      // Make a secure call to the server by attaching the user's JWT as an
      // Authorization header
      getSecretThing() {
        var jwtHeader = {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        };
        // GET /someUrl
        this.$http.get('http://localhost:3001/secured/ping').then(response => {
          // get body data
          this.someData = response.body;
        }, error => {
          // error callback
          console.log(error);
        });
      }
    },
    mounted() {
      this.authenticated = checkAuth();
      this.lock.on('authenticated', (authResult) => {
        console.log('authenticated');
        localStorage.setItem('id_token', authResult.accessToken);
        this
          .lock
          .getUserInfo(authResult.accessToken, (error, profile) => {
            if (error) {
              // Handle error
              return;
            }
            // Set the token and user profile in local storage
            localStorage.setItem('profile', JSON.stringify(profile));
            this.authenticated = true;
          });
      });
      this.lock.on('authorization_error', (error) => {
        // handle error when authorizaton fails
      });
    }
  }

</script>

<style lang="scss">
  @import "scss/main";
  [v-cloak] {
    display: none;
  }
</style>
