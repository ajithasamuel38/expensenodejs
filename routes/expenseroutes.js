const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

 router.post('/expense/expensetable', expenseController.postexpense);

 router.get('/expense/expensetable', expenseController.getexpense);

 router.delete('/expense/expensetable/:id', expenseController.deleteexpense)

 module.exports = router;