
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
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
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  
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
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
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
  
  // Handle drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.touches[0].clientX - startPosition.x,
      y: e.touches[0].clientY - startPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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

  // Add event listeners for drag
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Virtual Try-On: {product.name}</DialogTitle>
          <DialogDescription>Position the item by dragging it, and click to adjust opacity</DialogDescription>
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
                muted
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  pointerEvents: 'auto', 
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transform: `translate(${position.x}px, ${position.y}px)`
                }}
                onClick={toggleProductOpacity}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                <img 
                  src={product.imageSrc} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  style={{ 
                    opacity: productOpacity, 
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable="false"
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
      </DialogContent>
    </Dialog>
  );
}
