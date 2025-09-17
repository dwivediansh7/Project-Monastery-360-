
'use client';

import { useState, useEffect, useCallback } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Compass, Wind, Calendar, Info, Users, Activity, MessageSquare, User, RefreshCw, MapPin, Loader2, Volume2 } from 'lucide-react';

import type { Monastery } from '@/types';
import { monasteries } from '@/lib/data';
import { getTravelAdvice, TravelAdviceOutput } from '@/ai/flows/travel-advisor';
import { getAudioForMonasteryDetails } from './actions';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/tours/star-rating';

function ListenButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={disabled || pending} variant="outline" size="sm">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Listen to Details
                </>
            )}
        </Button>
    );
}

export default function MonasteryDetailPage() {
  const params = useParams();
  const { id } = params;

  const [monastery, setMonastery] = useState<Monastery | null | undefined>(undefined);
  const [travelAdvice, setTravelAdvice] = useState<TravelAdviceOutput | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(true);
  const [adviceError, setAdviceError] = useState<string | null>(null);
  const [audioState, setAudioState] = useState<any>({});
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const handleAudioAction = async (formData: FormData) => {
    setIsAudioLoading(true);
    try {
      const result = await getAudioForMonasteryDetails(audioState, formData);
      setAudioState(result);
    } catch (error) {
      console.error('Audio generation failed:', error);
    } finally {
      setIsAudioLoading(false);
    }
  };


  useEffect(() => {
    const foundMonastery = monasteries.find((m) => m.id === id);
    setMonastery(foundMonastery);
  }, [id]);

  const fetchTravelAdvice = useCallback(() => {
    if (monastery) {
      setLoadingAdvice(true);
      setAdviceError(null);
      getTravelAdvice({ monasteryName: monastery.name, location: monastery.location })
        .then(setTravelAdvice)
        .catch(error => {
          console.error(error);
          setAdviceError('The AI advisor is currently unavailable. Please try again.');
          setTravelAdvice(null);
        })
        .finally(() => setLoadingAdvice(false));
    }
  }, [monastery]);

  useEffect(() => {
    fetchTravelAdvice();
  }, [fetchTravelAdvice]);

  if (monastery === undefined) {
    return <div>Loading...</div>;
  }

  if (!monastery) {
    return notFound();
  }

  const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Thank you for your review! (This is a demo and the review will not be saved)');
    (event.target as HTMLFormElement).reset();
  };
  
  const textForAudio = `${monastery.name}. Located in ${monastery.location}. ${monastery.description}`;

  return (
    <div className="bg-background">
      <section className="relative w-full h-[40vh] md:h-[60vh] bg-muted">
        {monastery.tourEmbedUrl ? (
          <iframe
            src={monastery.tourEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <Info className="h-8 w-8 text-muted-foreground" />
            <p className="ml-2 text-muted-foreground">360° Tour not available</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tight">{monastery.name}</h1>
          <p className="mt-2 text-lg text-white/90 flex items-center"><MapPin className="mr-2 h-5 w-5" />{monastery.location}</p>
        </div>
      </section>

      <div className="container mx-auto py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                            <Info className="h-6 w-6 text-primary" />
                            About {monastery.name}
                        </span>
                        <form action={handleAudioAction}>
                            <input type="hidden" name="text" value={textForAudio} />
                            <ListenButton disabled={!textForAudio} />
                        </form>
                    </CardTitle>
                    <CardDescription>{monastery.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {audioState?.error && <p className="text-sm text-destructive mt-2">{audioState.error}</p>}
                    {audioState?.audioDataUri && (
                    <div>
                        <audio controls src={audioState.audioDataUri} className="w-full">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    )}
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Compass className="h-6 w-6 text-primary" />
                  AI Travel Advisor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadingAdvice ? (
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ) : adviceError ? (
                    <div className="text-center text-muted-foreground">
                        <p>{adviceError}</p>
                        <Button onClick={fetchTravelAdvice} variant="secondary" className="mt-4">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retry
                        </Button>
                    </div>
                ) : travelAdvice ? (
                  <>
                    <div className="flex items-start gap-4">
                      <Wind className="h-5 w-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">Weather</h4>
                        <p className="text-muted-foreground">{travelAdvice.weather}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-1" />
                      <div>
                        <h4 className="font-semibold">Best Time to Visit</h4>
                        <p className="text-muted-foreground">{travelAdvice.bestTimeToVisit}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Could not load travel advice.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="aspect-video w-full">
                 <iframe
                    src={monastery.tourEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border:0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  ></iframe>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Tourist Reviews
                </CardTitle>
                <CardDescription>What others are saying about {monastery.name}.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monastery.reviews.map((review) => (
                    <div key={review.id} className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-secondary">
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{review.author}</p>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-muted-foreground mt-1">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-8" />
                <div>
                  <h4 className="font-headline text-xl font-semibold mb-4">Add Your Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <Input name="author" placeholder="Your Name" required />
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Rating</label>
                      <StarRating isEditable />
                    </div>
                    <Textarea name="comment" placeholder="Write your review..." required rows={4}/>
                    <Button type="submit">Submit Review</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-8 lg:mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Tour Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monastery.guides.map(guide => (
                  <div key={guide.id}>
                    <p className="font-semibold">{guide.name}</p>
                    <p className="text-sm text-muted-foreground">Rate: {guide.rate}</p>
                    <p className="text-sm text-muted-foreground">Contact: {guide.contact}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  Things to Do
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monastery.activities.map(activity => (
                  <div key={activity.id}>
                    <p className="font-semibold">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
