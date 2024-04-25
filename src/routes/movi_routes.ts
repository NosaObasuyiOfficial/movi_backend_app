import express from 'express'
import { user_login } from "../controllers/user_login"
import { search_movies } from "../controllers/search_movies"
import { get_user_queries } from "../controllers/get_queries"

const router = express.Router()

router.post('/login', user_login)
router.post('/search', search_movies)
router.get('/queries', get_user_queries)

export default router


