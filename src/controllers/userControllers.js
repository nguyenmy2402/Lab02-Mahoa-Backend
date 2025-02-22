const {
    createUserService,
    loginUserService,
} = require('../services/userServices');
const createUser = async (req, res) => {
    try {
        const { name, password, privateKey } = req.body;
        if (!name || !password) {
            throw new Error('Invalid input');
        }
        const data = await createUserService(name, password, privateKey);
        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const handleLogin = async (req, res) => {
//     try {
//         const { name, password } = req.body;
//         const data = await loginUserService(name, password);
//         return res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const handleLogin = async (req, res) => {
    try {
        console.log('Login Request Data:', req.body); // Xác minh dữ liệu nhận được
        const { name, password } = req.body;

        const data = await loginUserService(name, password);
        console.log('Login Service Response:', data); // Log phản hồi từ service

        res.status(200).json({
            EC: 0,
            EM: 'Login successful',
            data,
        });
    } catch (error) {
        console.error('Handle Login Error:', error.message); // Log lỗi chi tiết
        res.status(400).json({
            EC: -1,
            EM: error.message,
        });
    }
};

module.exports = {
    createUser,
    handleLogin,
};
