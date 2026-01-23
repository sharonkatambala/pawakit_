import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SlideCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  className?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  autoSlideMode?: 'loop' | 'pingpong';
  loop?: boolean;
  showPagination?: boolean;
  paginationStyle?: 'dots';
}

export const SlideCarousel = ({ 
  children, 
  itemsPerView = 3, 
  className = "", 
  autoSlide = false, 
  autoSlideInterval = 3000,
  autoSlideMode = 'loop',
  loop = true,
  showPagination = true,
  paginationStyle = 'dots',
}: SlideCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [actualItemsPerView, setActualItemsPerView] = useState(itemsPerView);
  const [isHovered, setIsHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - actualItemsPerView);

  useEffect(() => {
    const updateItemWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const screenWidth = window.innerWidth;
        
        // Responsive items per view
        let responsiveItemsPerView = itemsPerView;
        if (screenWidth < 640) { // sm breakpoint
          responsiveItemsPerView = 1;
        } else if (screenWidth < 768) { // md breakpoint
          responsiveItemsPerView = Math.min(2, itemsPerView);
        } else if (screenWidth < 1024) { // lg breakpoint
          responsiveItemsPerView = Math.min(2, itemsPerView);
        }
        
        setActualItemsPerView(responsiveItemsPerView);
        setItemWidth(containerWidth / responsiveItemsPerView);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    return () => window.removeEventListener('resize', updateItemWidth);
  }, [itemsPerView]);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || isHovered) return;

    const interval = setInterval(() => {
      if (maxIndex === 0) return;

      if (autoSlideMode === 'pingpong') {
        setCurrentIndex((prev) => {
          const next = prev + slideDirection;
          if (next >= maxIndex) {
            setSlideDirection(-1);
            return maxIndex;
          }
          if (next <= 0) {
            setSlideDirection(1);
            return 0;
          }
          return next;
        });
      } else {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, autoSlideMode, maxIndex, isHovered, slideDirection]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return loop ? maxIndex : prev;
      return prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={containerRef}
        className="overflow-hidden rounded-lg"
      >
        <div 
          ref={trackRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            width: `${totalItems * itemWidth}px`
          }}
        >
          {children.map((child, index) => (
            <div 
              key={index}
              className="flex-shrink-0 px-2 sm:px-4"
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        disabled={!loop && currentIndex <= 0}
        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        disabled={!loop && currentIndex >= maxIndex}
        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Dots Indicator */}
      {showPagination && paginationStyle === 'dots' && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};