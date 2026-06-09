import express from 'express'
const interviewRouter=express.Router()
import AuthMiddleware from '../middleware/authMiddleware.js'
import { generateInterViewReportController } from '../controllers/interviewController.js'
import upload from '../middleware/fileMiddleware.js'

const interViewRoute=express.Router()
/**
 * @route POST /api/interview
 * @description generate new interview report  on the basis of user self description,resume pdf & job description
 * @access private
 */ 


interviewRouter.post('/generate-report',AuthMiddleware,upload.single("resume"),generateInterViewReportController)
export default interviewRouter
 