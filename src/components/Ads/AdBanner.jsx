import { useEffect } from 'react';

export default function AdBanner({ format = 'horizontal', className = '' }) {
  useEffect(() => {
    // Load Google AdSense script if it hasn't been loaded yet
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.adClient = 'ca-pub-9019285095400516';
      document.head.appendChild(script);
    }

    // Initialize ads when the script is loaded
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Get the ad slot based on format
  const getAdSlot = () => {
    switch (format) {
      case 'horizontal':
        return '2422219013';
      case 'vertical':
        return '1961718854';
      default:
        return '2422219013'; // Default to horizontal ad slot
    }
  };

  // Define ad sizes based on format
  const adSizes = {
    horizontal: { width: '728px', height: '90px' },
    vertical: { width: '160px', height: '600px' },
    rectangle: { width: '300px', height: '250px' },
    responsive: { width: '100%', height: 'auto', minHeight: '100px' }
  };

  const adSize = adSizes[format] || adSizes.responsive;
  
  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adSize}
        data-ad-client="ca-pub-9019285095400516"
        data-ad-slot={getAdSlot()}
        data-ad-format={format === 'responsive' ? 'auto' : format}
        data-full-width-responsive={format === 'responsive' ? 'true' : 'false'}
      />
      <small>Advertisement</small>
    </div>
  );
}