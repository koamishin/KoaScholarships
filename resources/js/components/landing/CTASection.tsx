import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';

const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarships';

export function CTASection() {
    return (
        <div className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to Begin Your Scholarship Journey?</h2>
                    <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl text-lg">
                        Take the first step toward academic success and financial support. Apply for a {brandName} today and invest in your future.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent"
                        >
                            <Link href={route('register')}>Create Account</Link>
                        </Button>
                        <Button asChild size="lg" className="text-primary bg-white hover:bg-white/90">
                            <Link href={route('login')}>
                                Apply Now
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
