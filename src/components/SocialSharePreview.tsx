import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface SocialSharePreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const SocialSharePreview = ({ title, description, imageUrl, url }: SocialSharePreviewProps) => {
  // Convert relative paths to absolute URLs for preview
  const getAbsoluteImageUrl = (img: string) => {
    if (img.startsWith('http')) return img;
    const baseUrl = window.location.origin;
    return img.startsWith('/') ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
  };

  const absoluteImageUrl = getAbsoluteImageUrl(imageUrl);
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <div className="space-y-6 my-8 p-6 bg-muted/50 rounded-lg">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span>Social Share Preview</span>
      </h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        {/* Facebook Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Facebook className="w-4 h-4" />
              Facebook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <img 
              src={absoluteImageUrl} 
              alt="Facebook preview" 
              className="w-full h-32 object-cover rounded"
            />
            <div className="text-xs space-y-1">
              <p className="font-semibold line-clamp-2">{title}</p>
              <p className="text-muted-foreground line-clamp-2">{truncatedDescription}</p>
              <p className="text-muted-foreground/70">{url}</p>
            </div>
          </CardContent>
        </Card>

        {/* Twitter/X Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              Twitter/X
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <img 
              src={absoluteImageUrl} 
              alt="Twitter preview" 
              className="w-full h-32 object-cover rounded"
            />
            <div className="text-xs space-y-1">
              <p className="font-semibold line-clamp-2">{title}</p>
              <p className="text-muted-foreground line-clamp-2">{truncatedDescription}</p>
              <p className="text-muted-foreground/70">{url}</p>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <img 
              src={absoluteImageUrl} 
              alt="LinkedIn preview" 
              className="w-full h-32 object-cover rounded"
            />
            <div className="text-xs space-y-1">
              <p className="font-semibold line-clamp-2">{title}</p>
              <p className="text-muted-foreground line-clamp-2">{truncatedDescription}</p>
              <p className="text-muted-foreground/70">{url}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialSharePreview;
