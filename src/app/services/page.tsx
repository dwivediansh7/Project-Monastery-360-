
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { localServices } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Car, Users } from 'lucide-react';
import { StarRating } from '@/components/tours/star-rating';

export default function ServicesPage() {
  const transportServices = localServices.filter(s => s.type === 'Transport');
  const tourAgencies = localServices.filter(s => s.type === 'Tour Agency');

  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Local Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Connect with local transport and tour operators to plan your trip.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="font-headline text-3xl font-bold mb-8 flex items-center">
              <Car className="mr-4 h-8 w-8 text-primary" />
              Transportation
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {transportServices.map(service => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Phone className="h-4 w-4" />
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <StarRating rating={service.rating} />
                         <span className="text-xs text-muted-foreground">({service.rating})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-headline text-3xl font-bold mb-8 flex items-center">
              <Users className="mr-4 h-8 w-8 text-primary" />
              Tour Agencies
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tourAgencies.map(service => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                     <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Mail className="h-4 w-4" />
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <StarRating rating={service.rating} />
                         <span className="text-xs text-muted-foreground">({service.rating})</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
