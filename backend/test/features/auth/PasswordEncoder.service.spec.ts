import { Test, TestingModule } from '@nestjs/testing';
import { BCryptPasswordServiceImpl } from '../../../src/features/auth/service/PasswordServiceImpl.service';

describe('PasswordServiceImpl', () => {
  let service: BCryptPasswordServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BCryptPasswordServiceImpl],
    }).compile();

    service = module.get<BCryptPasswordServiceImpl>(BCryptPasswordServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encode', () => {
    it('should return a hashed password', async () => {
      const password = 'password';
      const hashedPassword = service.encode(password);

      expect(hashedPassword).not.toEqual(password);
    });
  });

  describe('compare', () => {
    it('should return true if password matches', async () => {
      const password = 'password';
      const hashedPassword = service.encode(password);
      const isSamePassword = service.compare(password, hashedPassword);

      expect(isSamePassword).toBe(true);
    });

    it('should return false if password does not match', async () => {
      const password = 'password';
      const hashedPassword = service.encode(password);
      const isMatch = service.compare('wrongpassword', hashedPassword);

      expect(isMatch).toBe(false);
    });
  });
});
