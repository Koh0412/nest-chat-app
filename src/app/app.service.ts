import { Injectable } from '@nestjs/common';

interface HomeParams {
  title: string;
  message: string;
}

@Injectable()
export class AppService {
  get params(): HomeParams {
    const params: HomeParams = {
      title: "TOP",
      message: "hello, world!"
    };
    return params;
  }

  getHello(): string {
    return "hello!";
  }
}
