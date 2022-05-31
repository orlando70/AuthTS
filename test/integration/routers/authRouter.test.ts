import { assert } from 'chai';
import supertest from 'supertest';
import {faker} from '@faker-js/faker';
import app from '../../../src/app';
import _ from 'lodash';
import { decodeToken } from '../../../src/utils';

const payload: any = {};
const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';

const request = supertest.agent(app);


const email = faker.internet.email();
const password = faker.internet.password();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

describe('Auth Router', () => {
  let token: string;
  let resetPwToken: string;
  let resetToken: string;

  describe('Register', () => {
    it('should return an error if any required fields are absent', async () => {
      const res = await request
        .post('/v1/auth/register') //
        .set('User-Agent', userAgent)
        .send({});
        
      assert.equal(res.status, 422);
    });

    it('should register if all fields are present', async () => {
      const res = await request
        .post('/v1/auth/register') //
        .set('User-Agent', userAgent)
        .send({
          firstName,
          lastName,
          email,
          password,
        });

      assert.equal(res.status, 200);
      payload.token = res.body.data.token;
    });
  });

  describe('email verification', () => {
    it('verify-email', async () => {      
      const res = await request
        .get(`/v1/auth/verify/${payload.token}`)
        .set('User-Agent', userAgent)
        .send({});

      assert.equal(res.status, 200);
      assert.property(res.body, 'data');
      assert.include(res.body.message, 'verified successfully')
    });
  });

  describe('Login', () => {
    it('should return an error if any required fields are absent', async () => {
      const res = await request
        .post('/v1/auth/login') //
        .set('User-Agent', userAgent)
        .send({});

      assert.equal(res.status, 422);
    });

    it('should not login with invalid credentials', async () => {
      const res = await request
        .post('/v1/auth/login') //
        .set('User-Agent', userAgent)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        });

      assert.equal(res.status, 400);
      assert.include(res.body.message, 'incorrect');
    });

    it('should login with correct credentials', async () => {
      const res = await request
        .post('/v1/auth/login') //
        .set('User-Agent', userAgent)
        .send({
          email,
          password
        });

      token = res.body.data.token;

      assert.equal(res.status, 200);
      assert.property(res.body, 'data');
      assert.property(res.body.data, 'token');
    });
  });

  describe('Reset password', () => {
    describe('Initiate reset password request', () => {
      it('should return an error if email is not registered', async () => {
        const res = await request
        .post('/v1/auth/initiate/reset')
        .set('User-Agent', userAgent)
        .send({
          email: faker.internet.email(),
        });

        assert.oneOf(res.status, [400, 422]);
        assert.include(res.body.message, 'not registered');
      });

      it('should complete request successfully if email is registered', async () => {
        const res = await request
        .post('/v1/auth/initiate/reset')
        .set('User-Agent', userAgent)
        .send({
          email,
        });
    
        resetPwToken = res.body.data.token;

        assert.equal(res.status, 200);
        assert.property(res.body, 'data');
        assert.property(res.body.data, 'token');
        assert.isString(res.body.data.token);

      });
    });

    describe('Reset Password', () => {
      it('should throw a 400 error if wrong token flag is used', async () => {
        
        const res = await request
          .post(`/v1/auth/reset`)
          .set('User-Agent', userAgent)
          .set('authorization', `Bearer ${token}`)
          .send({
            newPassword: faker.internet.password()
          });
        
        assert.equal(res.status, 400);
        assert.include(res.body.message, 'Token is not valid for');
      });

      // it('should throw a 403 Unauthorized error if reset token is invalid or expired', async () => {
      //   const res = await request
      //   .post(`/v1/auth/reset`)
      //   .set('User-Agent', userAgent)
      //   .set('authorization', `Bearer ${resetPwToken}`)
      //   .send({});

      //   assert.equal(res.status, 403);
      // });

     
      // it('should throw a bad request error if password is not up to 8 chars', async () => {
      //   console.log('PASSWORD RESET TOKEN', resetPwToken);
        
      //   const res = await request
      //     .post(`/v1/auth/reset`)
      //     .set('User-Agent', userAgent)
      //     .set('authorization', `Bearer ${resetPwToken}`)
      //     .send({
      //       newPassword: faker.internet.password(7),
      //     });
      //     console.log(res.error);

      //   assert.equal(res.status, 422);
      // });

      it('should reset password if correct', async () => {
        const res = await request
          .post(`/v1/auth/reset`)
          .set('User-Agent', userAgent)
          .set('authorization', `Bearer ${resetPwToken}`)
          .send({
            newPassword: faker.internet.password(),
          });

          console.log(res.error);

        assert.equal(res.status, 200);
        assert.property(res.body, 'data');
        assert.property(res.body.data, 'token');
        assert.isString(res.body.data.token);
      });
    });
  });

  describe('Logout', () => {
    it('should logout user', async () => {
      const res = await request
        .post('/v1/auth/logout')
        .set('User-Agent', userAgent)
        .set('authorization', `Bearer ${token}`)
        .send();

      assert.equal(res.status, 200);
    });
  });
});
