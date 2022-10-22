import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"
import { Apperror } from "@shared/erros/Apperror";
import auth from "@config/auth";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response:Response, next: NextFunction){
    const authHeader= request.headers.authorization;

    if(!authHeader){throw new Apperror("token missing",401);}

    const [, token]=authHeader.split(" ");

    try{
        const { sub: user_id }= verify(token, auth.secret_token) as IPayload;

        request.user = {
            id: user_id
        };

        next()
    }catch{
        throw new Apperror("invalid token",401);
    }

}