import React from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '../../../apps/client/lib/utils';
import ComparePackagesDialog from './ComparePackge';

export interface Feature {
  name: string;
  included: boolean;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  features: Feature[];
  price: string;
  period: string;
  buttonText: string;
  isPopular?: boolean;
  className?: string;
}

export const packages = [
  {
    name: 'Basic',
    price: '$499',
    period: 'per month',
    features: [
      { name: 'Keyword Research', included: true },
      { name: 'On-Page SEO', included: true },
      { name: 'Content Optimization', included: true },
      { name: 'Monthly Reports', included: true },
      { name: 'Technical SEO Audit', included: false },
      { name: 'Competitor Analysis', included: false },
      { name: 'Link Building', included: false },
      { name: 'Local SEO', included: false }
    ],
    buttonText: 'Add to cart'
  },
  {
    name: 'Standard',
    price: '',
    period: '',
    features: [
      { name: 'Keyword Research', included: true },
      { name: 'On-Page SEO', included: true },
      { name: 'Content Optimization', included: true },
      { name: 'Monthly Reports', included: true },
      { name: 'Technical SEO Audit', included: true },
      { name: 'Competitor Analysis', included: true },
      { name: 'Link Building', included: false },
      { name: 'Local SEO', included: false }
    ],
    popularChoice: false,
    buttonText: 'Add to cart'
  },
  {
    name: 'Premium',
    price: '$1,499',
    period: 'per month',
    features: [
      { name: 'Keyword Research', included: true },
      { name: 'On-Page SEO', included: true },
      { name: 'Content Optimization', included: true },
      { name: 'Monthly Reports', included: true },
      { name: 'Technical SEO Audit', included: true },
      { name: 'Competitor Analysis', included: true },
      { name: 'Link Building', included: true },
      { name: 'Local SEO', included: true }
    ],
    buttonText: 'Add to cart'
  }
];

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="flex items-center">
    {feature.included ? (
      <Check className="h-4 w-4 text-agency-blue mr-3 flex-shrink-0" />
    ) : (
      <div className="h-4 w-4 rounded-full border border-gray-600 mr-3 flex-shrink-0" />
    )}
    <span className={cn(
      "text-sm",
      feature.included ? "text-gray-200" : "text-gray-500"
    )}>
      {feature.name}
    </span>
  </div>
);

export const ServiceCardUi: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  price,
  period,
  isPopular = false,
  className
}) => {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto rounded-xl shadow-card transition-shadow duration-300",
      "hover:shadow-card-hover overflow-hidden text-gray-100 border border-zinc-800",
      "bg-[#0c0c0c]",
      className
    )}>
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <h2 className="text-2xl font-semibold text-center text-gray-100">{title}</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          {isPopular && (
            <span className="bg-agency-blue text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">
              POPULAR CHOICE
            </span>
          )}
          <div className="mt-2">
            <span className="text-3xl font-bold text-gray-100">{price}</span>
            <span className="text-gray-400 text-sm ml-1">{period}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-3">
          {features.slice(0, 4).map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>

        <ComparePackagesDialog buttonStyle="primary" />
      </div>
    </div>
  );
};