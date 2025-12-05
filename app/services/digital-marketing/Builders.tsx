import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const BuildersDigitalMarketing = () => {
  return (
    <IndustryServiceLayout
      industrySlug="builders"
      serviceSlug="digital-marketing"
      benefits={[
        'Digital marketing strategies for builders',
        'SEO and Google Ads for construction leads',
        'Project portfolio content to build trust',
        'Local targeting for high-value projects',
        'Transparent ROI tracking'
      ]}
    />
  );
};

export default BuildersDigitalMarketing;
