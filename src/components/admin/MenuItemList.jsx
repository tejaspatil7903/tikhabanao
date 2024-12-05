import { useMenuStore } from '../../stores/menuStore';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export default function MenuItemList({ onEdit }) {
  const { items, deleteMenuItem } = useMenuStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item._id}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <Badge variant={item.type === 'veg' ? 'accent' : 'secondary'}>
                {item.type}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="font-medium mb-4">₹{item.price}</p>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteMenuItem(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}