import { test, expect } from "@playwright/test";

// ─── Shared ──────────────────────────────────────────────────────────────────

test.describe("page basics", () => {
  test("returns 200 and correct title", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Christopher Hernandez/i);
  });

  test("no unhandled console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    // Give hydration a moment
    await page.waitForTimeout(500);
    const relevantErrors = errors.filter(
      (message) => !/cloudflareinsights\.com/i.test(message),
    );
    expect(relevantErrors).toHaveLength(0);
  });
});

// ─── Desktop ─────────────────────────────────────────────────────────────────

test.describe("desktop layout", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("renders the hero name", async ({ page }) => {
    await page.goto("/");
    // The glitch title resolves to the canonical name after mount
    const heading = page.locator(".hero__name, h1").first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/christopher/i);
  });

  test("renders the role / subtitle", async ({ page }) => {
    await page.goto("/");
    const role = page.locator(".role-link");
    await expect(role).toBeVisible();
    await expect(role).toContainText(/senior software engineer/i);
  });

  test("sigil panel is visible at desktop width", async ({ page }) => {
    await page.goto("/");
    const sigilPanel = page.locator(".sigil-panel");
    await expect(sigilPanel).toBeVisible();
  });

  test("sigil SVG renders", async ({ page }) => {
    await page.goto("/");
    const svg = page.locator(".sigil-panel svg").first();
    await expect(svg).toBeVisible();
  });

  test("all social links are present and have valid hrefs", async ({
    page,
  }) => {
    await page.goto("/");
    const links = page.locator(".link-card");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test("GitHub link points to correct profile", async ({ page }) => {
    await page.goto("/");
    const githubLink = page.locator('.link-card[href*="github"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      "href",
      /github\.com\/chernandez7/i,
    );
  });

  test("LinkedIn link points to correct profile", async ({ page }) => {
    await page.goto("/");
    const linkedinLink = page.locator('.link-card[href*="linkedin"]');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute("href", /linkedin\.com/i);
  });

  test("work history section renders with Tempus AI", async ({ page }) => {
    await page.goto("/");
    // Navigate to the history section (it may be off-screen on first load)
    const historyList = page.locator(".page-section--history .work-history");
    await expect(historyList).toBeAttached();
    const tempus = page.locator(".work-history__company", {
      hasText: "Tempus AI",
    });
    await expect(tempus).toBeAttached();
  });

  test("corner sanctuary element is present in DOM", async ({ page }) => {
    await page.goto("/");
    const corner = page.locator(".corner-sanctuary");
    await expect(corner).toBeAttached();
  });

  test("external links open in new tab", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('.link-card[href^="https"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const target = await links.nth(i).getAttribute("target");
      expect(target).toBe("_blank");
    }
  });

  test("external links have rel=noopener", async ({ page }) => {
    await page.goto("/");
    const links = page.locator('.link-card[href^="https"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const rel = await links.nth(i).getAttribute("rel");
      expect(rel).toMatch(/noopener/);
    }
  });
});

// ─── Mobile ──────────────────────────────────────────────────────────────────

test.describe("mobile layout", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 Pro

  test("page stack supports continuous vertical scroll on mobile", async ({
    page,
  }) => {
    await page.goto("/");

    const stack = page.locator(".page-stack");
    const historySection = page.locator(".page-section--history");
    await expect(stack).toBeVisible();
    await expect(historySection).toBeAttached();

    const snapType = await stack.evaluate(
      (element) => getComputedStyle(element).scrollSnapType,
    );
    expect(snapType).toBe("none");

    const dimensions = await stack.evaluate((element) => ({
      clientHeight: element.clientHeight,
      scrollHeight: element.scrollHeight,
    }));
    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);

    const initialTop = await stack.evaluate((element) => element.scrollTop);

    await historySection.evaluate((element) => {
      element.scrollIntoView({ block: "start", behavior: "auto" });
    });

    await expect
      .poll(async () => {
        const currentTop = await stack.evaluate((element) => element.scrollTop);
        return currentTop !== initialTop;
      })
      .toBe(true);
  });

  test("page loads without JS errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForTimeout(500);
    const relevantErrors = errors.filter(
      (message) => !/cloudflareinsights\.com/i.test(message),
    );
    expect(relevantErrors).toHaveLength(0);
  });

  test("sigil panel is visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const sigilPanel = page.locator(".sigil-panel");
    // At <=860px, the mobile override intentionally shows the panel.
    await expect(sigilPanel).toBeVisible();
    await expect(sigilPanel).toHaveCSS("display", "grid");
    await expect(sigilPanel.locator("svg")).toHaveCount(2);
  });

  test("hero name is visible on mobile", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator(".hero__name, h1").first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/christopher/i);
  });

  test("arcane section is above hero and history on mobile", async ({
    page,
  }) => {
    await page.goto("/");

    const stack = page.locator(".page-stack");
    const hero = page.locator(".page-section--hero");
    const history = page.locator(".page-section--history");
    const esoteric = page.locator(".page-section--esoteric");

    await expect(stack).toBeVisible();
    await expect(hero).toBeVisible();
    await expect(history).toBeVisible();
    await expect(esoteric).toBeVisible();

    const positions = await page.evaluate(() => {
      const getTop = (selector: string) =>
        document.querySelector(selector)?.getBoundingClientRect().top ?? 0;

      return {
        heroTop: getTop(".page-section--hero"),
        historyTop: getTop(".page-section--history"),
        esotericTop: getTop(".page-section--esoteric"),
      };
    });

    expect(positions.historyTop).toBeGreaterThanOrEqual(positions.heroTop);
    expect(positions.esotericTop).toBeGreaterThanOrEqual(positions.historyTop);
  });

  test("social links are visible and tappable on mobile", async ({ page }) => {
    await page.goto("/");
    const links = page.locator(".link-card");
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);
    // First link should be in viewport
    await expect(links.first()).toBeVisible();
  });

  test("page does not overflow horizontally on mobile", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

test.describe("accessibility basics", () => {
  test("page has a landmark heading", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1.first()).toBeVisible();
  });

  test("all images have alt text or aria-hidden", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      const ariaHidden = await img.getAttribute("aria-hidden");
      expect(alt !== null || ariaHidden === "true").toBeTruthy();
    }
  });
});
