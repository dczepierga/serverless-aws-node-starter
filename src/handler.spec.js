const { hello } = require('./handler');

describe('handler', () => {
  describe('hello', () => {
    test('should return correct response', () => {
      hello(null, {}, (error, result) => {
        expect(error).toBeUndefined();
        expect(typeof result.body).toBe('string');
      });
    });
  });
});
