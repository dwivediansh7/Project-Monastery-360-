'use client';

import { useState } from 'react';
import type { Monastery } from '@/types';
import { monasteries } from '@/lib/data';
import { MapSidebar } from '@/components/map/map-sidebar';

export default function MapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery>(
    monasteries[0]
  );

  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
            Interactive Map
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore Sikkim&apos;s monasteries, geo-tagged with travel routes and
            nearby attractions.
          </p>
        </div>
      </section>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <MapSidebar
              monasteries={monasteries}
              selectedMonastery={selectedMonastery}
              onSelectMonastery={setSelectedMonastery}
            />
          </div>
          <div className="md:w-2/3">
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={selectedMonastery.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d454157.9892690962!2d88.24349372861295!3d27.53483321528624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0x73d622313337904a!2sSikkim!5e0!3m2!1sen!2sin!4v1758070900138!5m2!1sen!2sin'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                key={selectedMonastery.id}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
