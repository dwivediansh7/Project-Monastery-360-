
'use client';

import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, Sparkles, FileText, Volume2 } from 'lucide-react';

import { archiveDocuments } from '@/lib/data';
import { getSummary, getAudioSummary } from './actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

function ReadAloudButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={disabled || pending} variant="outline">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Synthesizing...
                </>
            ) : (
                <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    Read Summary
                </>
            )}
        </Button>
    );
}

export default function DocumentDetailPage() {
  const params = useParams();
  const { id } = params;

  const document = archiveDocuments.find((doc) => doc.id === id);
  const [summaryState, setSummaryState] = useState<any>({});
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [audioState, setAudioState] = useState<any>({});
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const handleSummaryAction = async (formData: FormData) => {
    setIsSummaryLoading(true);
    try {
      const result = await getSummary(summaryState, formData);
      setSummaryState(result);
    } catch (error) {
      console.error('Summary generation failed:', error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleAudioAction = async (formData: FormData) => {
    setIsAudioLoading(true);
    try {
      const result = await getAudioSummary(audioState, formData);
      setAudioState(result);
    } catch (error) {
      console.error('Audio generation failed:', error);
    } finally {
      setIsAudioLoading(false);
    }
  };


  if (!document) {
    notFound();
  }

  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto">
          <CardTitle className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">{document.title}</CardTitle>
          <CardDescription className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {document.description}
          </CardDescription>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full">
                {document.url ? (
                  <iframe src={document.url} width="100%" height="100%" allow="fullscreen"></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                    <p>Document preview not available.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <aside className="space-y-8 lg:mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Tools
                </CardTitle>
                <CardDescription>Generate a summary and listen to it.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <form action={handleSummaryAction}>
                      <input type="hidden" name="documentContent" value={document.content} />
                      <SubmitButton />
                      {summaryState?.error && <p className="text-sm text-destructive mt-2">{summaryState.error}</p>}
                    </form>

                    {summaryState?.summary && (
                        <form action={handleAudioAction}>
                           <input type="hidden" name="summary" value={summaryState.summary} />
                           <ReadAloudButton disabled={!summaryState.summary} />
                           {audioState?.error && <p className="text-sm text-destructive mt-2">{audioState.error}</p>}
                        </form>
                    )}
                </div>

                {summaryState?.summary && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Summary:</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summaryState.summary}</p>
                      </div>

                      {audioState?.audioDataUri && (
                        <div>
                            <h4 className="font-semibold mb-2">Audio Summary:</h4>
                            <audio controls src={audioState.audioDataUri} className="w-full">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
