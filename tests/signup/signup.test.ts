import { test, expect } from '@playwright/test'
import { existingUsers, newUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('Sign up test', () => {
  test('sign up with valid user detail', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    const newUser = newUsers[0]

    await page
      .locator("#firstName")
      .pressSequentially(newUser.firstName)

    await page
      .locator("#lastName")
      .pressSequentially(newUser.lastName)
    
    await page
      .locator("#email")
      .pressSequentially(newUser.email)

    await page
      .locator("#password")
      .pressSequentially(newUser.password)

    await page
      .getByRole('button',{ name: "SUBMIT" })
      .click();

    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('Welcome Test4 Testsson4')).toBeVisible();
    await expect(page.getByRole('button',{ name: "LOG OUT" })).toBeVisible();

  })

  test('sign up with existing user detail', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    const newUser = existingUsers[0]

    await page
      .locator("#firstName")
      .pressSequentially(newUser.firstName)

    await page
      .locator("#lastName")
      .pressSequentially(newUser.lastName)
    
    await page
      .locator("#email")
      .pressSequentially(newUser.email)

    await page
      .locator("#password")
      .pressSequentially(newUser.password)

    await page
      .getByRole('button',{ name: "SUBMIT" })
      .click();

    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('Welcome '+newUser.firstName +' '+newUser.lastName)).toBeVisible();
    await expect(page.getByRole('button',{ name: "LOG OUT" })).toBeVisible();

  })

  test('sign up with invalid user detail', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    const newUser = newUsers[1]

    await page
      .locator("#firstName")
      .pressSequentially(newUser.firstName)

    await page
      .locator("#lastName")
      .pressSequentially(newUser.lastName)
    
    await page
      .locator("#email")
      .pressSequentially(newUser.email)

    await page
      .locator("#password")
      .pressSequentially(newUser.password)

    await expect(page.getByRole('button',{ name: "SUBMIT" })).toBeDisabled();
  })

})