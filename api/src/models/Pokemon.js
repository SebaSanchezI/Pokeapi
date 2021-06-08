const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    // iddb:{
    //   primaryKey:true
    //     allowNull: false,
    //     autoIncrement: false,
    //     
    //     type: DataTypes.STRING,
    //   }
    // },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{msg:'El nombre debe ser unico.'}
    },
    image:{
      type: DataTypes.STRING,
    },
    height:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.INTEGER
    },
    hp:{
      type: DataTypes.INTEGER
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    }
  });

  sequelize.define('type',{
    name:{
      type:DataTypes.STRING,
    }
  })

};
