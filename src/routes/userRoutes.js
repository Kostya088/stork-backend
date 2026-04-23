import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { updateCurrentUserSchema } from '../validations/userValidation.js';

const router = Router();

router.use('/users', authenticate);

router.get('/users/me', getCurrentUser);
router.patch(
  '/users/me',
  celebrate(updateCurrentUserSchema),
  updateCurrentUser,
);
router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);

export default router;
