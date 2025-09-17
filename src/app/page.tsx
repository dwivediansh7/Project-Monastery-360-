import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Video } from 'lucide-react';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monasteries } from '@/lib/data';
import { Globe } from '@/components/icons/globe';
import { Book } from '@/components/icons/book';
import { Calendar } from '@/components/icons/calendar';

const features = [
  {
    name: '360° Virtual Tours',
    description: "Immerse yourself in the stunning beauty of Sikkim's monasteries from anywhere in the world.",
    icon: Globe,
    href: '/tours',
  },
  {
    name: 'Digital Archives',
    description: 'Explore a rich collection of manuscripts, murals, and historical documents.',
    icon: Book,
    href: '/archive',
  },
  {
    name: 'Cultural Calendar',
    description: 'Stay updated on festivals, rituals, and events happening at the monasteries.',
    icon: Calendar,
    href: '/calendar',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-monastery');
  const monasteryImages = {
    'monastery-1': PlaceHolderImages.find((img) => img.id === 'monastery-1'),
    'monastery-2': PlaceHolderImages.find((img) => img.id === 'monastery-2'),
    'monastery-3': PlaceHolderImages.find((img) => img.id === 'monastery-3'),
  };

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative container mx-auto flex h-full flex-col items-center justify-end pb-12 md:pb-24 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
            A Digital Gateway to Sikkim’s Sacred Heritage
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Explore ancient monasteries, discover rare archives, and experience the vibrant culture of Sikkim like never before.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/tours">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/archive">Visit Archives</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Discover Our Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Everything you need to embark on a digital pilgrimage.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-16 w-16" />
                </div>
                <h3 className="mt-4 font-headline text-xl font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{feature.description}</p>
                <Button variant="link" asChild className="mt-4 text-accent hover:text-accent/90">
                  <Link href={feature.href}>
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="monasteries" className="py-12 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Monasteries</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Begin your journey with these iconic spiritual centers.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {monasteries.map((monastery) => {
              const image = monasteryImages[monastery.imageId as keyof typeof monasteryImages];
              return (
                <Card key={monastery.id} className="overflow-hidden group">
                  <CardHeader className="p-0">
                    {image && (
                      <div className="relative h-60 w-full">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-headline text-2xl">{monastery.name}</CardTitle>
                    <p className="mt-2 text-muted-foreground">{monastery.description}</p>
                    <Button variant="link" asChild className="p-0 mt-4 text-accent hover:text-accent/90">
                      <Link href={`/tours/${monastery.id}`}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
