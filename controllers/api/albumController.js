const router = require('express').Router();
const { Album, User, Comment } = require('../../models');
// const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Album.findAll({
        attributes: [
            'id',
            'title',
            'artist',
            'genre',
            'created_at',
            'album_content'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'album_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        },
      ]
    })
      .then(dbAlbumData => res.json(dbAlbumData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Album.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'artist',
        'genre',
        'created_at',
        'album_content'
      ],
      include: [
        // include the Comment model here:
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'album_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbAlbumData => {
        if (!dbAlbumData) {
          res.status(404).json({ message: 'No album found with this id' });
          return;
        }
        res.json(dbAlbumData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Album.create({
      title: req.body.title,
      artist: req.body.artist,
      genre: req.body.genre,
      album_content: req.body.album_content,
      user_id: req.session.user_id
    })
      .then(dbAlbumData => res.json(dbAlbumData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Album.update({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album_content: req.body.album_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbAlbumData => {
        if (!dbAlbumData) {
          res.status(404).json({ message: 'No album found with this id' });
          return;
        }
        res.json(dbAlbumData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Album.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbAlbumData => {
        if (!dbAlbumData) {
          res.status(404).json({ message: 'No album found with this id' });
          return;
        }
        res.json(dbAlbumData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;