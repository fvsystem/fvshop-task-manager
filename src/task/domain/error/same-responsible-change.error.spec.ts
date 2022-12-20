import { SameResponsibleChangeError } from '@root';

describe('Same Responsible Error', () => {
  it('should be created an error', () => {
    const error = new SameResponsibleChangeError();
    expect(error).toBeInstanceOf(SameResponsibleChangeError);
    expect(error.message).toBe('The responsible is the same');
    expect(error.name).toBe('SameResponsibleChangeError');
  });

  it('should be created an error with custom Message', () => {
    const error = new SameResponsibleChangeError('Custom Message');
    expect(error).toBeInstanceOf(SameResponsibleChangeError);
    expect(error.message).toBe('Custom Message');
    expect(error.name).toBe('SameResponsibleChangeError');
  });
});
