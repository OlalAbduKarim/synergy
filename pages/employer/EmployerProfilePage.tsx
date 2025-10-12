import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Save, Building, PlusCircle } from 'lucide-react';

import useAuth from '../../hooks/useAuth';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';
import { getMyProfile, updateEmployerProfile, updateBasicProfile } from '../../services/profileService';
import { EmployerProfile } from '../../types';

const EmployerProfilePage: React.FC = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: profile, isLoading, error } = useQuery<EmployerProfile>({
        queryKey: ['my-profile'],
        queryFn: getMyProfile as () => Promise<EmployerProfile>,
        enabled: !!user,
    });

    const { register, handleSubmit, formState: { isDirty } } = useForm<EmployerProfile>({
        values: profile
    });
    
    const mutation = useMutation({
        mutationFn: async (formData: EmployerProfile) => {
            // This is a simplified approach. In a real app, you might want to separate
            // basic info (fullName, location) from employer-specific info.
            await updateBasicProfile(formData); 
            await updateEmployerProfile(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
        },
    });

    const onSubmit = (data: EmployerProfile) => {
        mutation.mutate(data);
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
    if (error) return <div className="text-red-500">Failed to load profile.</div>;
    if (!profile) return null;
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Company Profile</h1>
                <Button type="submit" disabled={mutation.isPending || !isDirty}>
                    {mutation.isPending ? <Spinner size="sm"/> : <Save className="mr-2 h-4 w-4" />} Save Changes
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Building className="h-8 w-8 text-primary-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{profile.companyName}</h2>
                            <p className="text-neutral-500">Technology & Software</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium">Company Name</label>
                        <Input {...register('companyName')} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Your Full Name</label>
                        <Input {...register('fullName')} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Location</label>
                        <Input {...register('location')} />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Website</label>
                        <Input {...register('companyWebsite')} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Company Size</label>
                        <Input {...register('companySize')} />
                    </div>
                     <div>
                        <label className="text-sm font-medium">Founded Year</label>
                        <Input type="number" {...register('foundedYear')} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm font-medium">Company Culture</label>
                        <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} {...register('companyCulture')}></textarea>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Benefits</h3>
                        <Button variant="ghost" size="sm" type="button"><PlusCircle className="mr-2 h-4 w-4" /> Add Benefit</Button>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {profile.benefits?.map(benefit => (
                         <Badge key={benefit} variant="success">{benefit}</Badge>
                    ))}
                </CardContent>
            </Card>
        </form>
    );
};

export default EmployerProfilePage;
