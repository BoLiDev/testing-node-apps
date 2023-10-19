// Testing Pure Functions

import {expect} from '@jest/globals'
import {isPasswordAllowed} from 'utils/auth'
import cases from 'jest-in-case'

const casify = (obj) => {
  return Object.entries(obj).map(([name, password]) => ({
    name: `${password} - ${name}`,
    password,
  }))
}

cases(
  'isPasswordAllowed: invalid passwords',
  (ops) => {
    expect(isPasswordAllowed(ops.password)).toBeFalsy()
  },
  casify({
    'too short': 'a2c!',
    'has no alphabet characters': '123456!',
    'has no numbers': 'ABCdef!',
    'has no uppercase letters': 'abc123!',
    'has no lowercase letters': 'ABC123!',
    'no non-alpanumeric characters': 'ABCdef123',
  }),
)

cases(
  'isPasswordAllowed: valid passwords',
  (ops) => {
    expect(isPasswordAllowed(ops.password)).toBeTruthy()
  },
  casify({'valid password': '!aBc123'}),
)
