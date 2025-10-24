import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CitationProps {
  source: string;
  url: string;
  title: string;
  date?: string;
  inline?: boolean;
}

const Citation: React.FC<CitationProps> = ({ source, url, title, date, inline = false }) => {
  if (inline) {
    return (
      <sup className="ml-1">
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0 text-xs text-primary hover:text-primary-foreground hover:bg-primary rounded px-1"
          asChild
        >
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="no-underline"
            title={`Source: ${title} - ${source}${date ? ` (${date})` : ''}`}
          >
            <ExternalLink className="h-2 w-2 mr-1" />
            Source
          </a>
        </Button>
      </sup>
    );
  }

  return (
    <div className="border-l-4 border-primary/20 pl-4 py-2 my-4 bg-muted/30 rounded-r">
      <div className="text-sm">
        <div className="font-medium text-foreground mb-1">{title}</div>
        <div className="text-muted-foreground mb-2">
          {source}{date && ` • ${date}`}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-2"
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3" />
            View Source
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Citation;