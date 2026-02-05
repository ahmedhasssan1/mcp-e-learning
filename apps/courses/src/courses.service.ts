import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entity/course.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courseRepo:Repository<Course>){}

  async getAllCourses(){
    const courses=await this.courseRepo.find();
    return courses
  }
  async getOne(id:number):Promise<Course>{
    const course=await this.courseRepo.findOne({where:{id}});
    return course;
  }
}
