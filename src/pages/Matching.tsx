import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent } from '@/components/ui/card';
import { ItemCard } from '@/components/ItemCard';
import { EmptyState } from '@/components/EmptyState';
import { MatchResult } from '@/types';
import { Search, Loader2 } from 'lucide-react';

export default function Matching() {
  const { address, isConnected } = useAccount();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected || !address) {
      setIsLoading(false);
      return;
    }

    // Mock matching data for demonstration
    // In production, this would call your matching API
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data - in production this would be actual matches
        const mockMatches: MatchResult[] = [];
        setMatches(mockMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Wallet Not Connected</h2>
              <p className="text-muted-foreground">
                Please connect your wallet to view potential matches.
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
        <h1 className="text-3xl font-bold mb-2">Potential Matches</h1>
        <p className="text-muted-foreground">
          AI-powered matching between lost and found items
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : matches.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Matches Found"
          description="We haven't found any potential matches for your items yet. Check back later as more items are reported."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <ItemCard
              key={match.itemId}
              item={match.metadata}
              showSimilarity={match.similarityScore}
            />
          ))}
        </div>
      )}
    </div>
  );
}
