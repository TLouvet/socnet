import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../../src/features/auth/auth.module';
import { User } from 'src/features/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/features/user/user.module';
import { UserService } from 'src/features/user/user.service';

describe('Auth', () => {
  let app: INestApplication;
  let userService: UserService;

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
    userService = moduleRef.get<UserService>(UserService);
    await app.init();
  });

  it('/POST register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'thomas@tlouvet.com',
        password: '123456789',
      })
      .expect(201);
  });

  it('/POST register with existing email', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'thomas@tlouvet.com',
        password: '123456789',
      })
      .expect(400);
  });

  it(`/POST LOGIN`, async () => {
    const response = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'thomas@tlouvet.com',
      password: '123456789',
    });

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toHaveProperty('token');
  });

  it('/POST Login with wrong email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'whatever@notexisting.com',
        password: '123456789',
      })
      .expect(401);
  });

  it('/POST Login with wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'thomas@tlouvet.com',
        password: '1234567',
      })
      .expect(401);
  });

  afterAll(async () => {
    // Cleanup
    const users = await userService.find();
    await userService.delete(users[0].id);
    expect(await userService.find()).toHaveLength(0);

    await app.close();
  });
});
