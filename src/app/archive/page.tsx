import { Search } from 'lucide-react';
import { AiTools } from '@/components/archive/ai-tools';
import { DocumentCard } from '@/components/archive/document-card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { archiveDocuments } from '@/lib/data';

export default function ArchivePage() {
  return (
    <>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Digital Archive</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A curated collection of Sikkim&apos;s historical and cultural treasures.
          </p>
          <div className="relative mt-8 max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search manuscripts, murals, documents..." className="w-full pl-10 h-12 text-base" />
          </div>
        </div>
      </section>

      <section id="documents" className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="font-headline text-3xl font-bold">Browse the Collection</h2>
            <p className="mt-2 text-muted-foreground">A selection of items from our digital archive.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {archiveDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      </section>

      <Separator className="container mx-auto my-8 max-w-4xl" />

      <section id="ai-tools" className="py-12 md:py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">AI-Powered Content Discovery</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Leverage artificial intelligence to summarize and categorize archival materials with ease.
            </p>
          </div>
          <AiTools />
        </div>
      </section>
    </>
  );
}
