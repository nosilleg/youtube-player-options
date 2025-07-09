import { describe, it, expect } from "vitest";
import { forTestingOnly } from "./script.mjs";

const { extractVideoId, extractPlaylistId } = forTestingOnly;

describe("extractVideoId", () => {
  it("should extract video ID from a standard YouTube URL", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const result = extractVideoId(url);
    expect(result).toBe("dQw4w9WgXcQ");
  });

  it("should return null for an invalid URL", () => {
    const url = "https://invalid.url";
    const result = extractVideoId(url);
    expect(result).toBeNull();
  });

  it("should handle URLs with additional parameters", () => {
    const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s";
    const result = extractVideoId(url);
    expect(result).toBe("dQw4w9WgXcQ");
  });
});

describe("extractPlaylistId", () => {
  it("should extract playlist ID from a standard YouTube playlist URL", () => {
    const url = "https://www.youtube.com/playlist?list=PLdQw4w9WgXcQ";
    const result = extractPlaylistId(url);
    expect(result).toBe("PLdQw4w9WgXcQ");
  });

  it("should return null for an invalid playlist URL", () => {
    const url = "https://invalid.url";
    const result = extractPlaylistId(url);
    expect(result).toBeNull();
  });

  it("should handle URLs with additional parameters", () => {
    const url = "https://www.youtube.com/playlist?list=PLdQw4w9WgXcQ&index=1";
    const result = extractPlaylistId(url);
    expect(result).toBe("PLdQw4w9WgXcQ");
  });
});
