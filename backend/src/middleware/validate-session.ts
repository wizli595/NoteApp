import { RequestHandler } from "express";
import prisma from "../../prisma/middleware/prismaMiddleware";
import { OperationalError } from "../utils/errors/operationalError";
import jwt from 'jsonwebtoken';  
import env from "../utils/validateEnv";
export const validateSession : RequestHandler = async (req, res, next) => {
    const token = req.session?.jwt as string;
    console.log("token",token)
    if (!token) {
        return next(new OperationalError("Unauthorized", 401));     
    }

    try{
        const decoded = jwt.verify(token, env.JWT_KEY) as {
            id: string;
            email: string;
        };
        
        // find the session in the database to check if it is still valid
        const valideSession = await prisma.session.findFirst({ where: {userId:decoded.id,token:token } });
        if (!valideSession) {
            console.log("valideSession",valideSession);
            req.session = null;
            console.log("req.session",req.session);
            // return res.status(401).send("Unauthorized");  
            return next(new OperationalError("Unauthorized", 401));      
        }
        next();    
    }catch(error){
        // return res.status(401).send("Unauthorized,token faild");
        return next(new OperationalError("Unauthorized", 401));
    }

}