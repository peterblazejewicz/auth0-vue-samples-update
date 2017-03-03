Vue
  .http
  .interceptors
  .push((request, next) => {
    // modify headers
    request
      .headers
      .set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    // continue to next interceptor
    next();
  });

var Public = {
  template: '#public-template'
}
var Private = {
  template: '#private-template'
}

var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/public',
      component: Public
    }, {
      path: '/private',
      component: Private
    }
  ]
});

// Utility to check auth status
function checkAuth() {
  return !!localStorage.getItem('id_token');
}

var app = new Vue({
  router: router,
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
      this
        .lock
        .show();
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
      this
        .$http
        .get('http://localhost:3001/secured/ping')
        .then(response => {
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
    this
      .lock
      .on('authenticated', (authResult) => {
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
    this
      .lock
      .on('authorization_error', (error) => {
        // handle error when authorizaton fails
      });
  }
}).$mount('#app')
