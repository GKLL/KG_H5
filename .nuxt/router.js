import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _4cecacce = () => import('..\\pages\\wealth\\index.vue' /* webpackChunkName: "pages_wealth_index" */).then(m => m.default || m)
const _7414bff2 = () => import('..\\pages\\invite\\index.vue' /* webpackChunkName: "pages_invite_index" */).then(m => m.default || m)
const _96bfb874 = () => import('..\\pages\\views\\millShare\\index.vue' /* webpackChunkName: "pages_views_millShare_index" */).then(m => m.default || m)
const _5c6b7184 = () => import('..\\pages\\views\\millDetail\\index.vue' /* webpackChunkName: "pages_views_millDetail_index" */).then(m => m.default || m)
const _aae999bc = () => import('..\\pages\\views\\millActivityIndex\\index.vue' /* webpackChunkName: "pages_views_millActivityIndex_index" */).then(m => m.default || m)
const _32c487f8 = () => import('..\\pages\\views\\millSchedule\\index.vue' /* webpackChunkName: "pages_views_millSchedule_index" */).then(m => m.default || m)
const _e87db850 = () => import('..\\pages\\views\\mybill\\index.vue' /* webpackChunkName: "pages_views_mybill_index" */).then(m => m.default || m)
const _130449ca = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/wealth",
			component: _4cecacce,
			name: "wealth"
		},
		{
			path: "/invite",
			component: _7414bff2,
			name: "invite"
		},
		{
			path: "/views/millShare",
			component: _96bfb874,
			name: "views-millShare"
		},
		{
			path: "/views/millDetail",
			component: _5c6b7184,
			name: "views-millDetail"
		},
		{
			path: "/views/millActivityIndex",
			component: _aae999bc,
			name: "views-millActivityIndex"
		},
		{
			path: "/views/millSchedule",
			component: _32c487f8,
			name: "views-millSchedule"
		},
		{
			path: "/views/mybill",
			component: _e87db850,
			name: "views-mybill"
		},
		{
			path: "/",
			component: _130449ca,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
