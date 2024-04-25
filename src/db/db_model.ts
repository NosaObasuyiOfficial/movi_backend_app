import {DataTypes, Model} from 'sequelize'
import { db } from './db_connection'


export type LOGIN = {
    id: string,
    email: string
}

class Movi_Login extends Model<LOGIN>{}

Movi_Login.init({
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:db,
    tableName: "Movi_Login",
    modelName: "Movi_Login"
})

export default Movi_Login

