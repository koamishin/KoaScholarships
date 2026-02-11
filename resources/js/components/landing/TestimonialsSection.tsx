import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarships';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: `The ${brandName} has been life-changing. Not only did it ease my financial burden, but the community service component helped me grow as a person.`,
            name: 'Maria Santos',
            role: 'College Scholar',
            initials: 'MS',
        },
        {
            quote: 'As a high school student, the Future Leaders Scholarship gave me confidence and resources to pursue my academic goals. The mentorship was invaluable.',
            name: 'James Wilson',
            role: 'High School Scholar',
            initials: 'JW',
        },
        {
            quote: `The application process was straightforward, and the support from the ${brandName} team throughout my academic journey has been exceptional.`,
            name: 'Sophia Chen',
            role: 'College Scholar',
            initials: 'SC',
        },
    ];

    return (
        <div className="bg-muted/50 py-16 md:py-24" id="testimonials">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Scholar Testimonials</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Hear from students whose academic journeys have been transformed by the {brandName} program.
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-card border">
                            <CardContent className="p-6">
                                <QuoteIcon className="text-primary/20 mb-4 h-8 w-8" />
                                <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                                <div className="flex items-center">
                                    <Avatar className="mr-3 h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary">{testimonial.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{testimonial.name}</p>
                                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
