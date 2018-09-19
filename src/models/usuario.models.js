'use strict';

const bcrypt = require('bcryptjs');

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
      allowNull: false,
      validate: {
        isUnique: function (value, next) {
          Usuario.findOne({ where: { email: value }, attributes: ['id'] }).then(function (user) {
            if (user) { return next('Email já cadastrado'); }
            next();
          });
        }
      }
    },
    senha: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        this.salt = bcrypt.genSaltSync(12);
        this.setDataValue('senha', val);
        this.setDataValue('senha_hash', this.criptografarSenha(val));
      }
    },
    senha_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.VIRTUAL,
      allowNull: false
    },
    acesso: {
      type: DataTypes.ENUM,
      values: ['admin', 'cliente'],
      allowNull: false,
      defaultValue: 'cliente'
    }
  }, {
    tableName: 'usuarios',
    freezeTable: true,
    createdAt: 'data_cadastro',
    updatedAt: 'data_atualizacao',
    schema: 'public'
  });

  Usuario.prototype.checarSenha = function (senha) {
    //return this.criptografarSenha(senha) === this.senha_hash;
    return bcrypt.compareSync(senha, this.senha_hash);
  };

  Usuario.prototype.criptografarSenha = function (senha) {
    return bcrypt.hashSync(senha, this.salt);
  };

  return Usuario;
};