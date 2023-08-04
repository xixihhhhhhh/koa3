const Router = require("@koa/router")//引入koa-router
const router = new Router()


//引入路由,以后每有一个controller就加多一个路由
//用户获取token等路由
router.use('/user', require("./controller/user"))

module.exports = router.routes()
