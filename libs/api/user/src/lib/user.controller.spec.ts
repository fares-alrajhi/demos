
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';

jest.mock('./user.service');

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    const mockHeadersDto = { 'access-token': 'mockToken' };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    describe('getUser', () => {
        it('should return user details successfully when valid id and headers are provided', async () => {
            const userId = '1';
            const expectedUserDetails = { id: userId, name: 'John Doe' };

            userService.findById = jest.fn().mockResolvedValue(expectedUserDetails);

            const result = await userController.getUser(userId, mockHeadersDto);

            expect(userService.findById).toHaveBeenCalledWith(userId, 'mockToken');
            expect(result).toEqual(expectedUserDetails);
        });

        it('should log the verbose information correctly', async () => {
            const userId = '1';
            const expectedUserDetails = { id: userId, name: 'John Doe' };
            Logger.prototype.verbose = jest.fn();

            userService.findById = jest.fn().mockResolvedValue(expectedUserDetails);

            await userController.getUser(userId, mockHeadersDto);

            expect(Logger.prototype.verbose).toHaveBeenCalledWith(`User with id ${userId} retrieving profile`);
        });

        it('should throw an error if access-token is missing in headers', async () => {
            const userId = '1';
            const headersWithoutToken = {};

            userService.findById = jest.fn().mockResolvedValue(null);

            await expect(
                userController.getUser(userId, headersWithoutToken as any)
            ).rejects.toThrow();
        });

        it('should handle the case if userService.findById returns null', async () => {
            const userId = '999';
            userService.findById = jest.fn().mockResolvedValue(null);

            const result = await userController.getUser(userId, mockHeadersDto);

            expect(result).toBeNull();
        });
    });
});
