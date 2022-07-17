const db = require('../database');
const FilmsRepository = require('../repository/FilmsRepository');

exports.list = (req, res) => {
    const repo = new FilmsRepository(db);
    repo.list()
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.get = (req, res) => {
    const repo = new FilmsRepository(db);
    repo.get(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.create = (req, res) => {
    const errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new FilmsRepository(db);

    repo.create({
        name: req.body.name,
        synopsis: req.body.synopsis,
        release_year: req.body.release_year,
        genre_id: req.body.genre_id,


    })
        .then((result) => {
            res
                .status(201)
                .json({
                    success: true,
                    id: result,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.update = (req, res) => {
    const errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new FilmsRepository(db);

    repo.update(
        req.params.id,
        {
            name: req.body.name,
            synopsis: req.body.synopsis,
            release_year: req.body.release_year,
            genre_id: req.body.genre_id,
        },
    )
        .then(() => {
            repo.get(req.params.id)
                .then((result) => {
                    res.json({
                        success: true,
                        data: result,
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.delete = (req, res) => {
    const repo = new FilmsRepository(db);

    repo.delete(req.params.id)
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
