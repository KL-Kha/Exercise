const router = require('express').Router();

router.get('/test', (req, res, next) => {
    res.status(200).json('Oke');
});

module.exports = router;
