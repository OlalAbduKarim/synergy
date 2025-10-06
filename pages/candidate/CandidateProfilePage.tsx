import React from 'react';
import { Edit, PlusCircle, Linkedin, Github, Globe, Upload } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Button variant="ghost" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
    </div>
);

const CandidateProfilePage: React.FC = () => {
    const { user } = useAuth();
    const profileCompletion = 75;

    return (
        <div className="space-y-8">
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-primary-500 text-white flex items-center justify-center text-4xl font-bold">
                        {user?.fullName.charAt(0)}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{user?.fullName}</h1>
                        <p className="text-neutral-500 mt-1">Senior Frontend Engineer at Innovate Inc.</p>
                        <p className="text-neutral-500 text-sm">{user?.location}</p>
                        <div className="flex justify-center md:justify-start gap-4 mt-2">
                            <Linkedin className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" />
                            <Github className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" />
                            <Globe className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" />
                        </div>
                    </div>
                    <div className="ml-auto text-center">
                         <p className="text-sm font-medium">Profile Completion</p>
                         <div className="w-full bg-neutral-200 rounded-full h-2.5 mt-1">
                            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">{profileCompletion}% Complete</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><SectionHeader title="About" /></CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 leading-relaxed">
                                Passionate Frontend Engineer with 5+ years of experience in building responsive and performant web applications using React and TypeScript. Proven ability to collaborate with cross-functional teams to deliver high-quality software solutions.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><SectionHeader title="Work Experience" /></CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-semibold">Senior Frontend Engineer</h4>
                                <p className="text-sm text-neutral-600">Innovate Inc. | Jan 2021 - Present</p>
                                <p className="text-sm text-neutral-500 mt-1">Led the development of a new design system, improving component reusability by 40%.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Frontend Developer</h4>
                                <p className="text-sm text-neutral-600">Solutions Co. | Jun 2018 - Dec 2020</p>
                                <p className="text-sm text-neutral-500 mt-1">Developed and maintained client-facing features for a large-scale e-commerce platform.</p>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><SectionHeader title="Education" /></CardHeader>
                        <CardContent>
                             <div>
                                <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                                <p className="text-sm text-neutral-600">University of Technology | 2014 - 2018</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                     <Card>
                        <CardHeader><SectionHeader title="Skills" /></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge variant="primary">React</Badge>
                            <Badge variant="primary">TypeScript</Badge>
                            <Badge variant="primary">Node.js</Badge>
                            <Badge variant="primary">GraphQL</Badge>
                            <Badge variant="primary">Figma</Badge>
                            <Badge variant="primary">Jest</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><h3 className="text-xl font-semibold">Resume</h3></CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                <Upload className="mr-2 h-4 w-4" /> Upload Resume
                            </Button>
                            <p className="text-xs text-center text-neutral-500 mt-2">PDF, DOC, DOCX up to 5MB</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfilePage;