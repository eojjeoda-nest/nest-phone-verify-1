import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneService {
 

  findAll() {
    return `This action returns all phone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phone`;
  }



  remove(id: number) {
    return `This action removes a #${id} phone`;
  }
}
