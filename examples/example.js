const {leaf, define, routes} = require("../index")
const http = require("http")

const index = () => {
  return "Hello World"
}

const param_example = (str) => {
  return "Hi, " + str
}

//const async_route = async (user_id) => {
//  const user = await get_user(user_id)
//  return "Hi, " + user.name
//}

// order matters, first match wins
// differs from express, no flow to next()
// a response is expected
//
// so multiple route matches is pointless
// and is a development error
const app = define([
  routes.get("/", [], index),
  //routes.get("/:param", ["param"], param_example),
  routes.resources("/blah")
//  router.get("/user/:user_id", ["user_id"], async_route)
])
//const authed_app = router.define([
//  router.get("/api/new", ["user"], some_function)
//])

// order matters, can flow to the next() since they
// are mostly compatible with express
//
// can wrap middlewares to do common things like named routes
// or grouped routes
const site = define([
//  leaf.site_defaults(),
  routes.route(app),
  //  auth(router.route(authed_app))
  routes.resources("/new_public")
  // TODO define("/public", routes.resources("public"))
])

const server = http.createServer(leaf(site))
server.listen(3000)
