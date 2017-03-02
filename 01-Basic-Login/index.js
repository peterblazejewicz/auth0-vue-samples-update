var Home = {
  template: '#home-template'
}
var Login = {
  template: '#login-template'
}
var Logout = {
  template: '#logout-template'
}

var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/logout',
      component: Logout
    }
  ]
})

var app = new Vue({router: router}).$mount('#app')
