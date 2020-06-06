import { Injectable } from '@nestjs/common';

interface HomeParams {
  title: string;
  message: string;
}

@Injectable()
export class AppService {
  public get params(): HomeParams {
    const params: HomeParams = {
      title: "TOP",
      message: "hello, world!"
    };
    return params;
  }
}
