import { UserService } from './user.service';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

const userModelMock = {
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndDelete: jest.fn()
};

const tokenModelMock = {
  findOne: jest.fn(),
  save: jest.fn(),
  findOneAndDelete: jest.fn()
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserModel',
          useValue: userModelMock,
        },
        {
          provide: 'TokenModel',
          useValue: tokenModelMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should return a user if they exist', async () => {
      const email = 'test@example.com';
      userModelMock.findOne.mockResolvedValueOnce({ email });
      expect(await service.findByEmail(email)).toEqual({ email });
    });

    it('should return null if user does not exist', async () => {
      userModelMock.findOne.mockResolvedValueOnce(null);
      expect(await service.findByEmail('notfound@example.com')).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return null if user does not exist', async () => {
      userModelMock.findById.mockResolvedValueOnce(null);
      expect(await service.findById('invalidid', 'sometoken')).toBeNull();
    });

    it('should return error object if token does not match', async () => {
      userModelMock.findById.mockResolvedValueOnce({ id: 'user1', name: 'John', email: 'john@example.com' });
      service.retrieveToken = jest.fn(() => Promise.resolve('othertoken'));
      const response = await service.findById('user1', 'invalidtoken');
      expect(response).toHaveProperty('error', true);
      expect(response).toHaveProperty('error_text', 'This user is not authorized');
    });
  });


  describe('storeToken', () => {
    it('should store a token and return token document', async () => {
      const tokenDoc = { userId: 'user1', token: 'sometoken' };
      tokenModelMock.save.mockResolvedValueOnce(tokenDoc);
      expect(await service.storeToken('user1', 'sometoken')).toEqual(tokenDoc);
    });
  });

  describe('retrieveToken', () => {
    it('should return a token if found', async () => {
      tokenModelMock.findOne.mockResolvedValueOnce({ token: 'validtoken' });
      expect(await service.retrieveToken('user1')).toEqual('validtoken');
    });

    it('should return null if no token is found', async () => {
      tokenModelMock.findOne.mockResolvedValueOnce(null);
      expect(await service.retrieveToken('invaliduser')).toBeNull();
    });
  });

  describe('invalidateToken', () => {
    it('should delete the token and return the deleted token document', async () => {
      const deleteResponse = { deleted: true };
      tokenModelMock.findOneAndDelete.mockResolvedValueOnce(deleteResponse);
      expect(await service.invalidateToken('user1')).toEqual(deleteResponse);
    });

    it('should return null if no token is deleted', async () => {
      tokenModelMock.findOneAndDelete.mockResolvedValueOnce(null);
      expect(await service.invalidateToken('invaliduser')).toBeNull();
    });
  });
});

