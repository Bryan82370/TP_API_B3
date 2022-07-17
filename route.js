const express = require('express');
const ActorController = require('./controllers/ActorController');
const FilmsController = require('./controllers/FilmsController');
const GenresController = require('./controllers/GenresController');

const router = express.Router();

const requireJsonContent = () => {
    return (req, res, next) => {
      if (req.headers['content-type'] !== 'application/json') {
          res.status(400).send('Server requires application/json')
      } else {
        next()
      }
    }
  }

router.get('/actor', ActorController.list);
router.get('/actor/:id', ActorController.get);
router.post('/actor', requireJsonContent(), ActorController.create);
router.put('/actor/:id', requireJsonContent(), ActorController.update);
router.delete('/actor/:id', ActorController.delete);

router.get('/films', FilmsController.list);
router.get('/films/:id', FilmsController.get);
router.post('/films', requireJsonContent(), FilmsController.create);
router.put('/films/:id', requireJsonContent(), FilmsController.update);
router.delete('/films/:id', FilmsController.delete);

router.get('/genres', GenresController.list);
router.post('/genres', requireJsonContent(), GenresController.create);
router.delete('/genres/:id', GenresController.delete);


module.exports = router;
