import { expect, test } from "@playwright/test";

test("email sign-in and core log workflow", async ({ page }) => {
  const email = `forge-smoke-${Date.now()}@example.com`;
  const title = `Forge Smoke Book ${Date.now()}`;
  const updatedTitle = `${title} Updated`;

  await page.goto("http://127.0.0.1:3001/signin");
  await page.getByPlaceholder("you@example.com").fill(email);
  await page.getByRole("button", { name: "Send sign-in code" }).click();

  const codeMessage = page.locator("text=/Use code \\d{6}/");
  await expect(codeMessage).toBeVisible();
  const code = (await codeMessage.textContent())?.match(/\d{6}/)?.[0];
  expect(code).toBeTruthy();

  await page.getByPlaceholder("123456").fill(code!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(page.getByRole("heading", { name: "Your private reading desk." })).toBeVisible();

  await page.getByPlaceholder("The Left Hand of Darkness").fill(title);
  await page.getByPlaceholder("Ursula K. Le Guin").fill("Forge Author");
  await page.getByPlaceholder("36").fill("42");
  await page.getByPlaceholder("5").fill("5");
  await page.getByPlaceholder("What stood out? Favorite line? Why this session mattered?").fill("Browser smoke test note.");
  await page.getByRole("button", { name: "Save log" }).click();

  await expect(page.getByRole("link", { name: title })).toBeVisible();

  const card = page.locator("article").filter({ hasText: title });
  await card.getByText("Edit").click();
  await card.locator('input[name="title"]').fill(updatedTitle);
  await card.getByRole("button", { name: "Update log" }).click();
  await expect(page.getByRole("link", { name: updatedTitle })).toBeVisible();

  await page.getByRole("link", { name: "History" }).click();
  await expect(page).toHaveURL(/\/app\/history$/);
  await page.getByPlaceholder("Search title or author").fill("Forge Author");
  await expect(page.getByRole("link", { name: updatedTitle })).toBeVisible();

  await page.goto("http://127.0.0.1:3001/app");
  const updatedCard = page.locator("article").filter({ hasText: updatedTitle });
  await updatedCard.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("link", { name: updatedTitle })).toHaveCount(0);
});
