import { comparePasswords, generateJWT, verifyToken } from "../helpers/authHelper.js";
import ServiceResponse from "../models/ServiceReturn.js";
import UserService from "./UserService.js";
import TokenError from "../middlewares/errors/TokenError.js";

export default class AuthService{
    static async login(email, password){
        const user = await UserService.findByEmail(email);
        const isMatch = await comparePasswords(password, user.data.password);

        if (!isMatch) {
            return new ServiceResponse(401, "Usuario ou senha incorretos!");
        }

        const token = await generateJWT(user.data._id, email)
        return new ServiceResponse(200, {token, user: user.data});
    }

    static async verifyToken(token){
        const decode = await verifyToken(token)
        if(decode) {
            const user = await UserService.findByEmail(decode.user);
            return new ServiceResponse(200, user)
        }
        else throw new TokenError("Token invalido ou expirado!")
    }
}