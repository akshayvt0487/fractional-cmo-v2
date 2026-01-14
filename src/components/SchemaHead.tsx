/**
 * SchemaHead Component
 * Use this component to inject multiple JSON-LD schemas into page head
 * Particularly useful for blog posts with multiple schema types (Article, FAQ, BreadcrumbList)
 */

export interface SchemaHeadProps {
  schemas: any[]; // Array of schema objects
}

export function SchemaHead({ schemas }: SchemaHeadProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
}

/**
 * Helper to combine multiple schemas for a single page
 */
export function combineSchemas(...schemas: any[]) {
  return schemas.filter(Boolean);
}
