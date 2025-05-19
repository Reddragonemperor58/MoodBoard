import React, { useCallback, useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useMoodboard } from '../../context/MoodboardContext';
import TimeSegment from './TimeSegment';
import { v4 as uuidv4 } from 'uuid';
import { TimeSegment as TimeSegmentType } from '../../types/moodboard';
import type { Sticker as StickerType, TextSticker, ImageSticker, IconSticker } from '../../types/moodboard';

type StickerPayload = {
  type: 'text' | 'image' | 'icon';
  content?: string;
  timeSegmentId: string;
  id?: string;
  width?: number;
  height?: number;
};

const Board: React.FC = () => {
  const { state, dispatch } = useMoodboard();
  
  // Position state for draggable functionality
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // Load saved position from localStorage
  useEffect(() => {
    try {
      const savedPosition = localStorage.getItem('board-position');
      if (savedPosition) {
        setPosition(JSON.parse(savedPosition));
      }
    } catch (e) {
      console.error('Error loading saved position:', e);
    }
  }, []);
  
  // Save position when dragging stops
  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    const newPos = { x: data.x, y: data.y };
    setPosition(newPos);
    localStorage.setItem('board-position', JSON.stringify(newPos));
  };
  
  // Handle adding a new time segment
  const handleAddTimeSegment = useCallback(() => {
    const id = uuidv4();
    const newSegment: TimeSegmentType = {
      id,
      title: `Day ${state.segmentOrder.length + 1}`,
      order: state.segmentOrder.length,
      width: 300,
      height: 300,
      childrenIds: [], // Add missing childrenIds property
    };
    
    dispatch({
      type: 'ADD_SEGMENT',
      payload: newSegment,
    });
  }, [dispatch, state.segmentOrder.length]);
  
  // Handle time segment updates
  const handleUpdateTimeSegment = useCallback((id: string, updates: Partial<TimeSegmentType>) => {
    // Update segment properties
    if (updates.title) {
      dispatch({
        type: 'RENAME_SEGMENT',
        payload: { id, title: updates.title },
      });
    }
    
    if (updates.width && updates.height) {
      dispatch({
        type: 'RESIZE_SEGMENT',
        payload: { id, width: updates.width, height: updates.height },
      });
    }
  }, [dispatch]);
  
  // Handle time segment deletion
  const handleDeleteTimeSegment = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE_SEGMENT',
      payload: { id },
    });
  }, [dispatch]);
  
  // Handle adding a sticker to a time segment
  const handleAddSticker = useCallback((stickerData: StickerPayload) => {
    let sticker: StickerType;
    
    const baseSticker = {
      id: stickerData.id || uuidv4(),
      timeSegmentId: stickerData.timeSegmentId,
      x: 0,
      y: 0,
      width: stickerData.width || 150,
      height: stickerData.height || 100,
      rotation: 0,
      zIndex: 1,
    };
    
    // Create the appropriate sticker type based on the incoming data
    if (stickerData.type === 'icon') {
      sticker = {
        ...baseSticker,
        type: 'icon',
        content: stickerData.content || '',
        icon: stickerData.content || '',
      } as IconSticker;
    } else if (stickerData.type === 'image') {
      sticker = {
        ...baseSticker,
        type: 'image',
        content: stickerData.content || '',
        originalSize: { width: baseSticker.width, height: baseSticker.height }
      } as ImageSticker;
    } else {
      // Default to text sticker for any other type
      sticker = {
        ...baseSticker,
        type: 'text',
        content: stickerData.content || '',
      } as TextSticker;
    }
    
    dispatch({
      type: 'ADD_STICKER',
      payload: sticker,
    });
  }, [dispatch]);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStop={handleDragStop}
      handle=".board-drag-handle"
      bounds="parent"
    >
      <div 
        ref={nodeRef} 
        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 board-drag-handle cursor-move">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Moodboard</h2>
        <button 
          onClick={handleAddTimeSegment}
          className="btn"
        >
          Add Day
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {state.segmentOrder.map(segmentId => {
          const segment = state.segments[segmentId];
          return (
            <TimeSegment
              key={segment.id}
              segment={segment}
              onUpdate={handleUpdateTimeSegment}
              onDelete={handleDeleteTimeSegment}
              onAddSticker={handleAddSticker}
            />
          );
        })}
      </div>
    </div>
    </Draggable>
  );
};

export default Board;
