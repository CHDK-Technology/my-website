const express = require("express");
const router = express.Router();

// Add / remove channel IDs here as needed.
const CHANNEL_IDS = [
  "UCsPomiGREIAUpF6zwyaYPig", // Ecosaras
  "UC13sEUHncwMkCPSb8-14usQ", // CHDK Technology Center
];

const FEED_URL = (channelId) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

// Simple in-memory cache so we don't hit YouTube on every page load.
// YouTube's public RSS feed only ever returns the most recent 15 uploads
// per channel, so this is meant to surface *new* videos automatically —
// older / back-catalog videos still need to be added by hand once.
let cache = { data: null, fetchedAt: 0 };
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function extractEntries(xml) {
  const entries = [];
  const entryBlocks = xml.split("<entry>").slice(1);
  for (const block of entryBlocks) {
    const videoId = (block.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const published = (block.match(/<published>(.*?)<\/published>/) || [])[1];
    const channelTitle = (block.match(/<name>(.*?)<\/name>/) || [])[1];
    if (videoId && title) {
      entries.push({
        youtube: videoId,
        title: title.trim(),
        publishedAt: published || null,
        channel: channelTitle || null,
      });
    }
  }
  return entries;
}

async function fetchChannelVideos(channelId) {
  const res = await fetch(FEED_URL(channelId));
  if (!res.ok) {
    throw new Error(`Failed to fetch feed for ${channelId}: ${res.status}`);
  }
  const xml = await res.text();
  return extractEntries(xml);
}

async function getAllVideos() {
  const now = Date.now();
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const results = await Promise.allSettled(CHANNEL_IDS.map(fetchChannelVideos));
  const all = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  // Newest first
  all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  cache = { data: all, fetchedAt: now };
  return all;
}

// GET /api/gallery-videos
router.get("/", async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.json({ videos });
  } catch (err) {
    console.error("gallery-videos error:", err.message);
    res.status(200).json({ videos: [] }); // fail soft, never break the page
  }
});

module.exports = router;
