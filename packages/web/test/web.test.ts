import { describe, expect, it, vi } from "vitest";
import {
  generateQrCode,
  getMyBrowser,
  getMyOperatingSystem,
  textToHtml,
  getMyIp,
  isValidEmail,
  isValidUrl
} from "../src";

describe("web", () => {
  it("parses browser user agent", () => {
    const ua = "Mozilla/5.0 Chrome/122.0.0.0 Safari/537.36";
    const res = getMyBrowser(ua);
    expect(res?.name).toBe("Chrome");
    expect(res?.version).toBe("122.0.0.0");
  });

  it("parses OS user agent with detailed versions", () => {
    // macOS
    const macUa = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15";
    const macRes = getMyOperatingSystem(macUa);
    expect(macRes?.name).toBe("macOS");
    expect(macRes?.version).toBe("10.15.7");

    // iOS
    const iosUa = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15";
    const iosRes = getMyOperatingSystem(iosUa);
    expect(iosRes?.name).toBe("iOS");
    expect(iosRes?.version).toBe("14.6");

    // Windows
    const winUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
    const winRes = getMyOperatingSystem(winUa);
    expect(winRes?.name).toBe("Windows");
    expect(winRes?.version).toBe("10/11");

    // Linux
    expect(getMyOperatingSystem("Mozilla/5.0 (X11; Linux x86_64)")?.name).toBe("Linux");
  });

  it("qrcode and html", () => {
    expect(generateQrCode("abc", 256)).toContain("qrserver");
    expect(textToHtml("<x>")).toBe("&lt;x&gt;");
  });

  it("formats manual IP", () => {
    const res = getMyIp("1.2.3.4");
    expect(res?.ip).toBe("1.2.3.4");
  });

  it("fetches async IP successfully", async () => {
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ip: "192.168.0.1" })
      } as Response)
    );
    vi.stubGlobal("fetch", mockFetch);

    const res = await getMyIp();
    expect(res?.ip).toBe("192.168.0.1");

    vi.unstubAllGlobals();
  });

  it("validates emails correctly", () => {
    expect(isValidEmail("contato@rebimboca.com.br")).toBe(true);
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("test@com")).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
  });

  it("validates URLs correctly with optional protocols", () => {
    expect(isValidUrl("https://rebimboca.tools")).toBe(true);
    expect(isValidUrl("http://localhost:3000/path")).toBe(true);
    expect(isValidUrl("ftp://files.example.com")).toBe(true);
    expect(isValidUrl("ftp://files.example.com", ["https"])).toBe(false);
    expect(isValidUrl("ftp://files.example.com", ["ftp", "https"])).toBe(true);
    expect(isValidUrl("invalid-url")).toBe(false);
    expect(isValidUrl(123 as any)).toBe(false);
  });
});
