import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { User } from 'src/features/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/features/user/user.module';
import { UserService } from 'src/features/user/user.service';
import { AuthModule } from '../auth/auth.module';
import exp from 'constants';

describe('User CRUD', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'mysql',
            host: config.get('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            username: config.get('DB_USERNAME'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_TEST_DATABASE'),
            entities: [User],
            synchronize: true,
          }),
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // create user for the test
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: '123456789',
      })
      .expect(201);
  });

  it('/GET users', async () => {
    const res = await request(app.getHttpServer()).get('/user');
    expect(res.status).toBe(200);

    const users = JSON.parse(res.text);
    expect(users.length).toBe(1);
    expect(users[0]).not.toHaveProperty('password');
  });

  it('/DELETE user', async () => {
    const res = await request(app.getHttpServer()).get('/user').expect(200);
    const users = JSON.parse(res.text);
    if (users.length === 0) {
      fail('No user found, check for beforeAll malfunction');
    }

    const user = users[0];
    await request(app.getHttpServer()).delete(`/user/${user.id}`);
    const res2 = await request(app.getHttpServer()).get('/user');
    expect(res2.status).toBe(200);

    const users2 = JSON.parse(res2.text);
    expect(users2.length).toBe(0);
  });

  afterAll(async () => {
    await app.close();
    console.log('App closed from user.controller.spec.ts');
  });
});
