import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const ElectriciansDigitalMarketing = () => {
  return (
    <IndustryServiceLayout
      industrySlug="electricians"
      serviceSlug="digital-marketing"
      benefits={[
        'Digital marketing for electricians',
        'Google Ads and SEO for urgent jobs',
        'Local service area targeting',
        'Reputation management and reviews',
        'Clear reporting and lead tracking'
      ]}
    />
  );
};

export default ElectriciansDigitalMarketing;
