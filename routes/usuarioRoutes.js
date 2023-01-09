import express from 'express'
const router = express.Router();

import { registrar,autenticar,confirmar,olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

//Autenticación, registro y Confirmación de usuarios

router.post('/', registrar); //Crea un nuevo usuario
router.post('/login', autenticar); //logea a un usuario
router.get('/confirmar/:token', confirmar); //Confirmación de la cuenta
router.post('/olvide-password', olvidePassword); // Resetear el password
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)


router.get('/perfil', checkAuth, perfil);


export default router