import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  // arrayMove
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type PropsType = {
  children: React.ReactNode;
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd?: (oldIndex: number, newIndex: number) => void;
};

// 拖拽排序容器
function SortableContainer({ children, items, onDragEnd }: PropsType) {
  // 配置传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px
      },
    })
  );
  // 拖拽结束处理方法
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = items.findIndex(c => c.fe_id === active.id);
    const newIndex = items.findIndex(c => c.fe_id === over.id);
    if (oldIndex !== newIndex) {
      onDragEnd?.(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export default SortableContainer;
