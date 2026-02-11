import { DollarSignIcon, GraduationCapIcon, HeartHandshakeIcon, UsersIcon } from 'lucide-react';

const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarships';

export function StatsSection() {
    const stats = [
        {
            icon: GraduationCapIcon,
            value: '100+',
            label: 'Scholars Supported',
            description: 'Students receiving financial aid annually',
        },
        {
            icon: DollarSignIcon,
            value: '$750K',
            label: 'Scholarship Funding',
            description: 'Total annual scholarship budget',
        },
        {
            icon: HeartHandshakeIcon,
            value: '1,000+',
            label: 'Service Hours',
            description: 'Community service completed by scholars',
        },
        {
            icon: UsersIcon,
            value: '85%',
            label: 'Graduation Rate',
            description: 'Scholars who complete their degrees',
        },
    ];

    return (
        <div className="bg-muted py-16" id="impact">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Impact</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        The {brandName} program has made a significant difference in the lives of students and communities.
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card rounded-lg border p-6 text-center shadow-sm">
                            <div className="bg-primary/10 mb-4 inline-flex items-center justify-center rounded-full p-3">
                                <stat.icon className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="mb-1 text-3xl font-bold">{stat.value}</h3>
                            <p className="mb-2 text-sm font-medium">{stat.label}</p>
                            <p className="text-muted-foreground text-xs">{stat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
