import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true if route is public', () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            url: '/api/auth',
          }),
        }),
      };

      expect(guard.canActivate(context as any)).toBe(true);
    });

    it("should throw an unauthorized exception if route isn't public and there is no auth header", () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            url: '/api/user',
            headers: {},
          }),
        }),
      };

      expect(() => guard.canActivate(context as any)).toThrow('Unauthorized');
    });

    it("should throw an unauthorized exception if route isn't public and there is no bearer token", () => {
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            url: '/api/user',
            headers: {
              authorization: 'Nothing here',
            },
          }),
        }),
      };

      expect(() => guard.canActivate(context as any)).toThrow('Unauthorized');
    });
  });
});
