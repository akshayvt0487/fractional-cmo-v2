'use client';

import Script from 'next/script';

export default function GHLWidget() {
  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="690c5fb533e992e4708471d5"
        strategy="lazyOnload"
        onLoad={() => {
          console.log('GHL Widget loaded successfully');
        }}
      />
    </>
  );
}