import { test, expect } from '@playwright/test'

const BASE_URL = "http://localhost:3000"

test("Test 3 - image loads when page loads", async ({ page }) => {

  await page.goto(BASE_URL)

  await page.waitForResponse(resp =>
    resp.url().includes("/api/dogs/random") && resp.status() === 200
  )

  const image = page.locator("img")

  const src = await image.getAttribute("src")

  expect(src).toBeTruthy()
  expect(src).toMatch(/^https:\/\//)
})

test("Test 4 - image loads when button clicked", async ({ page }) => {

  await page.goto(BASE_URL)

  const button = page.locator("button")

  await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes("/api/dogs/random") && resp.status() === 200
    ),
    button.click()
  ])

  const image = page.locator("img")
  const src = await image.getAttribute("src")

  expect(src).toBeTruthy()
  expect(src).toMatch(/^https:\/\//)
})

test("Test 5 - show error when API fails", async ({ page }) => {

  await page.route("**/api/dogs/random", route => route.abort())

  await page.goto(BASE_URL)

  const errorElement = page.locator("text=/error/i")

  await expect(errorElement).toBeVisible()
})