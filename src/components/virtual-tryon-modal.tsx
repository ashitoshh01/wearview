
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Product } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { Camera, CameraOff } from "lucide-react";

interface VirtualTryonModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTryonModal({
  product,
  isOpen,
  onClose,
}: VirtualTryonModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Load the overlay image
  useEffect(() => {
    if (product?.virtualTryOnImage && isOpen) {
      const img = new Image();
      img.src = product.virtualTryOnImage;
      img.onload = () => {
        setOverlayImage(img);
      };
    }
    
    return () => {
      setOverlayImage(null);
    };
  }, [product, isOpen]);
  
  // Handle camera activation
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen]);
  
  // Handle canvas drawing
  useEffect(() => {
    if (isCameraActive && videoRef.current && canvasRef.current && overlayImage) {
      const interval = setInterval(() => {
        drawToCanvas();
      }, 33); // ~30fps
      
      return () => clearInterval(interval);
    }
  }, [isCameraActive, overlayImage]);
  
  const startCamera = async () => {
    setIsProcessing(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true; // Ensure video is muted
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please enable camera access to use virtual try-on",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraActive(false);
  };
  
  const drawToCanvas = () => {
    if (!canvasRef.current || !videoRef.current || !overlayImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video dimensions for proper display
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame with specified opacity
    ctx.globalAlpha = 0.7; // Set opacity to 0.7 (70%)
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0; // Reset opacity for subsequent drawings
    
    // Calculate overlay position (centered in middle of frame)
    const overlayWidth = canvas.width * 0.6; // Scale overlay to 60% of canvas width
    const overlayHeight = (overlayImage.height / overlayImage.width) * overlayWidth;
    
    // Position for different product categories
    let xOffset = 0;
    let yOffset = 0;
    
    if (product?.category === 'accessories') {
      // Position accessories (including sunglasses) on face (higher up)
      xOffset = (canvas.width - overlayWidth) / 2;
      yOffset = canvas.height * 0.2; // Position at upper 20% of screen
    } else if (product?.category === 'jackets') {
      // Special position for jackets to better fit the user
      xOffset = (canvas.width - overlayWidth) / 2;
      yOffset = canvas.height * 0.3; // Position at 30% of screen height
    } else {
      // Default position for shirts, hoodies, etc.
      xOffset = (canvas.width - overlayWidth) / 2;
      yOffset = canvas.height * 0.35;
    }
    
    // Draw overlay
    ctx.drawImage(overlayImage, xOffset, yOffset, overlayWidth, overlayHeight);
    
    // Add instruction text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Adjust yourself to virtually try the item', canvas.width / 2, canvas.height - 15);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Virtual Try-On: {product?.name}</DialogTitle>
          <DialogDescription>
            Use your camera to see how this item looks on you
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: isCameraActive ? 'block' : 'none' }}
          />
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ display: isCameraActive ? 'block' : 'none' }}
          />
          
          {!isCameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <Button onClick={startCamera} disabled={isProcessing}>
                {isProcessing ? (
                  "Accessing camera..."
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" /> Enable Camera
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {isCameraActive && (
            <Button variant="outline" onClick={stopCamera} className="sm:mr-auto">
              <CameraOff className="mr-2 h-4 w-4" /> Turn Off Camera
            </Button>
          )}
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
