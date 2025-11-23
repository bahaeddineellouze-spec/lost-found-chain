import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/ImageUpload';
import { ITEM_CATEGORIES, ItemMetadata } from '@/types';
import { uploadJSONToIPFS } from '@/lib/ipfs';
import { useBlockchain } from '@/hooks/useBlockchain';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Found() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { createItem } = useBlockchain();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    color: '',
    location: '',
    dateLost: '',
    imageCid: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.imageCid) {
      toast.error('Please upload an image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create metadata object
      const metadata: ItemMetadata = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        color: formData.color,
        location: formData.location,
        dateLost: formData.dateLost,
        imageCid: formData.imageCid,
        type: 'FOUND',
        owner: address,
        createdAt: Date.now(),
      };

      // Upload metadata to IPFS
      const metadataCid = await uploadJSONToIPFS(metadata);
      toast.success('Metadata uploaded to IPFS');

      // Create item on blockchain
      await createItem('FOUND', metadataCid);

      toast.success('Found item reported successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting found item:', error);
      toast.error('Failed to report found item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Wallet Not Connected</h2>
              <p className="text-muted-foreground">
                Please connect your wallet to report a found item.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Report Found Item</CardTitle>
          <CardDescription>
            Fill in the details of the item you've found. Help return it to its rightful owner!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Blue iPhone 13"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color *</Label>
                <Input
                  id="color"
                  placeholder="e.g., Blue"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location Found *</Label>
              <Input
                id="location"
                placeholder="Where did you find it?"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateLost">Date Found *</Label>
              <Input
                id="dateLost"
                type="date"
                value={formData.dateLost}
                onChange={(e) => handleInputChange('dateLost', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Image *</Label>
              <ImageUpload
                onUpload={(cid) => handleInputChange('imageCid', cid)}
                currentCid={formData.imageCid}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Report Found Item'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
