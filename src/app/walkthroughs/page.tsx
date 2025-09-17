
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { monasteries } from '@/lib/data';
import type { Monastery } from '@/types';

export default function WalkthroughsPage() {
  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Narrated Walkthroughs</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience guided tours with audio narration in English.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {monasteries.filter(m => m.walkthroughs && m.walkthroughs.length > 0).map((monastery: Monastery) => {
              const walkthrough = monastery.walkthroughs?.[0];

              return (
                <Card key={monastery.id} className="overflow-hidden group flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{monastery.name}</CardTitle>
                    <CardDescription>{monastery.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    {walkthrough ? (
                      <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={walkthrough.videoUrl}
                          title={`${monastery.name} Walkthrough`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">No walkthrough available.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
