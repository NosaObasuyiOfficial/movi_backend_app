import {DataTypes, Model} from 'sequelize'
import { db } from './db_connection'

export type QUERIES = {
    id: string,
    queries:[]
}

class Search_Queries extends Model<QUERIES>{}

Search_Queries.init({
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    queries:{
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true
    },
}, {
    sequelize:db,
    tableName: "Search_Queries",
    modelName: "Search_Queries"
})

export default Search_Queries

























