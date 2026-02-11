/**
 * Brand Configuration Hook
 *
 * This hook provides centralized access to brand configuration values
 * from environment variables. Use this instead of hardcoding brand names.
 *
 * Environment Variables:
 * - VITE_BRAND_NAME: Main brand name (defaults to VITE_APP_NAME)
 * - VITE_BRAND_LOGO_TEXT: Text displayed in the logo
 * - VITE_BRAND_HERO_TITLE: Title displayed in hero sections
 * - VITE_BRAND_COPYRIGHT_HOLDER: Name for copyright notices
 * - VITE_BRAND_SUPPORT_EMAIL: Support email address
 * - VITE_BRAND_SUPPORT_PHONE: Support phone number
 * - VITE_BRAND_ADDRESS: Physical address
 * - VITE_BRAND_META_DESCRIPTION: Default meta description
 */

export interface BrandConfig {
    name: string;
    logoText: string;
    heroTitle: string;
    copyrightHolder: string;
    supportEmail: string;
    supportPhone: string;
    address: string;
    metaDescription: string;
}

export function useBrand(): BrandConfig {
    const appName = import.meta.env.VITE_APP_NAME || 'Scholarship';

    return {
        name: import.meta.env.VITE_BRAND_NAME || appName,
        logoText: import.meta.env.VITE_BRAND_LOGO_TEXT || appName,
        heroTitle: import.meta.env.VITE_BRAND_HERO_TITLE || appName,
        copyrightHolder: import.meta.env.VITE_BRAND_COPYRIGHT_HOLDER || appName,
        supportEmail: import.meta.env.VITE_BRAND_SUPPORT_EMAIL || 'hello@example.com',
        supportPhone: import.meta.env.VITE_BRAND_SUPPORT_PHONE || '',
        address: import.meta.env.VITE_BRAND_ADDRESS || '',
        metaDescription:
            import.meta.env.VITE_BRAND_META_DESCRIPTION ||
            `${appName} provides financial support to high school and college students. Apply now for academic funding and mentorship opportunities.`,
    };
}

// Convenience exports for direct use
export const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarship';
export const brandLogoText = import.meta.env.VITE_BRAND_LOGO_TEXT || import.meta.env.VITE_APP_NAME || 'Scholarship';
export const brandHeroTitle = import.meta.env.VITE_BRAND_HERO_TITLE || import.meta.env.VITE_APP_NAME || 'Scholarship';
export const brandCopyrightHolder = import.meta.env.VITE_BRAND_COPYRIGHT_HOLDER || brandName;
export const brandSupportEmail = import.meta.env.VITE_BRAND_SUPPORT_EMAIL || 'hello@example.com';
export const brandSupportPhone = import.meta.env.VITE_BRAND_SUPPORT_PHONE || '';
export const brandAddress = import.meta.env.VITE_BRAND_ADDRESS || '';
export const brandMetaDescription =
    import.meta.env.VITE_BRAND_META_DESCRIPTION ||
    `${brandName} provides financial support to high school and college students. Apply now for academic funding and mentorship opportunities.`;
