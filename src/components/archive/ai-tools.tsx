
'use client';

import { Loader2, Cloud, Upload, Search } from 'lucide-react';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { getImageAnalysis } from '@/app/archive/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

function SubmitButton({ icon: Icon, text, pendingText, isLoading }: { icon: React.ElementType; text: string; pendingText?: string; isLoading: boolean; }) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && <Icon className="mr-2 h-4 w-4" />}
      {isLoading ? (pendingText || 'Processing...') : text}
    </Button>
  );
}

function CuriousCloud() {
  const [analysis, setAnalysis] = useState<{ description?: string; googleSearchQuery?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const result = await getImageAnalysis({}, formData);
      if (result.description) {
        setAnalysis({
          description: result.description,
          googleSearchQuery: result.googleSearchQuery
        });
        // Clear the preview and inputs after successful analysis
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (hiddenInputRef.current) hiddenInputRef.current.value = '';
      }
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreview(dataUri);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = dataUri;
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFormSubmit = (formData: FormData) => {
    handleSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Curious Cloud
        </CardTitle>
        <CardDescription>Have a photo of a place, manuscript, or artifact? Upload it to learn more.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleFormSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="image-upload">Image Upload</Label>
            <Input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              required
            />
            <input type="hidden" name="photoDataUri" ref={hiddenInputRef} />
          </div>

          {preview && (
            <div className="relative mt-4 w-full h-48 rounded-md overflow-hidden border">
              <Image src={preview} alt="Image preview" fill className="object-contain" />
            </div>
          )}
          
          <SubmitButton icon={Upload} text="Analyze Image" pendingText="Analyzing..." isLoading={isLoading} />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </form>

        {analysis?.description && (
          <div className="mt-6 rounded-lg border bg-secondary/30 p-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">AI Analysis:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.description}</p>
            </div>
            {analysis.googleSearchQuery && (
              <div>
                <Button asChild variant="outline">
                  <Link href={`https://www.google.com/search?q=${encodeURIComponent(analysis.googleSearchQuery)}`} target="_blank" rel="noopener noreferrer">
                    <Search className="mr-2 h-4 w-4" />
                    Search on Google
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


export function AiTools() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <CuriousCloud />
    </div>
  );
}
