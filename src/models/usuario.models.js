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
        this.salt = 'ABC';
        this.setDataValue('senha', val);
        this.setDataValue('senha_hash', this.criptografarSenha(val));
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
    tableName: 'usuarios',
    freezeTable: true,
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    schema: 'public'
  });

  Usuario.prototype.criptografarSenha = function (senha) {
    const salt = `ARROZ-${this.salt}-${senha}`;
    return salt;
  };

  return Usuario;
};