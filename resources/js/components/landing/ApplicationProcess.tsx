import { BanknoteIcon, CheckIcon, ClipboardCheckIcon, FileTextIcon, HeartHandshakeIcon, UserIcon } from 'lucide-react';

const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarships';

export function ApplicationProcess() {
    const steps = [
        {
            icon: UserIcon,
            title: 'Create Profile',
            description: 'Sign up and complete your student profile with personal and academic information.',
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
        },
        {
            icon: FileTextIcon,
            title: 'Apply for Scholarship',
            description: 'Select a scholarship program that matches your academic level and submit your application.',
            color: 'text-purple-500',
            bgColor: 'bg-purple-50 dark:bg-purple-950/30',
        },
        {
            icon: ClipboardCheckIcon,
            title: 'Upload Documents',
            description: 'Submit all required documentation to verify your eligibility for the scholarship.',
            color: 'text-orange-500',
            bgColor: 'bg-orange-50 dark:bg-orange-950/30',
        },
        {
            icon: CheckIcon,
            title: 'Application Review',
            description: 'Our team will review your application and documents to determine eligibility.',
            color: 'text-green-500',
            bgColor: 'bg-green-50 dark:bg-green-950/30',
        },
        {
            icon: HeartHandshakeIcon,
            title: 'Complete Service',
            description: 'Fulfill your community service requirement as part of the scholarship program.',
            color: 'text-red-500',
            bgColor: 'bg-red-50 dark:bg-red-950/30',
        },
        {
            icon: BanknoteIcon,
            title: 'Receive Funding',
            description: 'Once approved and service is completed, scholarship funds will be disbursed.',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
        },
    ];

    return (
        <div className="bg-background py-16 md:py-24" id="process">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Application Process</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Follow these simple steps to apply for a {brandName} and begin your journey toward academic success.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.bgColor} mb-4`}>
                                    <step.icon className={`h-6 w-6 ${step.color}`} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="mb-2 flex items-center text-lg font-semibold">
                                        <span className="mr-2">{index + 1}.</span> {step.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-muted border-border mt-12 rounded-lg border p-6">
                        <h3 className="mb-3 text-lg font-semibold">Important Dates</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Application Deadline</span>
                                <span className="text-muted-foreground">3 months from now</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Document Submission</span>
                                <span className="text-muted-foreground">Within 2 weeks of application</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Application Review Period</span>
                                <span className="text-muted-foreground">2-4 weeks after submission</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Community Service Completion</span>
                                <span className="text-muted-foreground">Before end of semester</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
