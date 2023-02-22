const express = require('express');
const uuid = require('uuid');

const router = express.Router();

const db = require('../dbConfig');

/**
 * GET /users/
 */
router.get('/', async (req, res) => {


    // db.from('users').select('*')
});

/**
 * POST /users/
 */
router.post('/', async (req, res) => {

    let { name, email, password } = req.body;

    let id = uuid.v4().toString();

    let userObj = {
        name,
        email,
        password,
        id
    }

    try {

        await db('users').insert([userObj]);

        res.json({
            success: true
        })

    } catch(err) {

        console.error(err);

        res.json({
            success: false,
            error: err
        })
    }
})

module.exports = router;