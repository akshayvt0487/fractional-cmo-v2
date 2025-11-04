import "next/dist/lib/metadata/types/metadata-interface";

declare module "next/dist/lib/metadata/types/metadata-interface" {
  interface OpenGraph {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  }
}
