const express = require('express');
const router = express.Router();
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  updateProfiles
} = require('../controllers/accountController');

const verifyToken = require('../middleware/authMiddleware');

// Todas las rutas protegidas con JWT
router.use(verifyToken);

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);
router.put('/:id/profiles', updateProfiles)

module.exports = router;
