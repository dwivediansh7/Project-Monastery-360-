'use client';

import { Monastery } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

type MapSidebarProps = {
  monasteries: Monastery[];
  selectedMonastery: Monastery;
  onSelectMonastery: (monastery: Monastery) => void;
};

export function MapSidebar({
  monasteries,
  selectedMonastery,
  onSelectMonastery,
}: MapSidebarProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Locations</CardTitle>
        <CardDescription>
          Select a monastery to see details and attractions.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col">
        <ScrollArea className="flex-grow">
          <div className="space-y-2 p-6 pt-0">
            {monasteries.map((monastery) => (
              <Button
                key={monastery.id}
                variant="ghost"
                className={cn(
                  'w-full justify-start h-auto p-3 text-left',
                  selectedMonastery.id === monastery.id && 'bg-secondary'
                )}
                onClick={() => onSelectMonastery(monastery)}
              >
                <div>
                  <p className="font-semibold">{monastery.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {monastery.location}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <Mountain className="mr-2 h-5 w-5 text-primary" />
            Nearby Attractions
          </h3>
          {selectedMonastery.attractions?.length > 0 ? (
            <div className="space-y-3">
              {selectedMonastery.attractions.map((attraction) => (
                <div key={attraction.id}>
                  <p className="font-semibold">{attraction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {attraction.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No attractions listed for this location.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
