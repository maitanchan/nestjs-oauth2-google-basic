import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(configService: ConfigService) {

        super({
            clientID: configService.get('CLIENT_ID'),
            clientSecret: configService.get('CLIENT_SECRET'),
            callbackURL: configService.get('CALL_BACK_URL'),
            scope: ['email', 'profile'],
        })

    }


    async validate(access_token: string, refresh_token: string, profile: any, done: VerifyCallback): Promise<any> {

        const { name, emails, photos } = profile

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.family,
            picture: photos[0].value,
            access_token
        }

        done(null, user)

    }

}