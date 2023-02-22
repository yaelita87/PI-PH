const { DataTypes } = require ('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('genre',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {timestamps: false})
}