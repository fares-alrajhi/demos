import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../../../user/src/lib/dtos/new-user.dto';
import { ExistingUserDTO } from '../../../user/src/lib/dtos/existing-user.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const newUser: NewUserDTO = {
          name: 'John Doe', email: 'john@test.com',
          password: ''
      };
      const expectedResponse = { id: '1', name: 'John Doe', email: 'john@test.com' };
      jest.spyOn(authService, 'register').mockResolvedValue(expectedResponse);

      await expect(controller.register(newUser)).resolves.toEqual(expectedResponse);
    });

    it('should handle errors during registration', async () => {
      const newUser: NewUserDTO = {
          name: 'John Doe', email: 'john@test.com',
          password: ''
      };
      const error = { message: 'Error registering' };
      jest.spyOn(authService, 'register').mockRejectedValue(error);

      await expect(controller.register(newUser)).resolves.toEqual(error);
    });
  });

  describe('login', () => {
    it('should successfully log a user in and return a token', async () => {
      const existingUser: ExistingUserDTO = { email: 'john@test.com', password: '123456' };
      const expectedResponse = { token: 'abcdef12345', status: "ok", error: false };
      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      const mockResponse: Partial<Response> = {};
      await expect(controller.login(existingUser, mockResponse as Response)).resolves.toEqual(expectedResponse);
    });

    it('should handle errors during login', async () => {
      const existingUser: ExistingUserDTO = { email: 'john@test.com', password: '123456' };
      const error = { message: 'Invalid credentials' };
      jest.spyOn(authService, 'login').mockRejectedValue(error);

      const mockResponse: Partial<Response> = {};
      await expect(controller.login(existingUser, mockResponse as Response)).resolves.toEqual(error);
    });
  });

  describe('logout', () => {
    it('should successfully log a user out', async () => {
      const userId = '1';
      jest.spyOn(authService, 'logout').mockResolvedValue({ status: '', error: false });

      await expect(controller.logout(userId)).resolves.toBeTruthy;
    });

    it('should handle errors during logout', async () => {
      const userId = '1';
      const error = { message: 'Logout failed' };
      jest.spyOn(authService, 'logout').mockRejectedValue(error);

      await expect(controller.logout(userId)).resolves.toEqual(error);
    });
  });
});
