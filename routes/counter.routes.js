import express from 'express'
import counterCtrl from '../controllers/counter.controller.js'


const router = express.Router()

router.route('/').
post(counterCtrl.create)

export default router