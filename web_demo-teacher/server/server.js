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

