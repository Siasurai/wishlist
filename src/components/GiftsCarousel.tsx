import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Gift } from "@/types";
import { GiftCard } from "@/components/GiftCard";

type Item = {
  gift: Gift;
  reservedCount: number;
};

export function GiftsCarousel({
  items,
  onReserve,
}: {
  items: Item[];
  onReserve: (gift: Gift) => void;
  autoplay?: boolean;
}) {
  return (
    <Carousel
      opts={{ align: "start", loop: false }}
      className="wishlist-carousel relative"
    >
      <CarouselContent className="-ml-4">
        {items.map(({ gift, reservedCount }) => (
          <CarouselItem
            key={gift.id}
            className="pl-4 basis-full sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
          >
            <GiftCard
              gift={gift}
              reservedCount={reservedCount}
              onReserve={onReserve}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
