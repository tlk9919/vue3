const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// 数据库连接配置
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'vue_admin_db'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 测试数据库连接
pool.getConnection()
    .then(connection => {
        console.log('数据库连接成功');
        connection.release();
    })
    .catch(err => {
        console.error('数据库连接失败:', err);
    });

// 认证中间件
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ 
            code: 401,
            message: '未提供token' 
        });
    }

    if (token === 'Bearer dummy-token') {
        next();
    } else {
        res.status(401).json({ 
            code: 401,
            message: 'token无效' 
        });
    }
};

// 登录接口
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('尝试登录:', { username, password });
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
        console.log('查询结果:', rows);
        
        if (rows.length > 0) {
            res.json({
                code: 200,
                message: '登录成功',
                accessToken: 'dummy-token',
                userInfo: {
                    username: rows[0].username,
                    name: rows[0].name
                }
            });
        } else {
            res.status(401).json({
                code: 401,
                message: '用户名或密码错误'
            });
        }
    } catch (error) {
        console.error('登录错误:', error);
        console.error('错误详情:', error.message);
        res.status(500).json({
            code: 500,
            message: '服务器错误'
        });
    }
});

// 获取用户列表
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('获取用户列表错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 添加用户
app.post('/api/users', authenticateToken, async (req, res) => {
    const userData = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO users (username, password, name, age, address, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [userData.username, userData.password, userData.name, userData.age, userData.address, userData.phone]
        );
        res.json({ id: result.insertId, ...userData });
    } catch (error) {
        console.error('添加用户错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 更新用户
app.put('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        await pool.query(
            'UPDATE users SET name = ?, age = ?, address = ?, phone = ? WHERE id = ?',
            [userData.name, userData.age, userData.address, userData.phone, id]
        );
        res.json({ id, ...userData });
    } catch (error) {
        console.error('更新用户错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 删除用户
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: '删除成功' });
    } catch (error) {
        console.error('删除用户错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 获取商品列表
app.get('/api/page3-data', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json({
            recentProducts: rows
        });
    } catch (error) {
        console.error('获取商品列表错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 添加商品
app.post('/api/page3-data', authenticateToken, async (req, res) => {
    const productData = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
            [productData.name, productData.category, productData.price, productData.stock]
        );
        res.json({
            recentProducts: [{ id: result.insertId, ...productData }]
        });
    } catch (error) {
        console.error('添加商品错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 更新商品
app.put('/api/page3-data/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    try {
        await pool.query(
            'UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?',
            [productData.name, productData.category, productData.price, productData.stock, id]
        );
        res.json({
            recentProducts: [{ id, ...productData }]
        });
    } catch (error) {
        console.error('更新商品错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 删除商品
app.delete('/api/page3-data/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({
            recentProducts: [],
            message: '删除成功'
        });
    } catch (error) {
        console.error('删除商品错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 获取统计数据
app.get('/api/page2-data', authenticateToken, async (req, res) => {
    try {
        // 获取用户总数
        const [userRows] = await pool.query('SELECT COUNT(*) as count FROM users');
        const totalUsers = userRows[0].count;

        // 获取商品总数
        const [productRows] = await pool.query('SELECT COUNT(*) as count FROM products');
        const totalProducts = productRows[0].count;

        // 获取库存总量
        const [stockRows] = await pool.query('SELECT SUM(stock) as total FROM products');
        const totalStock = stockRows[0].total || 0;

        // 获取商品总价值
        const [valueRows] = await pool.query('SELECT SUM(price * stock) as total FROM products');
        const totalValue = valueRows[0].total || 0;

        res.json({
            totalUsers,
            activeUsers: Math.floor(totalUsers * 0.8), // 假设80%是活跃用户
            totalOrders: totalProducts,
            pendingOrders: Math.floor(totalProducts * 0.2), // 假设20%是待处理订单
            weeklyStats: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                values: [totalUsers, totalProducts, totalStock, totalValue, totalUsers * 2, totalProducts * 2, totalStock * 2]
            }
        });
    } catch (error) {
        console.error('获取统计数据错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 获取菜单数据
app.get('/api/menu', authenticateToken, (req, res) => {
    const menuData = [
        {
            path: '/InfoPage/Page1',
            name: 'Page1',
            title: '用户管理'
        },
        {
            path: '/InfoPage/Page2',
            name: 'Page2',
            title: '数据统计'
        },
        {
            path: '/InfoPage/Page3',
            name: 'Page3',
            title: '商品管理'
        }
    ];
    res.json(menuData);
});

// 图表数据
app.get('/api/data', authenticateToken, async (req, res) => {
    try {
        // 获取每个类别的商品数量
        const [rows] = await pool.query(`
            SELECT category, COUNT(*) as count 
            FROM products 
            GROUP BY category
        `);

        const xAxisData = rows.map(row => row.category);
        const seriesData = rows.map(row => row.count);

        res.json({
            title: '商品类别统计',
            xAxisData,
            seriesData
        });
    } catch (error) {
        console.error('获取图表数据错误:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

const port = 5050;
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});

