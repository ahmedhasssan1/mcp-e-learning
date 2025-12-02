import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
// import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from ';
import { CreateCourseDto, } from '@app/contracts/courses/create-course.dto';
import { UpdateCourseDto } from '@app/contracts/courses/update-course.dto';
import { COURSES_PATTERN } from '@app/contracts/courses/courses.pattern';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern('createCourse')
  create(@Payload() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @MessagePattern(COURSES_PATTERN.FIND_ALL)
  findAll() {
    return this.coursesService.findAll();
  }

  @MessagePattern('findOneCourse')
  findOne(@Payload() id: number) {
    return this.coursesService.findOne(id);
  }

  @MessagePattern('updateCourse')
  update(@Payload() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(updateCourseDto.id, updateCourseDto);
  }

  @MessagePattern('removeCourse')
  remove(@Payload() id: number) {
    return this.coursesService.remove(id);
  }
}
