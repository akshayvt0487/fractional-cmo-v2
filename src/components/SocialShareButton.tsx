"use client";

import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface SocialShareButtonProps {
  title: string;
  url: string;
  description?: string;
  size?: 'sm' | 'default';
  variant?: 'outline' | 'default' | 'secondary' | 'ghost';
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({
  title,
  url,
  description = '',
  size = 'sm',
  variant = 'outline'
}) => {
  const [copied, setCopied] = useState(false);
  
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = url.startsWith('http') ? url : `${origin}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2  border-gray-300">
          <Share2 className="h-4 w-4 bg-white" />
          Share this article
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-white">
        <DropdownMenuItem 
          onClick={() => handleShare('facebook')}
          className="cursor-pointer bg-white"
        >
          <Facebook className="h-4 w-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('twitter')}
          className="cursor-pointer"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('linkedin')}
          className="cursor-pointer"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleCopyLink}
          className="cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-600" />
          ) : (
            <Link className="h-4 w-4 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShareButton;