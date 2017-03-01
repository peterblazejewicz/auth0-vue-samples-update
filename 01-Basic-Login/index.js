const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '#home-component' }
const Callback = { template: '#callback-component' }


const routes = {
  '/': Home,
  '/callback': Callback
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
