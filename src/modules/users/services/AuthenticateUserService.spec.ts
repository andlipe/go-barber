import 'reflect-metadata';
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError';
describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
          name: 'andre',
          email: 'andre.moura@kinghost.com.br',
          password: 'king2019'
        })

        const response = await authenticateUser.execute({
          email: 'andre.moura@kinghost.com.br',
          password: 'king2019'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toBe(user);


});
  it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        expect(authenticateUser.execute({
          email: 'andre.moura@123123123.com.br',
          password: 'king2019'
        })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
          name: 'andre',
          email: 'andre.moura@kinghost.com.br',
          password: 'king2019'
        })


        expect(authenticateUser.execute({
          email: 'andre.moura@kinghost.com.br',
          password: 'king202219'
        })).rejects.toBeInstanceOf(AppError)
});

});
