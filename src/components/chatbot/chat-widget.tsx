'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { sendMessage } from '@/app/chatbot/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: { text: string }[];
};

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" size="icon" disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get('message') as string;
    if (!message.trim()) return;

    // Add user message to history
    const userMessage: Message = {
      role: 'user',
      content: [{ text: message }]
    };
    setHistory(prev => [...prev, userMessage]);
    
    // Clear input
    if (formRef.current) {
      formRef.current.reset();
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create FormData with current history
      const formDataWithHistory = new FormData();
      formDataWithHistory.append('message', message);
      formDataWithHistory.append('history', JSON.stringify(history));
      
      const result = await sendMessage({}, formDataWithHistory);
      if (result.response) {
        setHistory(prev => [
          ...prev, 
          { role: 'model', content: [{ text: result.response! }] }
        ]);
      }
      if (result.error) {
        setError(result.error);
        console.error(result.error);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setIsLoading(false);
    }
    
    inputRef.current?.focus();
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);

  // Remove the old handleFormSubmit function - already replaced above

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-lg flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
            <Bot />
            Sikkim Guide
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {history.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-end gap-2',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'model' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {msg.content[0].text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form ref={formRef} action={handleSubmit} className="flex w-full items-center space-x-2">
          <Input ref={inputRef} name="message" placeholder="Type a message..." autoComplete="off" />
          <SubmitButton isLoading={isLoading} />
        </form>
      </CardFooter>
      {error && <p className="text-xs text-destructive px-6 pb-2">{error}</p>}
    </Card>
  );
}
