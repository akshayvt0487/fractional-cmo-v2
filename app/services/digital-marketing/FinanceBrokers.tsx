import IndustryServiceLayout from '@/components/IndustryServiceLayout';

const FinanceBrokersDigitalMarketing = () => {
  return (
    <IndustryServiceLayout
      industrySlug="finance-brokers"
      serviceSlug="digital-marketing"
      benefits={[
        'Specialised digital marketing for finance brokers',
        'Lead generation strategies tailored to finance industry',
        'Compliance-focused ad campaigns',
        'Content marketing for trust and authority',
        'Transparent reporting and analytics'
      ]}
    />
  );
};

export default FinanceBrokersDigitalMarketing;
