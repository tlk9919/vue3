const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// 开启 json 支持
app.use(express.json());

const users = {
    'user1': {
        password: 'password',
        tokens: []
    }
};

// 验证 token 的中间件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 获取 token
    if (token == null) {
        return res.sendStatus(401); // 如果没有 token，返回 401
    } else {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403); // 如果 token 无效，返回 403
            }
            req.user = user;
            next(); // 验证成功，继续执行后续的请求
        });
    }
};

// 获取数据的接口，只有验证过 token 的请求可以访问
app.get('/data', authenticateToken, (req, res) => {
    const chartData = {
        xAxisData: ['羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        seriesData: [10, 5, 36, 20, 50],
        title: '商品销售详情'
    };
    res.status(200).json(chartData);
});

// 登录接口
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password); // 打印用户名和密码

    const user = users[username]; // 获取对应的用户
    if (user && user.password === password) {
        // 登录成功，生成 access token
        const accessToken = jwt.sign({ username }, 'secret_key', { expiresIn: '30s' });

        user.tokens.push(accessToken); // 将生成的 token 保存到用户的 tokens 数组中

        // 登录成功，返回 accessToken 和 username
        console.log('Login Success:', { accessToken, username }); // 打印响应数据
        res.status(200).json({
            accessToken,
            username // 返回用户名
        });
    } else {
        // 如果用户名或密码不正确，返回 401
        console.log('Invalid Credentials');
        res.status(401).json({
            message: 'Invalid Credentials'
        });
    }
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
