"use client"
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PWAInstallPrompt = () => {
  const { isInstallable, installPWA } = usePWA();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || dismissed) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 bg-background/95 backdrop-blur-sm border-primary/20 md:left-auto md:right-4 md:w-80">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install App</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Add to your home screen for quick access and offline reading.
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={installPWA}
              className="h-8 px-3 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Install
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setDismissed(true)}
              className="h-8 px-2 text-xs"
            >
              Later
            </Button>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDismissed(true)}
          className="h-6 w-6 p-0 shrink-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};