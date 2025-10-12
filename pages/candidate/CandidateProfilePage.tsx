import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, PlusCircle, Linkedin, Github, Globe, Upload, Trash2, Save } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

import useAuth from '../../hooks/useAuth';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Input from '../../components/ui/Input';
import { getMyProfile, updateBasicProfile, updateCandidateProfile, addSkill, deleteSkill } from '../../services/profileService';
import { CandidateProfile, SkillCategory, Availability, WorkType, Skill } from '../../types';
import { formatDate } from '../../lib/utils';


const SectionHeader: React.FC<{ title: string, onEdit: () => void, isEditing: boolean, onSave?: () => void, onCancel: () => void, isSaving?: boolean }> = 
({ title, onEdit, isEditing, onSave, onCancel, isSaving }) => (
    <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        {isEditing ? (
             <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSaving}>Cancel</Button>
                <Button size="sm" onClick={onSave} disabled={isSaving}>
                    {isSaving ? <Spinner size="sm"/> : <Save className="mr-2 h-4 w-4" />} Save
                </Button>
            </div>
        ) : (
            <Button variant="ghost" size="sm" onClick={onEdit}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
        )}
    </div>
);


const CandidateProfilePage: React.FC = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    
    const { data: profile, isLoading, error } = useQuery<CandidateProfile>({
        queryKey: ['my-profile'],
        queryFn: getMyProfile as () => Promise<CandidateProfile>,
        enabled: !!user,
    });

    const { register, handleSubmit, control } = useForm({
        values: {
            about: profile?.about,
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateCandidateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
            setIsEditingAbout(false);
        },
    });
    
    const addSkillMutation = useMutation({
        mutationFn: addSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
        },
    });

    const deleteSkillMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-profile'] });
        },
    });

    const handleAboutSave = (data: any) => {
        updateProfileMutation.mutate(data);
    };

    const handleAddSkill = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const newSkill: Omit<Skill, 'id'> = {
            name: form.skillName.value,
            category: form.skillCategory.value as SkillCategory,
            proficiency: parseInt(form.skillProficiency.value, 10),
        };
        addSkillMutation.mutate(newSkill);
        form.reset();
    };

    if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
    if (error) return <div className="text-red-500">Failed to load profile.</div>;
    if (!profile) return null;

    const profileCompletion = 75; // This can be calculated based on profile fields

    return (
        <div className="space-y-8">
             <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-primary-500 text-white flex items-center justify-center text-4xl font-bold">
                        {profile.fullName.charAt(0)}
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{profile.fullName}</h1>
                        <p className="text-neutral-500 mt-1">{profile.experience?.[0]?.jobTitle} at {profile.experience?.[0]?.companyName}</p>
                        <p className="text-neutral-500 text-sm">{profile.location}</p>
                        <div className="flex justify-center md:justify-start gap-4 mt-2">
                           {profile.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" /></a>}
                           {profile.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" /></a>}
                           {profile.socialLinks?.portfolio && <a href={profile.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"><Globe className="h-5 w-5 text-neutral-400 hover:text-primary-600 cursor-pointer" /></a>}
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
                        <CardHeader>
                            <SectionHeader title="About" 
                                isEditing={isEditingAbout}
                                onEdit={() => setIsEditingAbout(true)}
                                onCancel={() => setIsEditingAbout(false)}
                                onSave={handleSubmit(handleAboutSave)}
                                isSaving={updateProfileMutation.isPending}
                            />
                        </CardHeader>
                        <CardContent>
                           {isEditingAbout ? (
                               <textarea {...register('about')} className="w-full mt-1 p-2 border rounded-md" rows={5}></textarea>
                           ) : (
                                <p className="text-neutral-600 leading-relaxed">{profile.about || 'Tell us about yourself...'}</p>
                           )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><SectionHeader title="Work Experience" isEditing={false} onEdit={()=>{}} onCancel={()=>{}} /></CardHeader>
                        <CardContent className="space-y-6">
                            {profile.experience?.map(exp => (
                                <div key={exp.id}>
                                    <h4 className="font-semibold">{exp.jobTitle}</h4>
                                    <p className="text-sm text-neutral-600">{exp.companyName} | {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    <p className="text-sm text-neutral-500 mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader><SectionHeader title="Education" isEditing={false} onEdit={()=>{}} onCancel={()=>{}} /></CardHeader>
                        <CardContent>
                             {profile.education?.map(edu => (
                                <div key={edu.id}>
                                    <h4 className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</h4>
                                    <p className="text-sm text-neutral-600">{edu.institution} | {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                     <Card>
                        <CardHeader>
                            <SectionHeader title="Skills"
                                isEditing={isEditingSkills}
                                onEdit={() => setIsEditingSkills(true)}
                                onCancel={() => setIsEditingSkills(false)}
                                onSave={() => setIsEditingSkills(false)}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills?.map(skill => (
                                    <Badge key={skill.id} variant="primary" className="flex items-center">
                                        {skill.name}
                                        {isEditingSkills && (
                                            <button onClick={() => deleteSkillMutation.mutate(skill.id)} className="ml-2 hover:text-red-500" disabled={deleteSkillMutation.isPending}>
                                                <Trash2 size={12}/>
                                            </button>
                                        )}
                                    </Badge>
                                ))}
                            </div>
                            {isEditingSkills && (
                                <form onSubmit={handleAddSkill} className="mt-4 space-y-2 border-t pt-4">
                                    <Input name="skillName" placeholder="Skill name (e.g., React)" required/>
                                    <select name="skillCategory" className="w-full p-2 border rounded-md" required>
                                        {Object.values(SkillCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <div>
                                        <label className="text-sm">Proficiency (1-5)</label>
                                        <input name="skillProficiency" type="range" min="1" max="5" defaultValue="3" className="w-full" required/>
                                    </div>
                                    <Button type="submit" size="sm" className="w-full" disabled={addSkillMutation.isPending}>
                                        {addSkillMutation.isPending ? <Spinner size="sm" /> : <PlusCircle className="mr-2 h-4 w-4" />} Add Skill
                                    </Button>
                                </form>
                            )}
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
