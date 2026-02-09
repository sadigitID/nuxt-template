import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('has heading', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('Welcome to Nuxt 4 Template')
  })

  test('counter increments', async ({ page }) => {
    await page.goto('/')

    await page.click('button')
    await expect(page.locator('button')).toContainText('Count is 1')
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About')
  })
})
