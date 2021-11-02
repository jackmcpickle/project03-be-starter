const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const secret = process.env.SECRET_TOKEN || 'secret';
const expiration = process.env.TOKEN_EXPIRY || '2h';

module.exports = {
  authMiddleware: function ({ request }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = request.headers.authorization;

    if (request.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return request;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      request.user = data;
    } catch {
      logger.warn('Invalid token');
    }

    return request;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
