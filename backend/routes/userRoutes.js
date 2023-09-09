import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { 
    authUser,
    registerUser,
    logoutUser,
    getuserprofile,
    updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/userprofile')
    .get(protect, getuserprofile)
    .put(protect, updateUser);

export default router;