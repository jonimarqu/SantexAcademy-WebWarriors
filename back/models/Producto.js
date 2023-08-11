const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db-config');

const Producto = sequelize.define(
  'Producto',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    costoEnHoras: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    catalogoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'catalogo',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Producto',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }, { name: 'catalogoId' }],
      },
      {
        name: 'fk_Producto_catalogo1_idx',
        using: 'BTREE',
        fields: [{ name: 'catalogoId' }],
      },
    ],
  },
);

// Se exporta el modelo SIN DESESTRUCTURAR
module.exports = Producto;
