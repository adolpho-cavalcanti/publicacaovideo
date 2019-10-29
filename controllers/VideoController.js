let Controller = require('./Controller');
var Video = require('../models/Video');

module.exports = class VideosController extends Controller {

    index(req, res, next) {

        let params = req.query;
        let filter = {};
        if (typeof params.query != 'undefined') {
            filter =
                {
                    $or: [
                        {titulo: new RegExp(params.query, "i")},
                    ]
                }
        }
        Video.find(filter).then((videos) => {
            res.render('videos/index', {title: 'Todos os videos', videos, params});
        });
    }

    create(req, res, next) {
        this.checkAuth(req, res, next);
        res.render('videos/create', {title: 'Novo video'});
    }

    store(req, res, next) {
        this.checkAuth(req, res, next);

        let body = req.body;

        let titulo = body.titulo;
        let file = req.file;
        let path = "";

        let errors = [];
        if (file == undefined) {
            errors['video'] = 'Obrigatório o envio do arquivo'
        } else {
            path = req.file.filename;
        }

        if (titulo == null || titulo.length < 3) {
            errors['titulo'] = 'Título inválido'
        }

        if (file && file.mimetype != 'video/mp4') {
            errors['video'] = 'Arquivo inválido'
        }

        if (Object.keys(errors).length > 0) {
            res.render('videos/create', {title: 'Novo video', errors})
        } else {
            console.log("Entrou")
            new Video({titulo, path})
                .save()
                .then((video) => {
                    console.log(video)
                    if (video) {
                        res.redirect('/videos');
                    }
                });
        }
    }


};