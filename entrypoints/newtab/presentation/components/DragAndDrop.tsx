import {
  Button,
  GridList,
  GridListItem,
  useDragAndDrop,
  useListData
} from 'react-aria-components'

import './DragAndDrop.sass'

const INITIAL_ITEMS = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  { id: '4', name: 'Item 4' },
  { id: '5', name: 'Item 5' },
  { id: '6', name: 'Item 6' }
]

export const DragAndDrop: React.FC = () => {
  const list = useListData({
    initialItems: INITIAL_ITEMS
  })

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (_keys, items: typeof list.items) =>
      items.map((item) => ({ 'text/plain': item.name })),
    onReorder(e) {
      if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys)
      }

      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys)
      }
    }
  })

  return (
    <GridList
      aria-label='Reorderable grid'
      dragAndDropHooks={dragAndDropHooks}
      items={list.items}
      layout='stack'
    >
      {(item) => (
        <GridListItem key={item.id} textValue={item.name}>
          <Button slot='drag'>{item.name}</Button>
        </GridListItem>
      )}
    </GridList>
  )
}
