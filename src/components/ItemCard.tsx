import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ItemMetadata } from '@/types';
import { getIPFSUrl } from '@/lib/ipfs';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Badge } from '@/components/ui/badge';

interface ItemCardProps {
  item: ItemMetadata;
  showSimilarity?: number;
}

export function ItemCard({ item, showSimilarity }: ItemCardProps) {
  return (
    <Link to={`/item/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {item.imageCid ? (
            <img
              src={getIPFSUrl(item.imageCid)}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
            <Badge variant={item.type === 'LOST' ? 'destructive' : 'default'}>
              {item.type}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{item.category}</span>
              <span className="mx-1">•</span>
              <span className="capitalize">{item.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(item.dateLost).toLocaleDateString()}</span>
            </div>
          </div>

          {showSimilarity !== undefined && (
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Match Score</span>
                <span className="text-sm font-bold text-primary">
                  {showSimilarity}%
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
