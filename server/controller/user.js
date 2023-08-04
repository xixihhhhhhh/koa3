const Router = require("@koa/router")
const {
    default: to
} = require("await-to-js")
const router = new Router
const userModel = require("../model/User")

router.post("/enroll", async ctx => {
    let data = ctx.request.body
    console.log(data);
    const [err, newUser] = await to(
        userModel.create({
            name: data.name,
            password: data.password,
            avatarUrl: data.avatarUrl,
        })
    )
    if (err) {
        ctx.err("添加失败", err)
        console.log('err', err)
        return
    } else {
        console.log('succ')
        ctx.suc("添加成功", newUser)
    }
})

router.post("/login", async ctx => {
    let data = ctx.request.body
    const [err, newUser] = await to(
        userModel.findAll({
            where: {
                name: data.name
            },
            raw: true
        })
    )
    if (err) {
        ctx.err("登录失败", err)
        console.log('err', err)
        return
    } else {
        if ((newUser[0].password + '') === (data.password + '')) {
            ctx.suc("登录成功!", newUser)
        } else {
            ctx.err("密码错误！", err)
        }
    }
})

module.exports = router.routes()
