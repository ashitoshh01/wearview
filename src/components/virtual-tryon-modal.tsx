
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
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

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
  const [faceDetector, setFaceDetector] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const [isFaceTracking, setIsFaceTracking] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const animationFrameId = useRef<number | null>(null);
  const { toast } = useToast();
  
  // Load TensorFlow.js and face landmarks detection model when the component mounts
  useEffect(() => {
    async function loadModels() {
      if (isOpen && !faceDetector) {
        setIsProcessing(true);
        try {
          // Load TensorFlow.js
          await tf.setBackend('webgl');
          await tf.ready();
          console.log("TensorFlow.js loaded successfully");
          
          // Load Face Landmarks Detection model
          const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
          const detectorConfig = {
            runtime: 'tfjs',
            refineLandmarks: true,
            maxFaces: 1,
          } as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig;
          
          console.log("Creating face detector with config:", detectorConfig);
          const detector = await faceLandmarksDetection.createDetector(
            model, detectorConfig
          );
          console.log("Face detector created successfully");
          
          setFaceDetector(detector);
          setIsFaceTracking(true);
          toast({
            title: "Face tracking initialized",
            description: "The overlay will now follow your face movements",
          });
        } catch (error) {
          console.error("Error loading face detection model:", error);
          toast({
            title: "Face tracking failed",
            description: "Could not initialize face tracking. Try-on will still work with fixed positioning.",
            variant: "destructive",
          });
          setIsFaceTracking(false);
        } finally {
          setIsProcessing(false);
        }
      }
    }
    
    loadModels();
    
    return () => {
      // Cleanup
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isOpen, toast]);
  
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
  
  // Handle canvas drawing with face detection
  useEffect(() => {
    let isActive = true;
    
    const detectAndDraw = async () => {
      if (!isActive || !isCameraActive || !videoRef.current || !canvasRef.current || !overlayImage || !faceDetector) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        return;
      }
      
      try {
        // Detect faces
        const faces = await faceDetector.estimateFaces(videoRef.current);
        console.log("Face detection result:", faces.length > 0 ? "Face detected" : "No face detected", faces);
        
        // Update face detected state
        setFaceDetected(faces.length > 0);
        
        // Draw the frame with face tracking if available
        drawToCanvas(faces);
        
        // Continue the detection loop
        animationFrameId.current = requestAnimationFrame(detectAndDraw);
      } catch (error) {
        console.error('Face detection error:', error);
        // Continue the loop even if there's an error
        animationFrameId.current = requestAnimationFrame(detectAndDraw);
      }
    };
    
    const drawWithoutTracking = () => {
      if (!isActive || !isCameraActive || !videoRef.current || !canvasRef.current || !overlayImage) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        return;
      }
      
      // Draw without face tracking
      drawToCanvas([]);
      
      // Continue the loop
      animationFrameId.current = requestAnimationFrame(drawWithoutTracking);
    };
    
    // Start the appropriate drawing loop
    if (isFaceTracking && faceDetector) {
      console.log("Starting face tracking detection loop");
      detectAndDraw();
    } else if (isCameraActive && overlayImage) {
      console.log("Starting non-tracking drawing loop");
      drawWithoutTracking();
    }
    
    return () => {
      isActive = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isCameraActive, overlayImage, faceDetector, isFaceTracking]);
  
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
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              console.log("Video playing, camera activated");
              setStream(mediaStream);
              setIsCameraActive(true);
              setIsProcessing(false);
            }).catch(err => {
              console.error("Error playing video:", err);
              setIsProcessing(false);
            });
          }
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please enable camera access to use virtual try-on",
        variant: "destructive",
      });
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
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };
  
  const drawToCanvas = (faces: faceLandmarksDetection.Face[] = []) => {
    if (!canvasRef.current || !videoRef.current || !overlayImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video dimensions for proper display
    if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
    } else {
      canvas.width = 640;
      canvas.height = 480;
    }
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame with specified opacity
    ctx.globalAlpha = 0.7; // Set opacity to 0.7 (70%)
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0; // Reset opacity for subsequent drawings
    
    // Calculate overlay position based on product category
    let xOffset = 0;
    let yOffset = 0;
    let overlayWidth = canvas.width * 0.6; // Scale overlay to 60% of canvas width
    let overlayHeight = (overlayImage.height / overlayImage.width) * overlayWidth;
    let shouldApplyTracking = false;
    
    // Check if we have face tracking and there's at least one face detected
    if (faces.length > 0) {
      const face = faces[0]; // Use the first face detected
      
      // Extract all keypoints for debugging
      const allKeypoints = face.keypoints;
      const keypointNames = allKeypoints.map(kp => kp.name);
      console.log("Available keypoints:", keypointNames);
      
      // Handle different product categories
      if (product?.category === 'accessories') {
        // For sunglasses, position based on eyes
        if (product?.name === "Sunglasses") {
          // Find eye landmarks
          const leftEye = face.keypoints.find(p => p.name === "leftEye");
          const rightEye = face.keypoints.find(p => p.name === "rightEye");
          
          if (!leftEye || !rightEye) {
            // If eye landmarks not available by name, try to find by index
            // MediaPipe face mesh has eyes around these indices
            const allPoints = face.keypoints;
            if (allPoints.length > 100) {
              // Approximate eye positions from other landmarks
              const leftEyeRegion = allPoints.filter((_, idx) => idx >= 130 && idx <= 150);
              const rightEyeRegion = allPoints.filter((_, idx) => idx >= 360 && idx <= 380);
              
              if (leftEyeRegion.length > 0 && rightEyeRegion.length > 0) {
                // Create synthetic eye points from averages
                const leftEyePoint = { 
                  x: leftEyeRegion.reduce((sum, p) => sum + p.x, 0) / leftEyeRegion.length,
                  y: leftEyeRegion.reduce((sum, p) => sum + p.y, 0) / leftEyeRegion.length,
                  z: leftEyeRegion.reduce((sum, p) => sum + (p.z || 0), 0) / leftEyeRegion.length,
                };
                
                const rightEyePoint = { 
                  x: rightEyeRegion.reduce((sum, p) => sum + p.x, 0) / rightEyeRegion.length,
                  y: rightEyeRegion.reduce((sum, p) => sum + p.y, 0) / rightEyeRegion.length,
                  z: rightEyeRegion.reduce((sum, p) => sum + (p.z || 0), 0) / rightEyeRegion.length,
                };
                
                shouldApplyTracking = true;
                console.log("Using synthetic eye points", leftEyePoint, rightEyePoint);
                
                // Calculate the center point between eyes
                const eyeDistance = Math.sqrt(
                  Math.pow(rightEyePoint.x - leftEyePoint.x, 2) + 
                  Math.pow(rightEyePoint.y - leftEyePoint.y, 2)
                );
                
                // Size the sunglasses based on the distance between eyes
                overlayWidth = eyeDistance * 2.5; // Adjust this multiplier as needed
                overlayHeight = (overlayImage.height / overlayImage.width) * overlayWidth;
                
                // Position overlay centered between the eyes, slightly higher
                xOffset = (leftEyePoint.x + rightEyePoint.x) / 2 - overlayWidth / 2;
                yOffset = (leftEyePoint.y + rightEyePoint.y) / 2 - overlayHeight * 0.6;
                
                // Adjust rotation if needed based on eye positions
                const angle = Math.atan2(rightEyePoint.y - leftEyePoint.y, rightEyePoint.x - leftEyePoint.x);
                
                // Apply rotation if angle is not zero
                if (angle !== 0) {
                  ctx.save();
                  ctx.translate(xOffset + overlayWidth / 2, yOffset + overlayHeight / 2);
                  ctx.rotate(angle);
                  ctx.drawImage(overlayImage, -overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
                  ctx.restore();
                  
                  // Skip the regular drawing since we've already drawn with rotation
                  shouldApplyTracking = false;
                }
              }
            }
          } else {
            // Use the detected eye landmarks
            shouldApplyTracking = true;
            console.log("Using detected eye landmarks", leftEye, rightEye);
            
            // Calculate the center point between eyes
            const eyeDistance = Math.sqrt(
              Math.pow(rightEye.x - leftEye.x, 2) + 
              Math.pow(rightEye.y - leftEye.y, 2)
            );
            
            // Size the sunglasses based on the distance between eyes
            overlayWidth = eyeDistance * 2.5; // Adjust this multiplier as needed
            overlayHeight = (overlayImage.height / overlayImage.width) * overlayWidth;
            
            // Position overlay centered between the eyes, slightly higher
            xOffset = (leftEye.x + rightEye.x) / 2 - overlayWidth / 2;
            yOffset = (leftEye.y + rightEye.y) / 2 - overlayHeight * 0.6;
            
            // Adjust rotation if needed based on eye positions
            const angle = Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
            
            // Apply rotation if angle is not zero
            if (angle !== 0) {
              ctx.save();
              ctx.translate(xOffset + overlayWidth / 2, yOffset + overlayHeight / 2);
              ctx.rotate(angle);
              ctx.drawImage(overlayImage, -overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
              ctx.restore();
              
              // Skip the regular drawing since we've already drawn with rotation
              shouldApplyTracking = false;
            }
          }
        } else {
          // For other accessories, adjust based on face position
          const faceBox = face.box;
          if (faceBox) {
            shouldApplyTracking = true;
            
            // Position centered on face
            xOffset = faceBox.xMin + (faceBox.width / 2) - (overlayWidth / 2);
            yOffset = faceBox.yMin - (overlayHeight * 0.2); // Position slightly above the face
          }
        }
      } else if (product?.category === 'jackets' || product?.category === 'hoodies') {
        // For jackets and hoodies, position based on shoulders and body
        const noseTip = face.keypoints.find(point => point.name === "noseTip");
        if (noseTip) {
          shouldApplyTracking = true;
          
          // Calculate position relative to nose
          const noseX = noseTip.x;
          const noseY = noseTip.y;
          
          // Center the jacket horizontally with the nose
          xOffset = noseX - (overlayWidth / 2);
          
          // Position the jacket below the face
          yOffset = noseY + (overlayHeight * 0.1);
        }
      } else if (product?.category === 'shirts') {
        // For shirts, position based on chest area
        const nose = face.keypoints.find(point => point.name === "noseTip");
        if (nose) {
          shouldApplyTracking = true;
          
          // Calculate position relative to nose
          const noseX = nose.x;
          const noseY = nose.y;
          
          // Center the shirt horizontally with the nose
          xOffset = noseX - (overlayWidth / 2);
          
          // Position the shirt below the face
          yOffset = noseY + (overlayHeight * 0.15);
        }
      }
    }
    
    // If no tracking applied or no face detected, use default positioning
    if (!shouldApplyTracking) {
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
    }
    
    // Draw overlay if not already drawn with rotation
    if (shouldApplyTracking || faces.length === 0) {
      ctx.drawImage(overlayImage, xOffset, yOffset, overlayWidth, overlayHeight);
    }
    
    // Add instruction text
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Adjust yourself to virtually try the item', canvas.width / 2, canvas.height - 15);
    
    // Show tracker status if applicable
    if (isFaceTracking) {
      const statusText = faces.length > 0 ? "Face detected" : "No face detected";
      const statusColor = faces.length > 0 ? "green" : "red";
      ctx.fillStyle = statusColor;
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(statusText, 10, 30);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>WearView: {product?.name}</DialogTitle>
          <DialogDescription>
            Use your camera to see how this item looks on you
            {isFaceTracking && faceDetected && (
              <span className="ml-1 text-green-600">(Face tracking active)</span>
            )}
            {isFaceTracking && !faceDetected && (
              <span className="ml-1 text-amber-500">(Looking for face...)</span>
            )}
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
