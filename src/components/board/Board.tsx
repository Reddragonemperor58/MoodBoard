import React, { useCallback } from 'react';
import { useMoodboard } from '../../context/MoodboardContext';
import { TimeSegment } from './TimeSegment';
import { v4 as uuidv4 } from 'uuid';
import { TimeSegment as TimeSegmentType } from '../../types/moodboard';

const Board: React.FC = () => {
  const { state, dispatch } = useMoodboard();
  
  // Position and drag functionality removed for simplicity
  
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
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Moodboard</h2>
        <button 
          onClick={handleAddTimeSegment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Day
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        {state.segmentOrder.map((segmentId: string) => {
          const segment = state.segments[segmentId];
          return (
            <TimeSegment
              key={segment.id}
              segment={segment}
              onUpdate={handleUpdateTimeSegment}
              onDelete={handleDeleteTimeSegment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
