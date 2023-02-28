const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //unique: true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,

    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "01-01-23"

    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isDB: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: "true",
    },
    background_image: {
      type: DataTypes.STRING,
      defaultValue: "https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg",
    },


  },
  {timestamps: false},);
  
};


