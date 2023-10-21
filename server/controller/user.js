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
            ctx.suc("登录成功!", newUser[0])
        } else {
            ctx.err("密码错误！", err)
        }
    }
})

router.post("/find", async ctx => {
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
        ctx.err("查找失败", err)
        console.log('err', err)
        return
    } else {
        console.log(newUser)
        if (newUser.length > 0) {
            ctx.suc("查找成功!", newUser[0])
        } else {
            ctx.err("查找失败,用户不存在", newUser)
        }
    }
})

router.post("/upbateName", async ctx => {
    let data = ctx.request.body

    const [err, succ] = await to(
        userModel.update({ name: data.user_name }, {
            where: {
                id: data.user_id,
            },
            raw: true
        })
    )
    if (err) {
        ctx.err("修改名字失败", err)
        console.log('err', err)
        return
    } else {
        console.log(succ)
        if (succ.length > 0) {
            ctx.suc("修改名字成功!", succ)
        } else {
            ctx.err("修改名字失败", err)
        }
    }
})

module.exports = router.routes()
