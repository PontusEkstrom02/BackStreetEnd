const router = require("express").Router();

router.post('/login', (req, res) => {
    res.send("Auth route working")
})

module.exports = router