import express from 'express'
const interviewRouter=express.Router()
import AuthMiddleware from '../middleware/authMiddleware.js'
import { generateInterViewReportController,getInterviewReportByIdController,getAllInterviewReportsController } from '../controllers/interviewController.js'
import upload from '../middleware/fileMiddleware.js'

const interViewRoute=express.Router()
/**
 * @route POST /api/interview
 * @description generate new interview report  on the basis of user self description,resume pdf & job description
 * @access private
 */ 


interviewRouter.post('/',AuthMiddleware,upload.single("resume"),generateInterViewReportController)
/**
 * @route GET /api/interview/report/:InterviewId
 * @description generate new interview report  on the basis of user self description,resume pdf & job description
 * @access private
 */
interviewRouter.get('/report/:InterviewId',AuthMiddleware,getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description controller to get all interview reports of logged in user
 * @access private
 */
interviewRouter.get('/',AuthMiddleware,getAllInterviewReportsController)
export default interviewRouter
 