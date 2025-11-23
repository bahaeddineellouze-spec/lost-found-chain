import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { ItemMetadata } from '@/types';
import { fetchFromIPFS, getIPFSUrl } from '@/lib/ipfs';
import { useGetItem, useBlockchain } from '@/hooks/useBlockchain';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Tag, User, ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();
  const { item: blockchainItem, isLoading: isLoadingBlockchain } = useGetItem(id);
  const { markAsReturned, claimItem } = useBlockchain();
  const [metadata, setMetadata] = useState<ItemMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActing, setIsActing] = useState(false);

  useEffect(() => {
    const loadMetadata = async () => {
      if (!blockchainItem?.metadataCid) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchFromIPFS<ItemMetadata>(blockchainItem.metadataCid);
        setMetadata(data);
      } catch (error) {
        console.error('Error loading metadata:', error);
        toast.error('Failed to load item details');
      } finally {
        setIsLoading(false);
      }
    };

    if (blockchainItem) {
      loadMetadata();
    }
  }, [blockchainItem]);

  const handleMarkAsReturned = async () => {
    if (!id) return;
    setIsActing(true);
    try {
      await markAsReturned(id);
    } catch (error) {
      // Error handled in hook
    } finally {
      setIsActing(false);
    }
  };

  const handleClaim = async () => {
    if (!id) return;
    setIsActing(true);
    try {
      await claimItem(id);
    } catch (error) {
      // Error handled in hook
    } finally {
      setIsActing(false);
    }
  };

  if (isLoading || isLoadingBlockchain) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!metadata || !blockchainItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Item Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The item you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOwner = address?.toLowerCase() === blockchainItem.owner.toLowerCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-muted">
              {metadata.imageCid ? (
                <img
                  src={getIPFSUrl(metadata.imageCid)}
                  alt={metadata.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-3xl">{metadata.title}</CardTitle>
                <div className="flex flex-col gap-2">
                  <Badge variant={metadata.type === 'LOST' ? 'destructive' : 'default'}>
                    {metadata.type}
                  </Badge>
                  <StatusBadge status={blockchainItem.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{metadata.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Category:</span>
                  <span>{metadata.category}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">Color:</span>
                  <span className="capitalize">{metadata.color}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Location:</span>
                  <span>{metadata.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Date:</span>
                  <span>{new Date(metadata.dateLost).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Owner:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {blockchainItem.owner.slice(0, 6)}...{blockchainItem.owner.slice(-4)}
                  </code>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <a
                  href={`https://etherscan.io/address/${blockchainItem.owner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  View on Blockchain
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {metadata.type === 'FOUND' && !isOwner && (
                <Button
                  onClick={handleClaim}
                  className="w-full"
                  disabled={isActing || blockchainItem.status !== 'PENDING'}
                >
                  {isActing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    'Claim This Item'
                  )}
                </Button>
              )}

              {metadata.type === 'LOST' && isOwner && (
                <Button
                  onClick={handleMarkAsReturned}
                  variant="outline"
                  className="w-full"
                  disabled={isActing || blockchainItem.status === 'RETURNED'}
                >
                  {isActing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Mark as Returned'
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
