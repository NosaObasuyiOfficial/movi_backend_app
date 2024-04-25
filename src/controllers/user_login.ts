import { Request, Response } from "express";
import { email } from "../utils/input_validation";
import Movi_Login from "../db/db_model";
import Search_Queries from "../db/serach_queries";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { APP_SECRET } = process.env;

export const user_login = async (req: Request, res: Response) => {
  try {
    /*-----------Validating Input ------------*/

    let valid_input_email = email.validate(req.body.email);
    if (valid_input_email.error) {
      const error_message = valid_input_email.error.details[0].message;
      return res.status(400).json({ message: `email - ${error_message}` });
    }
    const valid_email = valid_input_email.value;

    const checking_user_existence = await Movi_Login.findOne({
      where: {
        email: valid_email,
      },
    });

    if (!checking_user_existence) {
      const new_user = await Movi_Login.create({
        id: v4(),
        email: valid_email,
      });

      const new_login_user = await Movi_Login.findOne({
        where: {
          email: valid_email,
        },
      });

      if(new_login_user){

        const new_user_id = new_login_user?.dataValues.id;
  
        await Search_Queries.create({
          id: new_user_id,
          queries: []
        });


      const movi_user_token = jwt.sign({ id: new_user_id }, APP_SECRET!);

      return res.status(200).json({
        user_token: movi_user_token,
        login_proceed: "true",
      });

    }else{
      return res.status(400).json({
        message: "Sorry! You cant login"
      })
    }
    } else {
      const new_login_user = await Movi_Login.findOne({
        where: {
          email: valid_email,
        },
      });

      const new_user_id = new_login_user?.dataValues.id;

      const movi_user_token = jwt.sign({ id: new_user_id }, APP_SECRET!);

      return res.status(200).json({
        user_token: movi_user_token,
        login_proceed: "true",
      });
    }
  } catch (error) {
    console.error("Error accessing your account", error);
    return res.status(500).json({
      error: "Internal server error - Can't access account at the moment.",
    });
  }
};
