const express = require('express');
const router = express.Router();

const fileupload = require('../config/file').upload;

const VideosController = require('../controllers/VideoController');
const controller = new VideosController();

router.get('/', (req, res, next) => controller.index(req, res, next));
router.get('/create', (req, res, next) => controller.create(req, res, next));
router.post('/', fileupload.single('video'), (req, res, next) => controller.store(req, res, next));


module.exports = router;