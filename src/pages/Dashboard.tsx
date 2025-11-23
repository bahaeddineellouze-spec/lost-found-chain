import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemCard } from '@/components/ItemCard';
import { EmptyState } from '@/components/EmptyState';
import { ItemMetadata } from '@/types';
import { Package, Search } from 'lucide-react';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [lostItems, setLostItems] = useState<ItemMetadata[]>([]);
  const [foundItems, setFoundItems] = useState<ItemMetadata[]>([]);

  useEffect(() => {
    if (!isConnected || !address) return;

    // In production, fetch user's items from the blockchain/database
    // For now, using empty arrays
    setLostItems([]);
    setFoundItems([]);
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Wallet Not Connected</h2>
              <p className="text-muted-foreground">
                Please connect your wallet to view your dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your reported lost and found items
        </p>
      </div>

      <Tabs defaultValue="lost" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="lost">Lost Items ({lostItems.length})</TabsTrigger>
          <TabsTrigger value="found">Found Items ({foundItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="lost" className="space-y-6">
          {lostItems.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No Lost Items"
              description="You haven't reported any lost items yet. Click 'Report Lost' in the navigation to add one."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lostItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="found" className="space-y-6">
          {foundItems.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No Found Items"
              description="You haven't reported any found items yet. Click 'Report Found' in the navigation to add one."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
