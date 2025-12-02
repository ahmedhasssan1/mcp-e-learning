import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ClientProxy } from '@nestjs/microservices';
import { COURSES_PATTERN } from '@app/contracts/courses/courses.pattern';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSE_CLIENT') private courseClient: ClientProxy) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseClient.send('createCourse', createCourseDto);
  }

  findAll() {
    return this.courseClient.send(COURSES_PATTERN.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.courseClient.send('findOneCourse', id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseClient.send('updateCourse', { id, ...updateCourseDto });
  }

  remove(id: number) {
    return this.courseClient.send('test course crud', id);
  }
}
