const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '#home-template' }
const About = { template: '<p>about page</p>' }


const routes = {
  '/': Home,
  '/about': About
}
var app = new Vue({
  routes: routes,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
});
app.$mount('#app');
