import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('has heading', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h1')).toContainText('Welcome to Nuxt 4 Template')
  })

  test('counter increments and decrements', async ({ page }) => {
    await page.goto('/')

    // Initial count should be 0
    await expect(page.locator('.tabular-nums')).toContainText('0')

    // Click increment button (+)
    await page.click('button:has-text("+")')
    await expect(page.locator('.tabular-nums')).toContainText('1')

    // Click increment again
    await page.click('button:has-text("+")')
    await expect(page.locator('.tabular-nums')).toContainText('2')

    // Click decrement button (-)
    await page.click('button:has-text("-")')
    await expect(page.locator('.tabular-nums')).toContainText('1')

    // Click reset
    await page.click('button:has-text("Reset")')
    await expect(page.locator('.tabular-nums')).toContainText('0')
  })

  test('navigation to about page', async ({ page }) => {
    await page.goto('/')

    await page.click('a[href="/about"]')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About')
  })
})

test.describe('About Page', () => {
  test('has heading and features', async ({ page }) => {
    await page.goto('/about')

    await expect(page.locator('h1')).toContainText('About')
    await expect(page.locator('text=TypeScript')).toBeVisible()
    await expect(page.locator('text=Tailwind CSS')).toBeVisible()
  })

  test('navigation back to home', async ({ page }) => {
    await page.goto('/about')

    await page.click('a[href="/"]')
    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toContainText('Welcome to Nuxt 4 Template')
  })
})
