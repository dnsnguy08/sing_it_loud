const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Album, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Album.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
        }
      ]
    })
      .then(dbAlbumData => {
        // serialize data before passing to template
        const albums = dbAlbumData.map(album => album.get({ plain: true }));
        res.render('dashboard', { albums, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
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
        }
      ]
    })
      .then(dbAlbumData => {
        if (!dbAlbumData) {
          res.status(404).json({ message: 'No album found with this id' });
          return;
        }
  
        // serialize the data
        const album = dbAlbumData.get({ plain: true });

        res.render('editAlbum', {
            album,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    Album.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
        }
      ]
    })
      .then(dbAlbumData => {
        // serialize data before passing to template
        const albums = dbAlbumData.map(album => album.get({ plain: true }));
        res.render('createAlbum', { albums, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;