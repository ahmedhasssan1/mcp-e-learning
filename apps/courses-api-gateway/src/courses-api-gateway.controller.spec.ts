import { Test, TestingModule } from '@nestjs/testing';
import { CoursesApiGatewayController } from './courses-api-gateway.controller';
import { CoursesApiGatewayService } from './courses-api-gateway.service';

describe('CoursesApiGatewayController', () => {
  let coursesApiGatewayController: CoursesApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoursesApiGatewayController],
      providers: [CoursesApiGatewayService],
    }).compile();

    coursesApiGatewayController = app.get<CoursesApiGatewayController>(CoursesApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(coursesApiGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
