import 'reflect-metadata';
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";

import AppError from '@shared/errors/AppError';
describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUserService.execute({
            name: 'Andre',
            email: 'andre.moura@kinghost.com.br',
            password: 'king2019'
        })
        expect(user).toHaveProperty('id')
    });

    it('should not be able to create a user with a existing email', async () => {
      const fakeUsersRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUserService.execute({
            name: 'Andre',
            email: 'andre.moura@kinghost.com.br',
            password: 'king2019'
        });

        expect(createUserService.execute({
          name: 'Andre',
          email: 'andre.moura@kinghost.com.br',
          password: 'king2019'
      })).rejects.toBeInstanceOf(AppError);

    });


});
