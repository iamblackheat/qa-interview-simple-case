import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {

  test('logging in works with existing account', async ({ page }) => {
// open login page
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[0]
// input email
    await page
      .locator("#email")
      .pressSequentially(existingUser.email)
// input password
    await page
      .locator("#password")
      .pressSequentially(existingUser.password)
// click login button
    await page
      .getByRole('button',{ name: "Login" })
      .click();
      
// check page after login
    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('Welcome ' + existingUser.firstName + ' ' + existingUser.lastName )).toBeVisible();
    await expect(page.getByRole('button',{ name: "LOG OUT" })).toBeVisible();

  })
})
