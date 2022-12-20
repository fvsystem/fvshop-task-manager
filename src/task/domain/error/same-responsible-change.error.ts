export class SameResponsibleChangeError extends Error {
  constructor(message?: string) {
    super(message || 'The responsible is the same');
    this.name = 'SameResponsibleChangeError';
  }
}
