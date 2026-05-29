import { describe, expect, it } from "vitest";

import { generateQrCode, getMyBrowser, getMyOperatingSystem, textToHtml } from "../src";

describe("web", () => {
  it("parses user agent", () => {
    const ua = "Mozilla/5.0 Chrome/122.0.0.0 Safari/537.36";
    expect(getMyBrowser(ua)?.name).toBe("Chrome");
    expect(getMyOperatingSystem("Mozilla/5.0 (X11; Linux x86_64)")?.name).toBe("Linux");
  });
  it("qrcode and html", () => {
    expect(generateQrCode("abc", 256)).toContain("qrserver");
    expect(textToHtml("<x>")).toBe("&lt;x&gt;");
  });
});
