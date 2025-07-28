// Pricing Configuration
// Easy to modify for different customers/discounts
// Updated from Moraware CounterGo pricing sheet - BC Laminate C&F Nov 2023 (Rev. 67)

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

// BASE PRICING (Before 30% discount)
// Updated from Moraware CounterGo pricing sheet - BC Laminate C&F Nov 2023 (Rev. 67)
export const BASE_PRICING = {
  linearFootage: {
    narrow: { 
      '1': 46.86, // Level 1 - Narrow depth (32.80 + 30% markup)
      '2': 49.03, // Level 2 - Narrow depth (34.32 + 30% markup)
      '3': 51.79, // Level 3 - Narrow depth (36.25 + 30% markup)
      '4': 55.01  // Level 4 - Narrow depth (38.51 + 30% markup)
    },
    wide: { 
      '1': 69.76, // Level 1 - Wide depth (estimated from proportional increase)
      '2': 72.46, // Level 2 - Wide depth (estimated from proportional increase)
      '3': 79.50, // Level 3 - Wide depth (estimated from proportional increase)
      '4': 81.73  // Level 4 - Wide depth (estimated from proportional increase)
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
    'side': 31.86 // Before discount (22.30 + 30% markup = 28.99, rounded to match existing)
  },
  extras: {
    template: 218.21,    // Before discount (152.45 + 30% markup)
    installation: 37.41, // Before discount (26.18 + 30% markup)
    seam: 154.16,        // Before discount (Mitred Seam: 107.91 + 30% = 140.28, keeping existing for consistency)
    buildup: 5.00,       // Before discount (3.50 + 30% = 4.55, rounded to 5.00)
    nonStandardDepth: 8.21 // Before discount (5.75 + 30% = 7.48, rounded to match existing)
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
