'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { CreateNotebookButton } from '@/components/features/dashboard/components/create-notebook-button';
import { ActionsDropdown } from '@/components/shared/actions';
import { updateNotebook, deleteNotebook } from '@/server/notebook';
import { useRouter } from 'next/navigation';

interface NotebookCard {
  id: string;
  name: string;
  notesCount: number;
  createdAt: Date | null;
}

export default function StackedCards({ 
  cards = [], 
  maxVisibleInStack = 5 
}: { 
  cards: NotebookCard[], 
  maxVisibleInStack?: number 
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isAnimatingRef = useRef(false);
  const isDragOperationRef = useRef(false);
  const isInitializedRef = useRef(false);
  const [cardPositions, setCardPositions] = useState(() => {
    // We'll calculate the center position dynamically when the component mounts
    return cards.map((_, index) => ({
      x: index * 8,
      y: index * 8,
      zIndex: cards.length - index,
      isDragging: false,
    }));
  });

  const [cardOrder, setCardOrder] = useState(cards.map((_, index) => index));

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    cardIndex: -1,
    initialCardX: 0,
    initialCardY: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    lastTime: 0,
  });

  const animationFrame = useRef<number | null>(null);

  const cardsToRender = cards;

  // Calculate center position for the container dynamically
  const getCenterPosition = useCallback(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Fallback values for SSR
      return { centerX: 0, centerY: 0 };
    }

    const container = document.getElementById('cards-container');
    if (!container) {
      // Fallback values if container is not available
      return { centerX: 0, centerY: 0 };
    }

    const containerRect = container.getBoundingClientRect();
    const cardWidth = 240; // w-60 = 15rem = 240px
    const cardHeight = 280; // h-70 = 17.5rem = 280px

    const centerX = containerRect.width / 2 - cardWidth / 2;
    const centerY = containerRect.height / 2 - cardHeight / 2;

    return { centerX, centerY };
  }, []);

  // Set client flag after hydration to prevent SSR mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isInitializedRef.current) return; // Only run once after hydration
    if (cards.length === 0) return; // Don't initialize with empty cards
    
    isInitializedRef.current = true;
    setCardOrder(cards.map((_, index) => index));
    const { centerX, centerY } = getCenterPosition();
    setCardPositions(
      cards.map((_, index) => ({
        x: centerX + index * 8,
        y: centerY + index * 8,
        zIndex: cards.length - index,
        isDragging: false,
      }))
    );
  }, [isClient]); // Only run when client is ready, ignore other dependencies to prevent re-initialization

  // Track previous cards length to avoid dependency on cardPositions.length
  const prevCardsLengthRef = useRef(cards.length);
  
  // Handle cards being added/removed (but not during drag operations)
  useEffect(() => {
    if (!isInitializedRef.current || isAnimatingRef.current || isDragOperationRef.current) return;
    
    // Only reset if the number of cards actually changed
    if (prevCardsLengthRef.current !== cards.length) {
      prevCardsLengthRef.current = cards.length;
      setCardOrder(cards.map((_, index) => index));
      const { centerX, centerY } = getCenterPosition();
      setCardPositions(
        cards.map((_, index) => ({
          x: centerX + index * 8,
          y: centerY + index * 8,
          zIndex: cards.length - index,
          isDragging: false,
        }))
      );
    }
  }, [cards.length, getCenterPosition]); // Removed cardPositions.length dependency to prevent infinite loop



  // Handle window resize to recalculate center position
  useEffect(() => {
    const handleResize = () => {
      if (isAnimatingRef.current || isDragOperationRef.current) return; // Prevent updates during animation/drag
      const { centerX, centerY } = getCenterPosition();
      setCardPositions((prev) =>
        prev.map((pos, index) => ({
          ...pos,
          x: centerX + index * 8,
          y: centerY + index * 8,
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getCenterPosition]); // Include getCenterPosition dependency
  
  // Cleanup effect to stop animations on unmount
  useEffect(() => {
    return () => {
      // Cancel any ongoing animation frame requests
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      // Stop any ongoing animations
      isAnimatingRef.current = false;
      isDragOperationRef.current = false;
    };
  }, []);

  // Fast position update using requestAnimationFrame
  const updateCardPosition = useCallback((clientX: number, clientY: number) => {
    if (!dragRef.current.isDragging) return;

    const container = document.getElementById('cards-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newX = clientX - containerRect.left - dragRef.current.startX;
    const newY = clientY - containerRect.top - dragRef.current.startY;

    // Calculate velocity for momentum effect
    const currentTime = Date.now();
    const deltaTime = currentTime - dragRef.current.lastTime;
    
    if (deltaTime > 0) {
      dragRef.current.velocityX = (newX - dragRef.current.lastX) / deltaTime;
      dragRef.current.velocityY = (newY - dragRef.current.lastY) / deltaTime;
    }
    
    dragRef.current.lastX = newX;
    dragRef.current.lastY = newY;
    dragRef.current.lastTime = currentTime;

    setCardPositions((prev) =>
      prev.map((pos, idx) =>
        idx === dragRef.current.cardIndex ? { ...pos, x: newX, y: newY } : pos
      )
    );
  }, []);



  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
    e.preventDefault();
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    animationFrame.current = requestAnimationFrame(() => {
      updateCardPosition(e.clientX, e.clientY);
    });
    },
    [updateCardPosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    animationFrame.current = requestAnimationFrame(() => {
      updateCardPosition(touch.clientX, touch.clientY);
    });
    },
    [updateCardPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    const cardIndex = dragRef.current.cardIndex;
    const velocityX = dragRef.current.velocityX;
    const velocityY = dragRef.current.velocityY;

    // Apply momentum/sliding effect
    const momentumMultiplier = 30; // Adjust this to control slide distance
    const friction = 0.8; // Friction to slow down the slide
    const minVelocity = 0.0002; // Minimum velocity to continue sliding

    let currentVelocityX = velocityX * momentumMultiplier;
    let currentVelocityY = velocityY * momentumMultiplier;
    let animationSteps = 0;
    const maxAnimationSteps = 100; // Prevent infinite animations

    const slideAnimation = () => {
      animationSteps++;
      
      if (
        (Math.abs(currentVelocityX) < minVelocity &&
        Math.abs(currentVelocityY) < minVelocity) ||
        animationSteps >= maxAnimationSteps ||
        !isAnimatingRef.current // Safety check to stop if animation flag is cleared
      ) {
        // Stop sliding animation
        setCardPositions((prev) =>
          prev.map((pos) => ({ ...pos, isDragging: false }))
        );
        isAnimatingRef.current = false; // Animation finished
        isDragOperationRef.current = false; // Drag operation finished
        return;
      }

      // Apply friction
      currentVelocityX *= friction;
      currentVelocityY *= friction;

      // Update position with momentum - only if not exceeding reasonable bounds
      setCardPositions((prev) =>
        prev.map((pos, idx) => {
          if (idx !== cardIndex) return pos;
          
          const newX = pos.x + currentVelocityX;
          const newY = pos.y + currentVelocityY;
          
          // Prevent positions from going extremely far off screen
          const maxDistance = 2000;
          if (Math.abs(newX) > maxDistance || Math.abs(newY) > maxDistance) {
            // Stop animation if card goes too far
            isAnimatingRef.current = false;
            return { ...pos, isDragging: false };
          }
          
          return { 
            ...pos, 
            x: newX,
            y: newY,
          };
        })
      );

      if (isAnimatingRef.current) {
        requestAnimationFrame(slideAnimation);
      }
    };

    // Start the sliding animation only if there's enough velocity
    if (
      Math.abs(currentVelocityX) > minVelocity ||
      Math.abs(currentVelocityY) > minVelocity
    ) {
      isAnimatingRef.current = true; // Animation starting
      slideAnimation();
    } else {
      // No momentum, just stop dragging
      setCardPositions((prev) =>
        prev.map((pos) => ({ ...pos, isDragging: false }))
      );
      isDragOperationRef.current = false; // Drag operation finished
    }

    dragRef.current.isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleTouchMove]);

  const handleMouseDown = useCallback((e: MouseEvent, cardIndex: number) => {
    e.preventDefault();

    // Mark that a drag operation is starting
    isDragOperationRef.current = true;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const container = document.getElementById('cards-container');
    const containerRect = (container as HTMLElement).getBoundingClientRect();
    const currentTime = Date.now();

    dragRef.current = {
      isDragging: true,
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      cardIndex,
      initialCardX: rect.left - containerRect.left,
      initialCardY: rect.top - containerRect.top,
      lastX: e.clientX - containerRect.left - (e.clientX - rect.left),
      lastY: e.clientY - containerRect.top - (e.clientY - rect.top),
      velocityX: 0,
      velocityY: 0,
      lastTime: currentTime,
    };

    // Bring the dragged card to front immediately
    setCardPositions((prev) =>
      prev.map((pos, idx) => ({
        ...pos,
        zIndex: idx === cardIndex ? 1000 : pos.zIndex,
        isDragging: idx === cardIndex,
      }))
    );

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    
    // Also add touch events for mobile
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const resetCards = useCallback(() => {
    const { centerX, centerY } = getCenterPosition();
    setCardPositions(
      cardsToRender.map((_, index) => ({
        x: centerX + index * 8,
        y: centerY + index * 8,
        zIndex: cardsToRender.length - index,
        isDragging: false,
      }))
    );
    setCardOrder(cardsToRender.map((_, index) => index));
  }, [cardsToRender, getCenterPosition]);

  const nextCard = useCallback(() => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const topCard = newOrder.shift();
    if (topCard !== undefined) {
        newOrder.push(topCard);
      }

      // Update positions immediately for cards in stack formation
      setCardPositions((prevPos) =>
        prevPos.map((pos, index) => {
          // Find what the new stack position should be for this card
          const newStackPosition = newOrder.findIndex(
            (orderIndex) => orderIndex === index
          );
          const expectedStackX =
            getCenterPosition().centerX + newStackPosition * 8;
          const expectedStackY =
            getCenterPosition().centerY + newStackPosition * 8;

          // Check if card is currently in a stack position (within tolerance)
          const currentStackPosition = prev.findIndex(
            (orderIndex) => orderIndex === index
          );
          const currentExpectedX =
            getCenterPosition().centerX + currentStackPosition * 8;
          const currentExpectedY =
            getCenterPosition().centerY + currentStackPosition * 8;
          const isInStackPosition =
            Math.abs(pos.x - currentExpectedX) < 50 &&
            Math.abs(pos.y - currentExpectedY) < 50;

          if (isInStackPosition) {
          return {
            ...pos,
              x: expectedStackX,
              y: expectedStackY,
              zIndex: cardsToRender.length - newStackPosition,
          };
        }
        return pos;
      })
    );

      return newOrder;
    });
  }, [cardsToRender.length, getCenterPosition]); // Include getCenterPosition dependency

  const previousCard = useCallback(() => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      const bottomCard = newOrder.pop();
    if (bottomCard !== undefined) {
        newOrder.unshift(bottomCard);
      }

      // Update positions immediately for cards in stack formation
      setCardPositions((prevPos) =>
        prevPos.map((pos, index) => {
          // Find what the new stack position should be for this card
          const newStackPosition = newOrder.findIndex(
            (orderIndex) => orderIndex === index
          );
          const expectedStackX =
            getCenterPosition().centerX + newStackPosition * 8;
          const expectedStackY =
            getCenterPosition().centerY + newStackPosition * 8;

          // Check if card is currently in a stack position (within tolerance)
          const currentStackPosition = prev.findIndex(
            (orderIndex) => orderIndex === index
          );
          const currentExpectedX =
            getCenterPosition().centerX + currentStackPosition * 8;
          const currentExpectedY =
            getCenterPosition().centerY + currentStackPosition * 8;
          const isInStackPosition =
            Math.abs(pos.x - currentExpectedX) < 50 &&
            Math.abs(pos.y - currentExpectedY) < 50;

          if (isInStackPosition) {
          return {
            ...pos,
              x: expectedStackX,
              y: expectedStackY,
              zIndex: cardsToRender.length - newStackPosition,
          };
        }
        return pos;
      })
    );

      return newOrder;
    });
  }, [cardsToRender.length, getCenterPosition]); // Include getCenterPosition dependency

  // Touch event handlers for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>, cardIndex: number) => {
    const touch = e.touches[0];
    const mouseEvent = {
      ...e,
      clientX: touch.clientX,
      clientY: touch.clientY,
        preventDefault: () => e.preventDefault(),
    };
    handleMouseDown(mouseEvent as unknown as MouseEvent, cardIndex);
    },
    [handleMouseDown]
  );

  // Handle card double-click for navigation (but not when clicking actions)
  const handleCardDoubleClick = useCallback((e: React.MouseEvent, cardId: string) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/dashboard/notebooks/${cardId}`);
  }, [router]);

  // Handle notebook update
  const handleUpdateNotebook = useCallback(async (id: string, values: { name: string }) => {
    return await updateNotebook(id, { name: values.name });
  }, []);

  return (
    <div className="relative w-full">
      {/* Cards Container */}
      <div
        id="cards-container"
        className="relative w-full max-w-7xl h-full mx-auto bg-muted/50 rounded-lg overflow-hidden flex items-center justify-center border"
        style={{ minHeight: '80vh' }}
      >
        {!isClient && (
          // Placeholder during SSR/hydration
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Loading notebooks...</div>
          </div>
        )}
        {isClient && cardOrder.map((originalIndex, stackPosition) => {
          const card = cardsToRender[originalIndex];
          const cardIndex = originalIndex;
          const position = cardPositions[cardIndex];

          // Safety check: skip if card doesn't exist (can happen during deletion)
          if (!card) return null;

          // Get dynamic center position
          const { centerX, centerY } = getCenterPosition();

          // Determine if card should use stack position or custom position
          const expectedStackX = centerX + stackPosition * 8;
          const expectedStackY = centerY + stackPosition * 8;
          const hasCustomPosition =
            position &&
            (Math.abs(position.x - expectedStackX) > 10 ||
              Math.abs(position.y - expectedStackY) > 10);

          const finalX = hasCustomPosition ? position.x : expectedStackX;
          const finalY = hasCustomPosition ? position.y : expectedStackY;
          const finalZIndex = position?.isDragging
            ? 1000
            : hasCustomPosition
              ? position.zIndex
              : cardsToRender.length - stackPosition;

          // Only render cards that are either:
          // 1. In the visible stack range (first maxVisibleInStack cards)
          // 2. Have been dragged to a custom position
          const isInVisibleStack = stackPosition < maxVisibleInStack;
          const shouldRender = isInVisibleStack || hasCustomPosition;

          if (!shouldRender) return null;
          
          return (
            <div
              key={card.id || originalIndex}
              className={`absolute w-60 h-70 bg-card rounded-lg border shadow-lg cursor-pointer select-none will-change-transform ${
                position?.isDragging 
                  ? 'cursor-grabbing scale-105 shadow-2xl z-[1000]' 
                  : 'hover:scale-[1.02] transition-transform duration-150'
              }`}
              style={{
                left: `${finalX}px`,
                top: `${finalY}px`,
                zIndex: finalZIndex,
                transform: position?.isDragging 
                  ? 'rotate(-2deg)' 
                  : `rotate(${stackPosition % 2 === 0 ? '1deg' : '-1deg'})`,
                transition: position?.isDragging ? 'none' : 'all 0.3s ease-out',
              }}
              onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => handleCardDoubleClick(e, card.id)}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
                handleMouseDown(e as unknown as MouseEvent, cardIndex)
              }
              onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
                handleTouchStart(e, cardIndex)
              }
            >
              {/* Card Header */}
              <div className="p-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground">
                  {card.name}
                  </h3>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {card.notesCount === 0 
                      ? 'No notes yet' 
                      : `${card.notesCount} note${card.notesCount === 1 ? '' : 's'}`
                    }
                </p>
              </div>
                <div className="text-xs text-muted-foreground">
                  Created {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'Unknown date'}
                </div>
              </div>
              
              {/* Card number indicator */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {originalIndex + 1}
              </div>

              {/* Actions Dropdown - Top Right */}
              <div className="absolute top-2 right-2 z-[1200]" onClick={(e) => e.stopPropagation()}>
                <ActionsDropdown
                  id={card.id}
                  name={card.name}
                  onUpdate={handleUpdateNotebook}
                  onDelete={deleteNotebook}
                  updateTitle="Update Notebook"
                  updateDescription="Change the name of this notebook."
                  deleteTitle="Delete Notebook"
                  deleteDescription="Are you sure you want to delete"
                />
              </div>
            </div>
          );
        })}

        {/* Instructions */}
        {/* <div className="absolute bottom-4 left-4 text-sm text-muted-foreground bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-sm">
          💡 Drag cards anywhere • Use arrows to flip through all{' '}
          {cardsToRender.length} cards • Reset to reorganize
        </div> */}

        {/* Control Panel */}
        <div className="flex justify-center items-center gap-2 px-3 py-1 rounded-full border shadow-sm absolute top-4 left-4 h-7">
          {/* Previous Card Arrow */}
          <Button
            onClick={previousCard}
            size="icon"
            variant="default"
            className="h-5 w-5 rounded-full bg-primary hover:bg-primary/90 transition-all duration-150"
            title="Previous Card"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          {/* Next Card Arrow */}
          <Button
            onClick={nextCard}
            size="icon"
            variant="default"
            className="h-5 w-5 rounded-full bg-primary hover:bg-primary/90 transition-all duration-150"
            title="Next Card"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Reset Button */}
        <Button
          onClick={resetCards}
          variant="ghost"
          size="sm"
          className="flex justify-center items-center px-3 py-1 rounded-full border shadow-sm absolute top-4 left-24 h-7"
          title="Reset Cards"
        >
          <RotateCcw className="h-3 w-3" />
          <span className="text-xs font-medium">Reset</span>
        </Button>

        {/* Create Notebook Button */}
        <div className="absolute top-4 left-44 z-10">
          <CreateNotebookButton buttonClassName="px-3 py-1 rounded-full border shadow-sm h-7 text-xs" />
        </div>

        {/* Card counter with hidden cards indicator */}
        <div className="absolute top-4 right-4 text-sm text-muted-foreground px-3 py-1 rounded-full border shadow-sm h-7 flex items-center">
          {cardsToRender.length} Notebooks
          {cardsToRender.length > maxVisibleInStack && (
          <span className="text-xs opacity-70 ml-1">
              ({cardsToRender.length - maxVisibleInStack} hidden)
          </span>
          )}
        </div>
      </div>
    </div>
  );
}
