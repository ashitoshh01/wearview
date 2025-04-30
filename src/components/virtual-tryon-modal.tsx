
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";

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
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
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
    
    // Set canvas dimensions
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    // Draw video frame
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Calculate overlay position (centered in middle of frame)
    const overlayWidth = canvas.width * 0.5; // Scale overlay to 50% of canvas width
    const overlayHeight = (overlayImage.height / overlayImage.width) * overlayWidth;
    
    const x = (canvas.width - overlayWidth) / 2;
    const y = (canvas.height - overlayHeight) / 2;
    
    // Draw overlay
    ctx.drawImage(overlayImage, x, y, overlayWidth, overlayHeight);
    
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
        </DialogHeader>
        
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover hidden"
          />
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {!isCameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Button onClick={startCamera}>Enable Camera</Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
