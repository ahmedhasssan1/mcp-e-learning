import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSE_CLIENT') private courseClient: ClientProxy) {}
  create(createCourseDto: CreateCourseDto) {
    return this.courseClient.send('createCourse', createCourseDto);
  }

  findAll() {
    return this.courseClient.send('findAllCourses', {});
  }

  findOne(id: number) {
    return this.courseClient.send("test course crud",id)
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
  return this.courseClient.send("test course crud",{id,...updateCourseDto})
  }

  remove(id: number) {
  return this.courseClient.send("test course crud",id)
  }
}
