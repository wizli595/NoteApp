import { RequestHandler } from "express";
import prisma from "../../prisma/middleware/prismaMiddleware";
import { OperationalError } from "../utils/errors/operationalError";

export const validateSession : RequestHandler = async (req, res, next) => {
    const token = req.session?.jwt as string;
    console.log("token",token)
    if (!token) {
        throw new OperationalError("Unauthorized", 401);
    }

    try{
        
        // find the session in the database to check if it is still valid
        const valideSession = await prisma.session.findFirst({ where: { token:token } });
        console.log("valideSession",valideSession)
        if (!valideSession) {
            console.log("fff",valideSession)
            localStorage.removeItem("persist:root");
            req.session = null;
            throw new OperationalError("Unauthorized", 401);
        }
        next();    
    }catch(error){
        return res.status(401).send("Unauthorized,token faild");
    }

}