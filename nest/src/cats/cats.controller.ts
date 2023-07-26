import { Controller, Get, Ip, Query, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request, @Query() name: string): { name: string[] } {
    const cat = { name: ['Persian', 'Bengal'] };
    console.log('Query:', name);
    return cat;
  }

  @Get('breed/:id')
  breed(@Ip() ip: string): string {
    console.log('This is Breed', ip);
    return 'This action returns a breed of cat!';
  }
}
