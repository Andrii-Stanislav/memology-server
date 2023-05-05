import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { ConfigService } from '../config/config.service';

@Injectable()
export class SocketAuthPipe implements PipeTransform<any, Promise<any>> {
  constructor(private jwtService: JwtService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      console.log('SocketAuthPipe: ');
      console.log('value: ', value);
      console.log('metadata: ', metadata);

      return {};
      // const payload: any = jwt.verify(value.authorization, this.config.jwtSecret)
      // delete value.authorization
      // const user = await this.userService.getById(payload.id)
      // return {
      //   data: value,
      //   user: user
      // }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
