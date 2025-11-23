import { Badge } from '@/components/ui/badge';
import { ItemStatus } from '@/types';

interface StatusBadgeProps {
  status: ItemStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    PENDING: 'secondary',
    APPROVED: 'default',
    RETURNED: 'outline',
    CLAIMED: 'outline',
  } as const;

  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status}
    </Badge>
  );
}
