const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express()

//开启json支持
app.use(express.json());

// 启用 CORS
app.use(cors());

const users = {
    '1': {
        password: '1',
        tokens: []
    }
}
//菜单数据
const menuData = [
    {
        name: 'InfoPage',
        path: '/InfoPage',
        children: [
            {
                name: 'Page1',
                path: '/InfoPage/Page1'
            },
            {
                name: "Page2",
                path: '/InfoPage/Page2'
            },
            {
                name: "Page3",
                path: '/InfoPage/Page3'
            }
        ]
    }]

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    } else {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user;
            next()
        })
    }
}

app.get('/menu', authenticateToken, (req, res) => {
    res.status(200).json(menuData)
})
app.get('/data', authenticateToken, (req, res) => {
    const chartData = {
        xAxisData: ['羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        seriesData: [10, 5, 36, 20, 50],
        title: '商品销售详情'
    }
    res.status(200).json(chartData)
})
app.post('/login', (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    const user = users[username]
    if (user && user.password === password) {
        const accessToken = jwt.sign({username}, 'secret_key',
            {expiresIn: '1h'})
        user.tokens.push(accessToken)
        res.status(200).json({accessToken})
    } else {
        res.status(401).json({
            message: 'Invalid Credentials'
        })
    }
})

app.get('/page1-data', authenticateToken, (req, res) => {
    const tableData = [
        { id: 1, name: '张三', age: 25, address: '北京市朝阳区', phone: '13800138000' },
        { id: 2, name: '李四', age: 30, address: '上海市浦东新区', phone: '13900139000' },
        { id: 3, name: '王五', age: 28, address: '广州市天河区', phone: '13700137000' }
    ]
    res.status(200).json(tableData)
})

app.get('/page2-data', authenticateToken, (req, res) => {
    const statisticsData = {
        totalUsers: 1234,
        activeUsers: 891,
        totalOrders: 456,
        pendingOrders: 89,
        weeklyStats: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            values: [120, 200, 150, 80, 70, 110, 130]
        }
    }
    res.status(200).json(statisticsData)
})

app.get('/page3-data', authenticateToken, (req, res) => {
    const formData = {
        categories: ['电子产品', '服装', '食品', '图书', '其他'],
        suppliers: ['供应商A', '供应商B', '供应商C'],
        recentProducts: [
            { id: 1, name: 'iPhone 13', category: '电子产品', price: 6999, stock: 100 },
            { id: 2, name: '休闲裤', category: '服装', price: 199, stock: 500 },
            { id: 3, name: '零食大礼包', category: '食品', price: 99, stock: 1000 }
        ]
    }
    res.status(200).json(formData)
})

app.get('/dashboard-data', authenticateToken, (req, res) => {
    const dashboardData = {
        statistics: [
            { label: '总用户数', value: '1,234' },
            { label: '今日订单', value: '89' },
            { label: '商品总数', value: '456' },
            { label: '总销售额', value: '￥89,234' }
        ],
        salesTrend: {
            weekly: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                values: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        }
    }
    res.status(200).json(dashboardData)
})

// 添加商品
app.post('/page3-data', authenticateToken, (req, res) => {
    // 实际目中这里应该是数据库操作
    const newProduct = {
        id: Date.now(), // 模拟生成ID
        ...req.body
    }
    res.status(200).json(newProduct)
})

// 更新商品
app.put('/page3-data/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    // 实际项目中这里应该是数据库操作
    res.status(200).json({ ...req.body, id: parseInt(id) })
})

// 删除商品
app.delete('/page3-data/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    // 实际项目中这里应该是数据库操作
    res.status(200).json({ message: 'success' })
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

