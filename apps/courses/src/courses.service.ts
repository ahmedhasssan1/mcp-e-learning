import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entity/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
  ) {}

  async getAllCourses() {
    const courses = await this.courseRepo.find();
    return courses;
  }
  async getOne(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({ where: { id } });
    return course;
  }
  async deleteOne(id: number) {
    const course_exist = await this.courseRepo.findOne({ where: { id } });
    if (!course_exist) {
      throw new Error('Course not found');
    }
    console.log('update in local  feature branch repo ');
    return await this.courseRepo.remove(course_exist);
    
  }
  
}
