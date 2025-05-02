
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { Camera, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VirtualTryonModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTryonModal({ product, isOpen, onClose }: VirtualTryonModalProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const [productOpacity, setProductOpacity] = useState(0.7);
  
  const handleStartCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: isMobile ? "environment" : "user"
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setStreamActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setStreamActive(false);
    }
  };
  
  // Toggle product opacity on click
  const toggleProductOpacity = () => {
    setProductOpacity(productOpacity === 0.7 ? 0.4 : 0.7);
  };
  
  // Clean up camera stream when dialog closes
  useEffect(() => {
    if (!isOpen && streamActive) {
      handleStopCamera();
    }
    
    return () => {
      if (streamActive) {
        handleStopCamera();
      }
    };
  }, [isOpen, streamActive]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Virtual Try-On: {product.name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="relative aspect-video bg-black rounded-md overflow-hidden">
          {!cameraActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button onClick={handleStartCamera}>
                <Camera className="mr-2 h-4 w-4" /> Start Camera
              </Button>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                onClick={toggleProductOpacity}
                style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              >
                <img 
                  src={product.imageSrc} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  style={{ opacity: productOpacity }}
                />
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                className="absolute bottom-4 right-4"
                onClick={handleStopCamera}
              >
                Stop Camera
              </Button>
            </>
          )}
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Click on the product to adjust opacity. Click and drag to reposition.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
