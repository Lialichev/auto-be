const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Data isn`t valid',
            })
        }

        const { email, password } = req.body;

        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'User is registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'User saved' });

    } catch (e) {
        res.status(500).json({ message: 'Error sign up' });
    }
};

exports.signIn = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Data isn`t valid',
            })
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User isn`t defined' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Error auth' })
        }

        const token = jwt.sign({ user_id: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

        res.json({
            token,
            user_id: user.id
        });

    } catch (e) {
        res.status(500).json({ message: 'Error auth' })
    }
};

exports.signInToken = async (req, res) => {
    try {

        const user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(401).json({ message: 'User isn`t defined' });
        }

        res.json({ user_id: user.id });

    } catch (e) {
        res.status(500).json({ message: 'Error auth' })
    }
};
