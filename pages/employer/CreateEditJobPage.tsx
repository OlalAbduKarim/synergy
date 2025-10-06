import React from 'react';
import { useParams } from 'react-router-dom';
import { Save, Eye } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateEditJobPage: React.FC = () => {
    const { jobId } = useParams();
    const isEditing = !!jobId;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{isEditing ? 'Edit Job' : 'Create New Job'}</h1>
                <div className="flex gap-2">
                    <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
                    <Button><Save className="mr-2 h-4 w-4" /> {isEditing ? 'Save Changes' : 'Publish Job'}</Button>
                </div>
            </div>

            <Card>
                <CardHeader><h3 className="text-xl font-semibold">Basic Information</h3></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Job Title</label>
                        <Input placeholder="e.g., Senior Frontend Engineer" />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Job Description</label>
                        <textarea className="w-full mt-1 p-2 border rounded-md" rows={6} placeholder="Describe the role..."></textarea>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><h3 className="text-xl font-semibold">Details</h3></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input placeholder="e.g., San Francisco, CA or Remote" />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Work Type</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                            <option>On-site</option>
                            <option>Hybrid</option>
                            <option>Remote</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Employment Type</label>
                        <select className="w-full mt-1 p-2 border rounded-md">
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Salary Range (Optional)</label>
                        <div className="flex gap-2">
                           <Input type="number" placeholder="Min" />
                           <Input type="number" placeholder="Max" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><h3 className="text-xl font-semibold">Required Skills</h3></CardHeader>
                <CardContent>
                    <Input placeholder="Type a skill and press Enter (e.g., React)" />
                    <div className="flex flex-wrap gap-2 mt-4">
                        {/* Selected skills would go here */}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateEditJobPage;