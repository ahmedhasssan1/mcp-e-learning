import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './courses/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private readonly courseRepo:Repository<Course>){}

  async getAllCourses(){
    const courses=await this.courseRepo.find();
    return courses
  }
}
