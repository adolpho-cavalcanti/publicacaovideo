const Model = require('./Model');

module.exports = class Video extends Model {

    constructor(data) {
        super(data);
        this.titulo = data.titulo;
        this.path = data.path;
        this._id = data._id;
        this.collection = 'videos';
    }

    static find(query = {}, limit = 1000) {
        return super.find(query, {titulo: 1}, limit, 'videos').then((result) => {
            return result.map((a) => new Video(a))
        });
    }
};