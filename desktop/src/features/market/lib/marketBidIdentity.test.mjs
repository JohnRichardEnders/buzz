import assert from "node:assert/strict";
import test from "node:test";

import { resolveMarketBidIdentity } from "./marketBidIdentity.ts";

const BIDDER = "a".repeat(64);
const bid = { actorName: "Fizz envelope", bidderPubkey: BIDDER };

test("market bids use the signed bidder's profile identity", () => {
  assert.deepEqual(
    resolveMarketBidIdentity(bid, {
      [BIDDER]: {
        avatarUrl: "https://relay.example/fizz.png",
        displayName: "Fizz",
        nip05Handle: null,
        ownerPubkey: null,
        isAgent: true,
      },
    }),
    {
      avatarUrl: "https://relay.example/fizz.png",
      displayName: "Fizz",
    },
  );
});

test("market bids fall back to the signed envelope name without a profile", () => {
  assert.deepEqual(resolveMarketBidIdentity(bid), {
    avatarUrl: null,
    displayName: "Fizz envelope",
  });
});
