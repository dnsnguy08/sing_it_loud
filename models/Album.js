const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Album model
class Album extends Model {}

// create fields/columns for Album model
Album.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      album_content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: true
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'album'
    }
  );

  module.exports = Album;