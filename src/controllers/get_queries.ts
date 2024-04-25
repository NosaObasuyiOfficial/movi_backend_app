import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Movi_Login from "../db/db_model";
import Search_Queries from "../db/serach_queries"

import dotenv from "dotenv";

dotenv.config();
const { APP_SECRET } = process.env;

export const get_user_queries = async(req:Request, res:Response) => {

    try {

        const token: any = req.headers.authorization;

        if(token){

            const token_info = token.split(" ")[1];
            const decodedToken: any = jwt.verify(token_info, APP_SECRET!);
      
            const user_id = decodedToken.id;

            const getting_customer_data = await Movi_Login.findOne({
                where: {
                  id: user_id,
                },
              });

              if(getting_customer_data){


                
                const get_search = await Search_Queries.findOne({
                  where: {
                    id: user_id,
                  },
                });

                if(get_search){

                  const get_queries:any = get_search.dataValues.queries;

                  return res.status(200).json({
                    message: "Queries has been updated.",
                    queries: get_queries
                  })

                }else{
                  return res.status(400).json({
                    mesage: "Couldn't get queries"
                  })
                }

              }else{
                return res.status(404).json({
                    message: `You are not a registered user.`,
                  });
              }
        } else {
            res.status(500).json({
              message: "Set Token in the local storage",
            });
          }
    
      } catch (error) {
        console.error("Error searching for movies", error);
        return res.status(500).json({
          error: "Internal server error - Can't search for movies at the moment.",
        });
      }

}














