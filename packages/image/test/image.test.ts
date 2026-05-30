import { describe, expect, it } from "vitest";
import { generateImage } from "../src";

describe("image", () => {
  it("generates solid data url placeholders", () => {
    const url = generateImage({ width: 100, height: 50, background: "#ff0000", color: "#ffffff" });
    expect(url).toContain("data:image/svg+xml");
    const svg = decodeURIComponent(url!.replace("data:image/svg+xml;utf8,", ""));
    expect(svg).toContain('fill="#ff0000"');
    expect(svg).toContain('fill="#ffffff"');
  });

  it("generates linear gradient backgrounds", () => {
    const url = generateImage({
      width: 200,
      height: 200,
      gradient: { startColor: "#000000", endColor: "#ffffff", angle: 90 }
    });
    const svg = decodeURIComponent(url!.replace("data:image/svg+xml;utf8,", ""));
    expect(svg).toContain("<linearGradient");
    expect(svg).toContain('stop-color="#000000"');
    expect(svg).toContain('stop-color="#ffffff"');
    expect(svg).toContain('fill="url(#image_grad)"');
  });

  it("generates avatar initials with custom scaling", () => {
    const url = generateImage({
      width: 100,
      height: 100,
      avatar: { initials: "ab", fontScale: 0.4 }
    });
    const svg = decodeURIComponent(url!.replace("data:image/svg+xml;utf8,", ""));
    expect(svg).toContain("AB");
    expect(svg).toContain('font-size="40"');
  });

  it("escapes special characters to prevent XML injection", () => {
    const url = generateImage({
      width: 100,
      height: 100,
      text: '"></rect><script>alert(1)</script>'
    });
    const svg = decodeURIComponent(url!.replace("data:image/svg+xml;utf8,", ""));
    expect(svg).not.toContain('"></rect><script>');
    expect(svg).toContain("&lt;script&gt;");
  });

  it("returns null for invalid", () => {
    expect(generateImage({ width: 0, height: 10 })).toBeNull();
  });
});
