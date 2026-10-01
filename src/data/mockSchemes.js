/**
 * mockSchemes.js
 * Sample government scheme records used by the Schemes page.
 * The content is simplified sample data for an academic demo - it is NOT
 * live or verified government information.
 */

// Filter categories available on the schemes page
export const SCHEME_CATEGORIES = ["All", "Central", "State", "Agriculture", "Farmer Support"];

/**
 * SCHEMES - sample records. Each entry keeps a simple shape so the page can
 * search, filter and open a details modal without extra logic.
 */
export const SCHEMES = [
  {
    // Unique identifier used as the React key
    id: "pm-kisan",
    // Scheme title
    title: "PM-KISAN (Sample Record)",
    // Category used by the filter chips
    category: "Central",
    // Implementing body shown on the card
    authority: "Ministry of Agriculture and Farmers Welfare",
    // Short description for the card
    summary:
      "Income support scheme that provides direct benefit transfers to eligible landholding farmer families.",
    // Sample benefit highlights
    benefits: [
      "Direct transfer of financial support to farmer families",
      "Paid in instalments through the banking system",
      "No middleman involvement in fund transfer",
    ],
    // Sample eligibility points
    eligibility: [
      "Landholding farmer families as defined by the scheme",
      "Applicant must have a valid bank account and Aadhaar linkage",
      "Institutional landholders are generally excluded",
    ],
    // Suggested mode of applying (sample text)
    applyMode: "Online portal / CSC centre",
    // Sample reference year for the record
    updated: "Sample data - 2026",
  },
  {
    id: "pm-fasal-bima",
    title: "Pradhan Mantri Fasal Bima Yojana (Sample Record)",
    category: "Central",
    authority: "Ministry of Agriculture and Farmers Welfare",
    summary:
      "Crop insurance scheme that offers risk cover to farmers against natural calamities, pests and diseases.",
    benefits: [
      "Insurance cover for notified crops",
      "Low premium share for farmers",
      "Claim support after notified crop loss events",
    ],
    eligibility: [
      "Farmers growing notified crops in notified areas",
      "Loanee farmers are enrolled compulsorily as per scheme rules",
      "Voluntary enrolment for non-loanee farmers",
    ],
    applyMode: "Online / through banks and CSCs",
    updated: "Sample data - 2026",
  },
  {
    id: "soil-health-card",
    title: "Soil Health Card Scheme (Sample Record)",
    category: "Agriculture",
    authority: "Department of Agriculture & Cooperation",
    summary:
      "Provides farmers with a soil test report and crop-wise nutrient recommendations for their plots.",
    benefits: [
      "Free soil testing of farmer samples",
      "Crop-wise nutrient recommendation report",
      "Helps reduce over-use of fertilizers",
    ],
    eligibility: [
      "All farmers with cultivable land",
      "Sample submission through local agriculture office",
      "Plot level details required at the time of sampling",
    ],
    applyMode: "Local agriculture office",
    updated: "Sample data - 2026",
  },
  {
    id: "kcc",
    title: "Kisan Credit Card (Sample Record)",
    category: "Farmer Support",
    authority: "NABARD / Partner Banks",
    summary:
      "Provides short term crop loans and working capital through a card based credit facility for farmers.",
    benefits: [
      "Easy access to crop loans at subsidised interest",
      "Flexible repayment linked to harvest cycles",
      "Covers post-harvest household and maintenance needs",
    ],
    eligibility: [
      "Farmers with cultivable land or tenant farmers",
      "Valid identity and land documents required",
      "Credit appraisal by the issuing bank",
    ],
    applyMode: "Bank branch / online banking portal",
    updated: "Sample data - 2026",
  },
  {
    id: "pm-krishi-sinchai",
    title: "Per Drop More Crop (Sample Record)",
    category: "Agriculture",
    authority: "Department of Agriculture & Farmers Welfare",
    summary:
      "Promotes micro-irrigation such as drip and sprinkler systems by offering subsidy support.",
    benefits: [
      "Subsidy support for drip and sprinkler installation",
      "Water saving on the farm",
      "Assistance for micro-irrigation related infrastructure",
    ],
    eligibility: [
      "Small and marginal farmers get higher assistance slabs",
      "Applicant must have a water source for micro-irrigation",
      "Installation through empanelled agencies",
    ],
    applyMode: "State horticulture / agriculture portal",
    updated: "Sample data - 2026",
  },
  {
    id: "maha-agri",
    title: "State Agriculture Subsidy Programme (Sample Record)",
    category: "State",
    authority: "State Department of Agriculture (sample)",
    summary:
      "Illustrative state level scheme offering support for farm equipment and modern implements.",
    benefits: [
      "Subsidy on purchase of selected farm machinery",
      "Support for custom hiring centre models",
      "Awareness and training sessions for beneficiaries",
    ],
    eligibility: [
      "Resident farmers of the respective state",
      "Land records or tenant certificate required",
      "Purchase from approved vendors only",
    ],
    applyMode: "State agriculture portal",
    updated: "Sample data - 2026",
  },
  {
    id: "e-nam",
    title: "e-NAM Market Access (Sample Record)",
    category: "Farmer Support",
    authority: "Small Farmers' Agri-Business Consortium",
    summary:
      "Online trading platform that connects regulated mandis so farmers can discover better prices.",
    benefits: [
      "Online bidding from multiple buyers",
      "Transparent price discovery",
      "Direct online payment to farmer accounts",
    ],
    eligibility: [
      "Farmer registration on the platform",
      "Produce must meet quality and lot specifications",
      "Bank account details required for payment",
    ],
    applyMode: "Online registration",
    updated: "Sample data - 2026",
  },
  {
    id: "kvk-training",
    title: "KVK Farmer Training Support (Sample Record)",
    category: "Agriculture",
    authority: "Indian Council of Agricultural Research",
    summary:
      "Krishi Vigyan Kendras provide local demonstrations, training and technical guidance to farmers.",
    benefits: [
      "Free or low cost training programmes",
      "On-field demonstrations of improved practices",
      "Advisory support from subject specialists",
    ],
    eligibility: [
      "Open to farmers in the KVK's district",
      "Prior registration for scheduled training",
      "Group participation encouraged",
    ],
    applyMode: "Direct KVK contact",
    updated: "Sample data - 2026",
  },
];

/**
 * filterSchemes - applies the search text and category filter to the schemes.
 * Both arguments are optional so the function can be reused anywhere.
 */
export const filterSchemes = (schemes, searchText = "", category = "All") => {
  // Lowercase the search term once for case-insensitive comparison
  const query = String(searchText).trim().toLowerCase();

  // Return the filtered array
  return schemes.filter((scheme) => {
    // When a category is chosen, only keep matching records
    const matchesCategory = category === "All" || scheme.category === category;
    // Build one searchable string from the main text fields
    const haystack = `${scheme.title} ${scheme.summary} ${scheme.authority} ${scheme.category}`.toLowerCase();
    // Keep the record only when the query is empty or appears in the haystack
    const matchesQuery = query === "" || haystack.includes(query);
    // Both conditions must be true for the record to stay
    return matchesCategory && matchesQuery;
  });
};
