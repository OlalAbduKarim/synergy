import React from 'react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { Job } from '../../types';
import { Check } from 'lucide-react';

interface MatchDetailsCardProps {
    job: Job;
    matchingSkills: string[];
}

const MatchDetailsCard: React.FC<MatchDetailsCardProps> = ({ job, matchingSkills }) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="text-xl font-semibold">Why you're a match</h3>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Matching Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {matchingSkills.map(skill => (
                            <Badge key={skill} variant="success">{skill}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">Key Responsibilities Alignment</h4>
                    <ul className="list-none space-y-2 mt-2">
                        {job.responsibilities.slice(0, 2).map((resp, i) => (
                             <li key={i} className="flex items-start text-sm text-neutral-600">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                {resp}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default MatchDetailsCard;
