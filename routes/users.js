const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const router = express.Router();

const db = require('../dbConfig');

/**
 * GET /users/
 */
router.get('/', async (req, res) => {


    try {

        let rows = await db.from('users').select('*');

        rows = rows.map(row => _.omit(row, 'password'));

        res.json({
            success: true,
            data: rows
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err
        })
    }
});

/**
 * POST /users/
 */
router.post('/', async (req, res) => {

    let { name, email, password } = req.body;

    let id = uuid.v4().toString();

    let hashedPassword = bcrypt.hashSync(password);

    let userObj = {
        password: hashedPassword,
        name,
        email,
        id
    }

    try {

        await db('users').insert([userObj]);

        res.status(201).json({
            success: true
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err
        })
    }
})

/**
 * GET /users/:userId
 */
router.get('/:userId', async (req, res) => {

    let { userId } = req.params;

    try {

        let row = await db('users').where('id', userId).first();

        res.json({
            success: true,
            data: _.omit(row, 'password')
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err
        })
    }
})

/**
 * DELETE /users/:userId
 */
router.delete('/:userId', async (req, res) => {

    let { userId } = req.params;

    try {

        let rows = await db('users').where('id', userId);

        if (rows.length === 0) {

            return res.status(404).json({
                success: false
            });
        }

        await db('users').where('id', userId).delete();

        res.json({
            success: true
        })

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err
        })
    }
})

/**
 * POST /users/login
 */
router.post('/login', async (req, res) => {

    let { email, password } = req.body;

    let row = await db('users').where('email', email).first();

    if (!row) {

        console.debug('User not found.')

        return res.status(401).json({
            success: false
        });
    }

    let match = bcrypt.compareSync(password, row.password);

    if (!match) {

        console.debug('Passwords did not match.')

        return res.status(401).json({
            success: false
        });
    }

    let token = jwt.sign({
        sub: row.id,
        email: row.email,
        name: row.name
    }, process.env.JWT_SECRET);

    res.json({
        success: true,
        token
    })
})

module.exports = router;