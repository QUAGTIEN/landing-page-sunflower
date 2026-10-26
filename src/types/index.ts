export type RightsStatus =
  | "approved"
  | "illustrative_dev_only"
  | "stock_illustrative"
  | "placeholder_needed";

export interface AssetMedia {
  src: string;
  alt: string;
  caption?: string;
  sourceNote: string;
  rightsStatus: RightsStatus;
  aspectRatio?: "4:3" | "1:1" | "16:9";
}

export type ProductFamilyId =
  | "tem-nhan-cuon"
  | "tem-nhan-to"
  | "vat-tu-in"
  | "thiet-bi-ma-vach"
  | "bao-bi-phu-kien"
  | "nhan-may-mac";

export interface ProductFamily {
  id: ProductFamilyId;
  index: string;
  name: string;
  shortName: string;
  description: string;
}

export interface ProductSpecField {
  label: string;
  value: string;
  isTodo?: boolean;
}

export interface ProductCategory {
  id: number;
  slug: string;
  name: string;
  familyId: ProductFamilyId;
  familyName: string;
  summary: string;
  applications: string[];
  specifications: ProductSpecField[];
  quoteFields: string[];
  featuredOnHome?: boolean;
  image: AssetMedia;
}

export interface MaterialLayerSpec {
  id: string;
  index: string;
  code: string;
  nameVi: string;
  nameEn: string;
  role: string;
  typicalMaterials: string;
  colorHex: string;
  opacity: number;
}

export interface SolutionItem {
  slug: string;
  index: string;
  title: string;
  industryContext: string;
  buyerProblem: string;
  recommendedApproach: string;
  materialConsiderations: string[];
  confirmationPoints: string[];
  relatedProductSlugs: string[];
  image: AssetMedia;
}

export interface CapabilityItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  details: string[];
  verificationNote?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  categoryLabel: string;
  relatedProductSlug: string;
  challenge: string;
  specification: string;
  outcome: string;
  permissionToPublish: boolean;
  statusNote: string;
  image: AssetMedia;
}

export type InquiryPurpose =
  | "quote"
  | "consultation"
  | "partnership"
  | "other";

export interface ContactInquiryPayload {
  purpose: InquiryPurpose;
  contactName: string;
  email?: string;
  phone?: string;
  company?: string;
  productSlug?: string;
  solutionSlug?: string;
  projectSlug?: string;
  quantity?: string;
  dimensions?: string;
  materialPreference?: string;
  deliveryLocation?: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}
