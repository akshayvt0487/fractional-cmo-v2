import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const LawyersDigitalMarketing = () => {
  return (
    <IndustryServiceLayout
      industrySlug="lawyers"
      serviceSlug="digital-marketing"
      benefits={[
        'Digital marketing for law firms',
        'SEO and Google Ads for legal services',
        'Content marketing for authority',
        'Local targeting for practice areas',
        'Transparent reporting and compliance'
      ]}
    />
  );
};

export default LawyersDigitalMarketing;
