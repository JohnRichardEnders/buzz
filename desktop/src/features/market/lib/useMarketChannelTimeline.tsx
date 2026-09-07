import * as React from "react";

import { isChannelCreatedSystemMessage } from "@/features/channels/ui/ChannelPane.helpers";
import { useMarketChannel } from "@/features/market/lib/MarketChannelContext";
import {
  marketTimelineAnchor,
  useMarketTimelineMessages,
} from "@/features/market/lib/marketTimeline";
import { MarketChannelIntro } from "@/features/market/ui/MarketChannelIntro";
import type { TimelineMessage } from "@/features/messages/types";
import type { UserProfileLookup } from "@/features/profile/lib/identity";

export function useMarketChannelTimeline(
  messages: TimelineMessage[],
  profiles?: UserProfileLookup,
) {
  const projection = useMarketChannel();
  const timelineMessages = useMarketTimelineMessages(messages);
  const anchor = React.useMemo(
    () => marketTimelineAnchor(timelineMessages, isChannelCreatedSystemMessage),
    [timelineMessages],
  );
  const messageFooters = React.useMemo(
    () =>
      anchor
        ? {
            [anchor.id]: (
              <MarketChannelIntro
                anchorMessage={anchor}
                bids={projection?.bids ?? []}
                profiles={profiles}
              />
            ),
          }
        : undefined,
    [anchor, profiles, projection?.bids],
  );

  return {
    isMarketChannel: projection !== null,
    messageFooters,
    messages: timelineMessages,
  };
}
