import Image from 'next/image';
import Link from 'next/link';
import type { ArchiveDocument } from '@/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type DocumentCardProps = {
  document: ArchiveDocument;
};

export function DocumentCard({ document }: DocumentCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === document.imageId);

  return (
    <Link href={`/archive/${document.id}`} className="group h-full">
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        {image && (
          <div className="relative h-48 w-full bg-muted">
            <Image src={image.imageUrl} alt={image.description} fill className="object-cover" data-ai-hint={image.imageHint} />
          </div>
        )}
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">
            {document.type}
          </Badge>
          <CardTitle className="font-headline text-xl">{document.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <CardDescription>{document.description}</CardDescription>
          <div className="flex items-center mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            View Document <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
