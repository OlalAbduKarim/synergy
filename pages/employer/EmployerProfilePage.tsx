import React from 'react';
import { Save, Building, Globe, Users, Calendar, PlusCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const EmployerProfilePage: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Company Profile</h1>
                <Button><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Building className="h-8 w-8 text-primary-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{user?.companyName}</h2>
                            <p className="text-neutral-500">Technology & Software</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium">Company Name</label>
                        <Input defaultValue={user?.companyName} />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Website</label>
                        <Input defaultValue="https://innovateinc.com" />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Company Size</label>
                        <Input defaultValue="51-200 employees" />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Founded Year</label>
                        <Input defaultValue="2015" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Company Culture</label>
                        <textarea className="w-full mt-1 p-2 border rounded-md" rows={4}>
                            At Innovate Inc., we foster a culture of collaboration, innovation, and continuous learning. We believe in empowering our employees to take ownership and make a real impact.
                        </textarea>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Benefits</h3>
                        <Button variant="ghost" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Benefit</Button>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Badge variant="success">401(k) Matching</Badge>
                    <Badge variant="success">Health Insurance</Badge>
                    <Badge variant="success">Unlimited PTO</Badge>
                    <Badge variant="success">Remote Work</Badge>
                    <Badge variant="success">Paid Parental Leave</Badge>
                    <Badge variant="success">Professional Development</Badge>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployerProfilePage;