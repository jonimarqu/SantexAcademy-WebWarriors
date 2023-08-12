const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db-config');

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'email_UNIQUE',
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recompensasAcumuladas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rolesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    cestaRecompensasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cestaRecompensas',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
          { name: 'rolesId' },
          { name: 'cestaRecompensasId' },
        ],
      },
      {
        name: 'email_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email' },
        ],
      },
      {
        name: 'fk_usuario_roles1_idx',
        using: 'BTREE',
        fields: [
          { name: 'rolesId' },
        ],
      },
      {
        name: 'fk_usuario_cestaRecompensas1_idx',
        using: 'BTREE',
        fields: [
          { name: 'cestaRecompensasId' },
        ],
      },
    ],
  },
);

module.exports = Usuario;