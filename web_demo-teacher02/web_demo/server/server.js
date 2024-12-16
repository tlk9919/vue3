const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express()

// 中间件
app.use(express.json());
app.use(cors());

// 认证中间件
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

// 统一的模拟数据源
const db = {
    // 认证数据
    auth: {
        '1': {
            password: '1',
            tokens: []
        }
    },
    // 用户数据 - 添加更多用户信息
    users: [
        { id: 1, name: '张三', age: 25, address: '北京市朝阳区', phone: '13800138000', lastLogin: '2024-03-20', status: 'active' },
        { id: 2, name: '李四', age: 30, address: '上海市浦东新区', phone: '13900139000', lastLogin: '2024-03-19', status: 'active' },
        { id: 3, name: '王五', age: 28, address: '广州市天河区', phone: '13700137000', lastLogin: '2024-03-15', status: 'inactive' }
    ],
    // 商品数据 - 添加更多商品信息
    products: [
        { 
            id: 1, 
            name: 'iPhone 13', 
            category: '电子产品', 
            price: 6999, 
            stock: 100,
            sales: 50,
            rating: 4.8,
            supplier: '供应商A',
            createTime: '2024-01-01'
        },
        { 
            id: 2, 
            name: '休闲裤', 
            category: '服装', 
            price: 199, 
            stock: 500,
            sales: 200,
            rating: 4.5,
            supplier: '供应商B',
            createTime: '2024-02-01'
        },
        { 
            id: 3, 
            name: '零食大礼包', 
            category: '食品', 
            price: 99, 
            stock: 1000,
            sales: 800,
            rating: 4.7,
            supplier: '供应商C',
            createTime: '2024-03-01'
        }
    ],
    // 订单数据
    orders: [
        {
            id: 1,
            userId: 1,
            products: [
                { productId: 1, quantity: 1, price: 6999 },
                { productId: 2, quantity: 2, price: 199 }
            ],
            totalAmount: 7397,
            status: 'completed',
            createTime: '2024-03-19'
        },
        {
            id: 2,
            userId: 2,
            products: [
                { productId: 3, quantity: 5, price: 99 }
            ],
            totalAmount: 495,
            status: 'pending',
            createTime: '2024-03-20'
        }
    ],
    // 其他配置数据
    categories: ['电子产品', '服装', '食品', '图书', '其他'],
    suppliers: ['供应商A', '供应商B', '供应商C'],
    menu: [{
        name: 'InfoPage',
        path: '/InfoPage',
        children: [
            { name: 'Page1', path: '/InfoPage/Page1', title: '用户管理' },
            { name: "Page2", path: '/InfoPage/Page2', title: '数据统计' },
            { name: "Page3", path: '/InfoPage/Page3', title: '商品管理' }
        ]
    }]
}

// 登录路由
app.post('/api/login', (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    const user = db.auth[username]
    if (user && user.password === password) {
        const accessToken = jwt.sign({username}, 'secret_key', {expiresIn: '1h'})
        user.tokens.push(accessToken)
        res.status(200).json({accessToken})
    } else {
        res.status(401).json({
            message: 'Invalid Credentials'
        })
    }
})

// 菜单路由
app.get('/api/menu', authenticateToken, (req, res) => {
    res.status(200).json(db.menu)
})

// 用户 CRUD
app.get('/api/users', authenticateToken, (req, res) => {
    res.status(200).json(db.users)
})

app.post('/api/users', authenticateToken, (req, res) => {
    console.log('收到添加用户请求:', req.body)
    const newUser = {
        id: Date.now(),
        ...req.body
    }
    db.users.push(newUser)
    res.status(200).json(newUser)
})

app.put('/api/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const index = db.users.findIndex(user => user.id === parseInt(id))
    db.users[index] = { ...req.body, id: parseInt(id) }
    res.status(200).json(db.users[index])
})

app.delete('/api/users/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const index = db.users.findIndex(user => user.id === parseInt(id))
    db.users.splice(index, 1)
    res.status(200).json({ message: 'success' })
})

// Page2 数据路由 - 修改为真实数据统计
app.get('/api/page2-data', authenticateToken, (req, res) => {
    // 计算实际统计数据
    const totalUsers = db.users.length
    const activeUsers = db.users.filter(user => user.status === 'active').length
    const totalOrders = db.orders.length
    const pendingOrders = db.orders.filter(order => order.status === 'pending').length
    
    // 计算每日销售数据（最近7天）
    const today = new Date()
    const last7Days = Array.from({length: 7}, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
    }).reverse()

    // 模拟每日销售数据
    const dailySales = last7Days.map(date => {
        const sales = db.orders
            .filter(order => order.createTime.startsWith(date))
            .reduce((sum, order) => sum + order.totalAmount, 0)
        return sales || Math.floor(Math.random() * 1000) // 如果没有数据则随机生成
    })

    const statisticsData = {
        totalUsers,
        activeUsers,
        totalOrders,
        pendingOrders,
        weeklyStats: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            values: dailySales
        }
    }
    res.status(200).json(statisticsData)
})

// Page3 商品相关路由 - 返回更多商品信息
app.get('/api/page3-data', authenticateToken, (req, res) => {
    // 计算每个商品的销售情况
    const productsWithStats = db.products.map(product => {
        const productOrders = db.orders.filter(order => 
            order.products.some(p => p.productId === product.id)
        )
        const totalSales = productOrders.length
        const totalRevenue = productOrders.reduce((sum, order) => {
            const productInOrder = order.products.find(p => p.productId === product.id)
            return sum + (productInOrder ? productInOrder.price * productInOrder.quantity : 0)
        }, 0)

        return {
            ...product,
            totalSales,
            totalRevenue
        }
    })

    res.status(200).json({
        categories: db.categories,
        suppliers: db.suppliers,
        recentProducts: productsWithStats
    })
})

app.post('/api/page3-data', authenticateToken, (req, res) => {
    const newProduct = {
        id: Date.now(),
        ...req.body
    }
    db.products.push(newProduct)
    res.status(200).json(newProduct)
})

app.put('/api/page3-data/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const index = db.products.findIndex(product => product.id === parseInt(id))
    db.products[index] = { ...req.body, id: parseInt(id) }
    res.status(200).json(db.products[index])
})

app.delete('/api/page3-data/:id', authenticateToken, (req, res) => {
    const { id } = req.params
    const index = db.products.findIndex(product => product.id === parseInt(id))
    db.products.splice(index, 1)
    res.status(200).json({ message: 'success' })
})

// 图表数据路由 - 使用真实数据
app.get('/api/data', authenticateToken, (req, res) => {
    // 获取销量前5的商品
    const topProducts = [...db.products]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)

    const chartData = {
        xAxisData: topProducts.map(p => p.name),
        seriesData: topProducts.map(p => p.sales),
        title: '热销商品TOP5'
    }
    res.status(200).json(chartData)
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

