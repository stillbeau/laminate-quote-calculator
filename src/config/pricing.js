// Pricing Configuration
// Easy to modify for different customers/discounts

export const CUSTOMER_CONFIG = {
  // Customer Information
  name: "Customer Name", // Change for each customer
  discountPercentage: 30, // Change this for different customers (0-100)
  
  // Business Information
  company: "Your Company Name",
  phone: "(555) 123-4567",
  email: "quotes@yourcompany.com",
  
  // Tax Settings
  gstRate: 0.05, // 5% GST (change if needed for different regions)
  
  // Display Settings
  showOriginalPricing: false, // Set to true to show both original and discounted prices
  currency: "CAD", // CAD, USD, etc.
  currencySymbol: "$"
};

// BASE PRICING (Before discount)
// These are your standard retail prices
export const BASE_PRICING = {
  linearFootage: {
    narrow: { 
      '1': 46.86, // Level 1 - Narrow depth
      '2': 49.03, // Level 2 - Narrow depth  
      '3': 51.79, // Level 3 - Narrow depth
      '4': 55.01  // Level 4 - Narrow depth
    },
    wide: { 
      '1': 69.76, // Level 1 - Wide depth
      '2': 72.46, // Level 2 - Wide depth
      '3': 79.50, // Level 3 - Wide depth
      '4': 81.73  // Level 4 - Wide depth
    }
  },
  edges: {
    'square-wrap': 0.00,
    'bevel-edge': 0.00,
    'maple-bevel-edge': 58.00,  // Before discount
    'self-edge': 12.50,         // Before discount
    '180-underwrap': 0.00,
    'angle-wrap': 0.00,
    'k-nose': 0.00,
    'post-form': 0.00,
    'appliance': 0.00
  },
  splash: { 
    'side': 31.86 // Before discount
  },
  extras: {
    template: 152.46,    // Before discount
    installation: 26.19, // Before discount
    seam: 154.16,        // Before discount (Mitred Seam charge)
    buildup: 5.00,       // Before discount (Full Build-Up Standard 5/8" K-3)
    nonStandardDepth: 8.21 // Before discount
  }
};

// CALCULATED PRICING (After discount)
// This automatically applies the discount to base pricing
export const calculateDiscountedPricing = () => {
  const discountMultiplier = (100 - CUSTOMER_CONFIG.discountPercentage) / 100;
  
  return {
    linearFootage: {
      narrow: {
        '1': BASE_PRICING.linearFootage.narrow['1'] * discountMultiplier,
        '2': BASE_PRICING.linearFootage.narrow['2'] * discountMultiplier,
        '3': BASE_PRICING.linearFootage.narrow['3'] * discountMultiplier,
        '4': BASE_PRICING.linearFootage.narrow['4'] * discountMultiplier
      },
      wide: {
        '1': BASE_PRICING.linearFootage.wide['1'] * discountMultiplier,
        '2': BASE_PRICING.linearFootage.wide['2'] * discountMultiplier,
        '3': BASE_PRICING.linearFootage.wide['3'] * discountMultiplier,
        '4': BASE_PRICING.linearFootage.wide['4'] * discountMultiplier
      }
    },
    edges: {
      'square-wrap': BASE_PRICING.edges['square-wrap'],
      'bevel-edge': BASE_PRICING.edges['bevel-edge'],
      'maple-bevel-edge': BASE_PRICING.edges['maple-bevel-edge'] * discountMultiplier,
      'self-edge': BASE_PRICING.edges['self-edge'] * discountMultiplier,
      '180-underwrap': BASE_PRICING.edges['180-underwrap'],
      'angle-wrap': BASE_PRICING.edges['angle-wrap'],
      'k-nose': BASE_PRICING.edges['k-nose'],
      'post-form': BASE_PRICING.edges['post-form'],
      'appliance': BASE_PRICING.edges['appliance']
    },
    splash: {
      'side': BASE_PRICING.splash.side * discountMultiplier
    },
    extras: {
      template: BASE_PRICING.extras.template * discountMultiplier,
      installation: BASE_PRICING.extras.installation * discountMultiplier,
      seam: BASE_PRICING.extras.seam * discountMultiplier,
      buildup: BASE_PRICING.extras.buildup * discountMultiplier,
      nonStandardDepth: BASE_PRICING.extras.nonStandardDepth * discountMultiplier
    }
  };
};

// Export the discounted pricing for use in the app
export const PRICING = calculateDiscountedPricing();

// Utility function to format currency
export const formatCurrency = (amount) => {
  return `${CUSTOMER_CONFIG.currencySymbol}${amount.toFixed(2)}`;
};

// Utility function to get discount info
export const getDiscountInfo = () => {
  return {
    percentage: CUSTOMER_CONFIG.discountPercentage,
    multiplier: (100 - CUSTOMER_CONFIG.discountPercentage) / 100,
    displayText: CUSTOMER_CONFIG.discountPercentage > 0 
      ? `${CUSTOMER_CONFIG.discountPercentage}% customer discount applied`
      : 'Standard pricing'
  };
};
