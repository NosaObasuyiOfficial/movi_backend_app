import { Request, Response } from "express";
import { movie } from "../utils/input_validation";
import jwt from "jsonwebtoken";
import Movi_Login from "../db/db_model";
import Search_Queries from "../db/serach_queries"

import dotenv from "dotenv";

dotenv.config();
const { APP_SECRET } = process.env;

export const search_movies = async(req:Request, res:Response) => {

    try {
        /*-----------Validating Input ------------*/
    
        let valid_input_movie = movie.validate(req.body.movie);
        if (valid_input_movie.error) {
          const error_message = valid_input_movie.error.details[0].message;
          return res.status(400).json({ message: `movie - ${error_message}` });
        }
        const valid_movie:any = valid_input_movie.value;

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

                  const get_queries:any = get_search.dataValues.queries

                  if( get_queries.length >= 1 && get_queries.length < 5){
                    get_queries.unshift(valid_movie)
                  }
                  else if(get_queries.length === 5){
                    get_queries.pop()
                    get_queries.unshift(valid_movie)
                  }else{
                    get_queries.push(valid_movie)
                  }

                  await Search_Queries.update(
                    { queries: get_queries },
                    {
                      where: {
                        id: user_id,
                      },
                    }
                  );


                  return res.status(200).json({
                    message: "Queries has been updated."
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














