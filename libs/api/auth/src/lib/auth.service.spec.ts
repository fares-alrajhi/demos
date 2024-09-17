import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../../user/src/lib/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            _getUserDetails: jest.fn(),
            retrieveToken: jest.fn(),
            storeToken: jest.fn(),
            invalidateToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should handle existing user', async () => {
      const userDto = { name: 'John', email: 'john@example.com', password: 'password123' };
      userService.findByEmail = jest.fn().mockResolvedValue(userDto);
      const result = await service.register(userDto);
      expect(result.error).toBeTruthy();
      expect(result.status).toBe('conflict');
    });

    it('should register new user successfully', async () => {
      const userDto = { name: 'John', email: 'john@example.com', password: 'password123' };
      userService.findByEmail = jest.fn().mockResolvedValue(null);
      userService.create = jest.fn().mockImplementation(() => Promise.resolve({ ...userDto, id: '1' }));
      userService._getUserDetails = jest.fn().mockReturnValue({ ...userDto, id: '1' });

      const result = await service.register(userDto);
      expect(result.error).toBeFalsy();
      expect(result.status).toBe('ok');
      expect(result.user).toBeDefined();
    });
  });

  describe('login', () => {
    it('should fail if user validation fails', async () => {
      const loginDto = { email: 'john@example.com', password: 'password123' };
      service.validateUser = jest.fn().mockResolvedValue(null);
      const result = await service.login(loginDto);
      expect(result.error).toBeTruthy();
      expect(result.status).toBe('unauthorized');
    });

    it('should login user successfully', async () => {
      const user = { id: '1', name: 'John', email: 'john@example.com' };
      const loginDto = { email: 'john@example.com', password: 'password123' };
      service.validateUser = jest.fn().mockResolvedValue(user);
      jwtService.signAsync = jest.fn().mockResolvedValue('token');

      const result = await service.login(loginDto);
      expect(result.status).toBe('ok');
    });
});
});

