import AppLogoIcon from './app-logo-icon';

const brandLogoText = import.meta.env.VITE_BRAND_LOGO_TEXT || import.meta.env.VITE_APP_NAME || 'Scholarship';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-background/50 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{brandLogoText}</span>
            </div>
        </>
    );
}
