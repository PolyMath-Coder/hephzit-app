import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "libs/entities/user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true, 
        secretOrKey: 'hephzit'
    })
}

    async validate(payload: any) {
        return { _id: payload._id, email: payload.email, firstName: payload.firstName, lastName: payload.lastName }
    }
}