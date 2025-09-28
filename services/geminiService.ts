
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedProfileData, UserProfile, Job, JobMatch, CandidateMatch } from "../types";
import { MOCK_JOBS, MOCK_CANDIDATE_PROFILES } from "../constants";

// FIX: Initialize GoogleGenAI with a named apiKey parameter as required by the new API.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

const extractedProfileSchema = {
  type: Type.OBJECT,
  properties: {
    professionalSkills: {
      type: Type.ARRAY,
      description: "List of 5-10 key professional skills (e.g., 'React', 'Project Management').",
      items: { type: Type.STRING }
    },
    informalSkills: {
      type: Type.ARRAY,
      description: "List of 3-5 key informal or soft skills (e.g., 'Team Leadership', 'Public Speaking').",
      items: { type: Type.STRING }
    },
    workSummary: { 
        type: Type.STRING,
        description: "A concise, professional summary of the user's work experience in 2-3 sentences."
    },
    marketability: {
      type: Type.OBJECT,
      description: "An analysis of the candidate's marketability.",
      properties: {
        score: { 
            type: Type.NUMBER,
            description: "A score from 0 to 100 representing how marketable the profile is, based on skills and experience."
        },
        topSkills: { 
            type: Type.ARRAY, 
            description: "The top 3 most valuable skills from the profile.",
            items: { type: Type.STRING } 
        },
        suggestedSkills: { 
            type: Type.ARRAY,
            description: "A list of 3 suggested skills the user could learn to improve their marketability.",
            items: { type: Type.STRING } 
        }
      },
      required: ['score', 'topSkills', 'suggestedSkills']
    }
  },
  required: ['professionalSkills', 'informalSkills', 'workSummary', 'marketability']
};


const jobMatchesSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            id: { 
                type: Type.STRING,
                description: "The unique ID of the matched job from the provided list."
            },
            matchScore: { 
                type: Type.NUMBER,
                description: "A score from 0 to 100 indicating how well the profile matches the job."
            },
            explanation: { 
                type: Type.STRING,
                description: "A brief, one-sentence explanation of why this job is a good match."
            }
        },
        required: ['id', 'matchScore', 'explanation']
    }
};

const candidateMatchesSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            email: {
                type: Type.STRING,
                description: "The email of the matched candidate from the provided list, used as a unique ID."
            },
            matchScore: { 
                type: Type.NUMBER,
                description: "A score from 0 to 100 indicating how well the candidate matches the job."
            },
            explanation: { 
                type: Type.STRING,
                description: "A brief, one-sentence explanation of why this candidate is a good match for the job."
            }
        },
        required: ['email', 'matchScore', 'explanation']
    }
};

export const extractProfileFromResume = async (resumeText: string): Promise<ExtractedProfileData> => {
    const prompt = `Analyze the following resume text and extract the user's profile information. Identify a mix of professional and informal skills, write a brief summary, and assess their marketability.

Resume:
---
${resumeText}
---
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: extractedProfileSchema,
            }
        });

        return JSON.parse(response.text) as ExtractedProfileData;
    } catch (error) {
        console.error("Error extracting profile from resume:", error);
        throw new Error("Failed to analyze resume. The AI model may be temporarily unavailable.");
    }
};


export const findJobMatches = async (profile: UserProfile): Promise<JobMatch[]> => {
    const prompt = `
Given the user profile below, find the top 5 best-matching jobs from the provided list. 
Return an array of objects, each containing the job 'id', a 'matchScore' (0-100), and a brief 'explanation'.
Only use jobs from the list provided. Do not invent new jobs.

User Profile:
---
Name: ${profile.name}
Work Summary: ${profile.workSummary}
Professional Skills: ${profile.professionalSkills.join(', ')}
Informal Skills: ${profile.informalSkills.join(', ')}
---

Available Jobs:
---
${JSON.stringify(MOCK_JOBS.map(j => ({id: j.id, title: j.title, description: j.description})))}
---
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: jobMatchesSchema,
            }
        });
        
        const matches: { id: string, matchScore: number, explanation: string }[] = JSON.parse(response.text);

        // Merge AI response with full job data
        const fullMatches: JobMatch[] = matches
            .map(match => {
                const jobDetails = MOCK_JOBS.find(j => j.id === match.id);
                if (!jobDetails) return null;
                return {
                    ...jobDetails,
                    matchScore: match.matchScore,
                    explanation: match.explanation
                };
            })
            .filter((m): m is JobMatch => m !== null)
            .sort((a, b) => b.matchScore - a.matchScore);
            
        return fullMatches;

    } catch (error) {
        console.error("Error finding job matches:", error);
        throw new Error("Failed to find job matches. The AI model may be temporarily unavailable.");
    }
};

export const findCandidatesForJob = async (job: Job): Promise<CandidateMatch[]> => {
     const prompt = `
Given the job description below, find the top 2 best-matching candidates from the provided list of profiles.
Return an array of objects, each containing the candidate's 'email' (as their ID), a 'matchScore' (0-100), and a brief 'explanation'.
Only use candidates from the list provided.

Job Description:
---
Title: ${job.title}
Description: ${job.description}
---

Available Candidate Profiles:
---
${JSON.stringify(MOCK_CANDIDATE_PROFILES.map(p => ({email: p.email, workSummary: p.workSummary, professionalSkills: p.professionalSkills, informalSkills: p.informalSkills})))}
---
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: candidateMatchesSchema,
            }
        });

        const matches: { email: string, matchScore: number, explanation: string }[] = JSON.parse(response.text);

        // Merge AI response with full candidate data
        const fullMatches: CandidateMatch[] = matches
            .map(match => {
                const profileDetails = MOCK_CANDIDATE_PROFILES.find(p => p.email === match.email);
                if (!profileDetails) return null;
                return {
                    profile: profileDetails,
                    matchScore: match.matchScore,
                    explanation: match.explanation
                };
            })
            .filter((m): m is CandidateMatch => m !== null)
            .sort((a, b) => b.matchScore - a.matchScore);
            
        return fullMatches;

    } catch (error) {
        console.error("Error finding candidates for job:", error);
        throw new Error("Failed to find candidates. The AI model may be temporarily unavailable.");
    }
};
