import { AllExceptionFilter } from './all-exception.filter';

describe('InternalExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilter()).toBeDefined();
  });
});
