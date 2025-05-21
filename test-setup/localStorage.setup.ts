import { test as setup } from '@playwright/test'
import { promises as fs } from 'fs'
import { setupDir, setupFile } from '../playwright.config'

export const existingUsers = [
  {
    email: 'test1@mail.com',
    password: 'testPassword!',
    firstName: 'Test1',
    lastName: 'Testsson1',
  },
  {
    email: 'test2@mail.com',
    password: 'testPassword!',
    firstName: 'Test2',
    lastName: 'Testsson2',
  },
  {
    email: 'test3@mail.com',
    password: 'testPassword!',
    firstName: 'Test3',
    lastName: 'Testsson3',
  },
] as const

export const newUsers = [
  {
    email: 'test4@mail.com',
    password: 'testPassword!',
    firstName: 'Test4',
    lastName: 'Testsson4',
  },
  {
    email: 'test5',
    password: 'abc',
    firstName: 'Test5',
    lastName: 'Testsson5',
  },
 
] as const

setup('localStorage', async () => {
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:8080',
        localStorage: [
          { name: 'users', value: JSON.stringify({ users: existingUsers }) },
        ],
      },
    ],
  }

  await fs.mkdir(setupDir, { recursive: true })
  await fs.writeFile(setupFile, JSON.stringify(storageState, null, 2))
})
