import { sequelize } from '../config/db.js';  
import { DataTypes } from 'sequelize';    

const Audio = sequelize.define('Audio', {
    fileName: {
        type: DataTypes.STRING,  
        allowNull: false,
        unique: true
    },
    contentBase64: {
        type: DataTypes.STRING, 
        allowNull: true
    }
});

export { Audio };