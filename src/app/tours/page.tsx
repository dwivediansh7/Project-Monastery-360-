
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { monasteries } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ToursPage() {
  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Virtual Tours</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Step inside Sikkim&apos;s most sacred spaces. Choose a monastery to begin your virtual pilgrimage.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {monasteries.map((monastery) => {
              const image = PlaceHolderImages.find((img) => img.id === monastery.imageId);
              return (
                <Card key={monastery.id} className="overflow-hidden group flex flex-col">
                  <CardHeader className="p-0">
                    {image && (
                      <div className="relative h-60 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-2xl">{monastery.name}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{monastery.description}</CardDescription>
                    <Button asChild className="mt-4 w-full">
                      <Link href={`/tours/${monastery.id}`}>
                        Take the Tour <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
