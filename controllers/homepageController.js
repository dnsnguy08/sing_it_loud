const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Album, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    
    Album.findAll({
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
        const albums = dbAlbumData.map(album => album.get({ plain: true }));
        res.render('homepage', {
            albums,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  router.get('/album/:id', (req, res) => {
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
  
        // pass data to template
        res.render('singleAlbum', {
            album,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;