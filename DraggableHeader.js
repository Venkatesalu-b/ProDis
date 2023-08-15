import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableHeader = ({ column, index, onHeaderDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN', // Set the type to a valid value, such as 'COLUMN'
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'COLUMN', // Set the same type as the useDrag type
    drop: (item) => {
      onHeaderDrag(item.index, index);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  // Rest of the component code...
};
export default DraggableHeader