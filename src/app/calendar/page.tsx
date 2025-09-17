
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { culturalEvents } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { ProperCalendar } from '@/components/ui/proper-calendar';

// Helper function to get image for an event
function getEventImage(imageId?: string) {
  if (!imageId) return null;
  const image = PlaceHolderImages.find(img => img.id === imageId);
  return image?.imageUrl || null;
}

export default function CalendarPage() {
  const sortedEvents = culturalEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Start with the current month by default
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

  // Filter events to show only those in the currently displayed month.
  const filteredEvents = sortedEvents.filter(event => 
    event.date.getFullYear() === displayMonth.getFullYear() &&
    event.date.getMonth() === displayMonth.getMonth()
  );

  const eventDates = sortedEvents.map(event => event.date);
  
  const displayedMonthString = displayMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Cultural Events Calendar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore upcoming cultural and spiritual events at Monastery360. Join us for meditation sessions, 
          festivals, and community gatherings throughout the year.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="lg:order-2">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Calendar</h2>
            <div className="flex justify-center">
              <ProperCalendar
                month={displayMonth}
                onMonthChange={setDisplayMonth}
                eventDates={eventDates}
                className="w-fit"
              />
            </div>
          </div>
        </div>

        <div className="lg:order-1">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Events in {displayedMonthString}
            </h2>
            
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event, index) => {
                  const eventImage = getEventImage(event.imageId);
                  return (
                    <div key={index} className="border rounded-lg overflow-hidden bg-card shadow-sm">
                      {eventImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={eventImage}
                            alt={event.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4 border-l-4 border-primary">
                        <h3 className="font-semibold text-lg text-foreground mb-1">{event.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {event.date.toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <Badge variant="outline" className="mb-2">
                          {event.monastery}
                        </Badge>
                        <p className="text-sm text-foreground">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No events scheduled for {displayedMonthString}
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Check other months to see upcoming cultural events
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
