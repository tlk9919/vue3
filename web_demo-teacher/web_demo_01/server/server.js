const express = require('express');
const jwt = require('jsonwebtoken');

const app = express()

//开启json支持
app.use(express.json());

const users = {
    'user1': {
        password: 'password',
        tokens: []
    }
}

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
            {expiresIn: '30s'})
        user.tokens.push(accessToken)
        res.status(200).json({accessToken})
    } else {
        res.status(401).json({
            message: 'Invalid Credentials'
        })
    }
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

