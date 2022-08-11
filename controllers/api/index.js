const router = require('express').Router();

const userRoutes = require('./userController');
const albumRoutes = require('./albumController');
const commentRoutes = require('./commentController');

router.use('/users', userRoutes);
router.use('/albums', albumRoutes);
router.use('/comments', commentRoutes);

module.exports = router;