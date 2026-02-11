import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, HeartHandshakeIcon, MousePointerIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const brandName = import.meta.env.VITE_BRAND_NAME || import.meta.env.VITE_APP_NAME || 'Scholarships';
const brandHeroTitle = import.meta.env.VITE_BRAND_HERO_TITLE || brandName;

// Animated step card component
interface StepCardProps {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    delay: number;
}

function StepCard({ number, title, description, icon, delay }: StepCardProps) {
    return (
        <motion.div
            className="bg-card relative flex flex-col rounded-xl border p-6 shadow-sm transition-all hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            <div className="bg-primary text-primary-foreground absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                {number}
            </div>
            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">{icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </motion.div>
    );
}

// Scholarship card component with hover effects
interface ScholarshipCardProps {
    title: string;
    amount: string;
    type: string;
    requirements: string;
    icon: React.ReactNode;
    delay: number;
}

function ScholarshipCard({ title, amount, type, requirements, icon, delay }: ScholarshipCardProps) {
    return (
        <motion.div
            className="group bg-card relative overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay }}
        >
            {/* Background gradient that appears on hover */}
            <div className="from-primary/5 to-primary/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <Badge className="mb-2">{type}</Badge>
                        <h3 className="text-xl font-bold">{title}</h3>
                    </div>
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">{icon}</div>
                </div>

                <div className="mb-4">
                    <div className="text-primary text-3xl font-bold">{amount}</div>
                    <div className="text-muted-foreground text-sm">Scholarship Award</div>
                </div>

                <div className="text-muted-foreground mb-4 text-sm">
                    <div className="flex items-center gap-2">
                        <CheckCircle2Icon className="text-primary h-4 w-4" />
                        <span>{requirements}</span>
                    </div>
                </div>

                <Button asChild className="group w-full">
                    <Link href={route('register')}>
                        Apply Now
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
        </motion.div>
    );
}

// Animated statistic component
interface StatProps {
    value: string;
    label: string;
    icon: React.ReactNode;
    delay: number;
}

function AnimatedStat({ value, label, icon, delay }: StatProps) {
    return (
        <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            <div className="bg-primary/10 text-primary mb-3 flex h-14 w-14 items-center justify-center rounded-full">{icon}</div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-muted-foreground text-sm">{label}</div>
        </motion.div>
    );
}

// Animated scroll indicator
function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
            initial={{ opacity: 1, y: 0 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
        >
            <span className="text-muted-foreground mb-2 text-sm">Scroll to explore</span>
            <div className="border-primary/30 flex h-10 w-6 items-start justify-center rounded-full border-2 p-1">
                <motion.div
                    className="bg-primary h-1.5 w-1.5 rounded-full"
                    animate={{
                        y: [0, 4, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut',
                    }}
                />
            </div>
        </motion.div>
    );
}

// Main hero section component
export function HeroSection() {
    // State is managed by useEffect
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Add parallax effect on scroll
        const handleScroll = () => {
            if (heroRef.current) {
                const scrollY = window.scrollY;
                const heroElement = heroRef.current;
                const parallaxElements = heroElement.querySelectorAll('.parallax');

                parallaxElements.forEach((element, index) => {
                    const speed = 0.1 + index * 0.05;
                    const yPos = scrollY * speed;
                    (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={heroRef} className="bg-background relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="bg-primary/5 parallax absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.5 }}
                />
                <motion.div
                    className="bg-primary/5 parallax absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                />
            </div>

            {/* Scroll indicator */}
            <ScrollIndicator />

            {/* Main content */}
            <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* Hero header */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm">
                            <span className="bg-primary mr-2 inline-block h-2 w-2 animate-pulse rounded-full"></span>
                            Applications Open for 2024-2025
                        </Badge>
                    </motion.div>

                    <motion.h1
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="block">Unlock Your Potential with</span>
                        <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">{brandHeroTitle}</span>
                    </motion.h1>

                    <motion.p
                        className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Empowering exceptional students through financial support, mentorship, and community engagement to build the leaders of
                        tomorrow.
                    </motion.p>

                    <motion.div
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Button asChild size="lg" className="group">
                            <Link href={route('register')}>
                                Start Your Application
                                <motion.div
                                    className="ml-2 inline-flex"
                                    whileHover={{
                                        scale: [1, 1.2, 0.9, 1.1, 1],
                                        rotate: [0, 0, 10, -10, 0],
                                        transition: { duration: 0.5 },
                                    }}
                                >
                                    <MousePointerIcon className="h-4 w-4" />
                                </motion.div>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="#scholarships" className="group">
                                Explore Scholarships
                                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Stats section */}
                <div className="mt-20">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <AnimatedStat value="100+" label="Scholars Supported" icon={<UsersIcon className="h-6 w-6" />} delay={1.4} />
                        <AnimatedStat value="$750,000" label="Annual Funding" icon={<BookOpenIcon className="h-6 w-6" />} delay={1.5} />
                        <AnimatedStat value="85%" label="Graduation Rate" icon={<TrendingUpIcon className="h-6 w-6" />} delay={1.6} />
                        <AnimatedStat value="1,000+" label="Service Hours" icon={<HeartHandshakeIcon className="h-6 w-6" />} delay={1.7} />
                    </div>
                </div>
            </div>
        </div>
    );
}
