import { VideoCard } from "@/components/shared/VideoCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getShortVideos, getWalkthroughVideos } from "@/data/videos";

export function VideoCenter() {
  const shorts = getShortVideos();
  const walkthroughs = getWalkthroughVideos();

  return (
    <Section
      id="videos"
      eyebrow="Video center"
      title="Watch LawGPT without leaving the site"
      description="Seven 30-second workflow demos and four longer walkthroughs—embedded here, not on YouTube."
    >
      <Reveal>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          30-second demos
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shorts.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12" delay={1}>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          3-minute walkthroughs
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {walkthroughs.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
