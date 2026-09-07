import type { MarketBid } from "@/features/market/lib/marketProtocol";
import type { UserProfileLookup } from "@/features/profile/lib/identity";
import { normalizePubkey } from "@/shared/lib/pubkey";

export function resolveMarketBidIdentity(
  bid: Pick<MarketBid, "actorName" | "bidderPubkey">,
  profiles?: UserProfileLookup,
) {
  const profile = profiles?.[normalizePubkey(bid.bidderPubkey)];
  return {
    avatarUrl: profile?.avatarUrl ?? null,
    displayName: profile?.displayName?.trim() || bid.actorName,
  };
}
