'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        this.setDataValue('senha', val);
        this.setDataValue('senha_hash', val);
      }
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(4096),
      allowNull: false
    }
  }, {
    tableName: 'usuario',
    freezeTable: true,
    createdAt: 'data_cadastro',
    updateAt: 'data_atualizacao',
    schema: 'public'
  });

  return Usuario;
};