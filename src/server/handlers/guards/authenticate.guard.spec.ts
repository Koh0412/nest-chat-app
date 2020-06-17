import { AuthenticateGuard } from './authenticate.guard';

describe('AuthenticateGuardGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticateGuard()).toBeDefined();
  });
});
