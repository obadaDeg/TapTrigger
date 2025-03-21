import { useEffect, useRef } from "react";

export default function AdBanner({ format = "horizontal", className = "" }) {
  const adRef = useRef(null);

  useEffect(() => {
    // Make sure the container has dimensions before loading ads
    if (!adRef.current) return;

    // Define a specific timeout to ensure the DOM is fully rendered
    const timer = setTimeout(() => {
      try {
        // Make sure adsbygoogle is defined
        if (window.adsbygoogle === undefined) {
          window.adsbygoogle = [];
        }
        
        // Push the ad
        window.adsbygoogle.push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 1000); // Increased timeout to ensure component is fully rendered

    return () => clearTimeout(timer);
  }, [format]); // Re-run when format changes

  // Define ad sizes based on format
  const adSizes = {
    horizontal: { width: 728, height: 90 },
    vertical: { width: 160, height: 600 },
    rectangle: { width: 300, height: 250 },
    responsive: { width: "100%", height: "auto", minHeight: "100px" },
  };

  // Get specific dimensions for the current format
  const adSize = adSizes[format] || adSizes.horizontal;
  
  // Get the ad slot based on format
  const getAdSlot = () => {
    switch (format) {
      case "horizontal":
        return "2422219013";
      case "vertical":
        return "1961718854";
      case "rectangle":
        return "2422219013";
      default:
        return "2422219013";
    }
  };

  // Calculate inline style based on format
  const getAdStyle = () => {
    if (format === "responsive") {
      return {
        display: "block",
        width: "100%",
        height: "auto",
        minHeight: "100px"
      };
    }
    
    return {
      display: "block",
      width: `${adSize.width}px`,
      height: `${adSize.height}px`
    };
  };

  return (
    <div 
      className={`ad-container ${className}`}
      style={{ 
        overflow: "hidden",
        width: format === "responsive" ? "100%" : `${adSize.width}px`,
        minHeight: `${format === "responsive" ? "100px" : adSize.height}px`,
        margin: "0 auto"
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-9019285095400516"
        data-ad-slot={getAdSlot()}
        data-adtest="on"
        data-ad-format={format === "responsive" ? "auto" : ""}
        data-full-width-responsive={format === "responsive" ? "true" : "false"}
      />
      <small>Advertisement</small>
    </div>
  );
}