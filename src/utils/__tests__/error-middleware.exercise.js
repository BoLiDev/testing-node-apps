// Testing Middleware

// 🐨 you'll need both of these:
// import {UnauthorizedError} from 'express-jwt'
// import errorMiddleware from '../error-middleware'
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from 'utils/error-middleware'
import {buildNext, buildReq, buildRes} from 'utils/generate'

test('headersSent case', () => {
  const res = buildRes()
  const next = buildNext()
  const req = buildReq()
  const code = 'auth_error_code'
  const message = 'auth error message'
  const error = new UnauthorizedError(code, {message})
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code,
    message,
  })
  expect(res.status).toHaveBeenCalledTimes(1)
})

test('else case', () => {
  const res = buildRes()
  const next = buildNext()
  const req = buildReq()
  const error = new Error('else_error_code')
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})
