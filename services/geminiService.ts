
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedProfileData, UserProfile, Job, JobMatch, CandidateMatch } from '../types';
import { MOCK_JOBS, MOCK_CANDIDATE_PROFILES } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function extractProfileFromResume(resumeText: string): Promise<ExtractedProfileData> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert HR recruitment assistant. Analyze the following resume text. Your tasks are to:
1. Extract the user's professional skills (technical or certified abilities).
2. Extract informal skills (practical, non-certified abilities like 'banana plantation experience' or 'local market negotiation').
3. Write a concise summary of their work experience.
4. Calculate a 'marketability score' from 0 to 100 based on the quality and demand for their skills.
5. Identify the top 3-5 skills from the resume that contribute most positively to this score.
6. Suggest 3-5 skills the user could acquire to improve their marketability, based on their current profile.

Resume Text:
---
${resumeText}
---

Structure your response in the specified JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            professionalSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of professional or technical skills.'
            },
            informalSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of informal, practical, or non-certified skills.'
            },
            workSummary: {
              type: Type.STRING,
              description: 'A concise summary of the candidate\'s work experience.'
            },
            marketability: {
                type: Type.OBJECT,
                description: "An analysis of the user's marketability.",
                properties: {
                    score: {
                        type: Type.INTEGER,
                        description: 'A score from 0-100 representing how marketable the skills are.'
                    },
                    topSkills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'List of skills that most positively impact the score.'
                    },
                    suggestedSkills: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'List of skills the user could learn to improve their score.'
                    }
                }
            }
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ExtractedProfileData;
  } catch (error) {
    console.error("Error extracting profile from resume:", error);
    throw new Error("Failed to analyze resume with AI. Please try again.");
  }
}

function formatAvailabilityForPrompt(availability: UserProfile['availability']): string {
    const availableDays = Object.entries(availability.schedule)
        .filter(([, details]) => details.isAvailable)
        .map(([day, details]) => `${day} (${details.startTime} - ${details.endTime})`);

    if (availableDays.length === 0) {
        return "User has not specified their availability.";
    }

    return `Available on ${availableDays.join(', ')}. Timezone: ${availability.timezone}.`;
}

export async function findJobMatches(profile: UserProfile): Promise<JobMatch[]> {
  const matches: JobMatch[] = [];
  const availabilityText = formatAvailabilityForPrompt(profile.availability);

  for (const job of MOCK_JOBS) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an AI job matching algorithm. Based on the provided user profile and the job description, calculate a 'Super Match' score from 0 to 100. Then, provide a detailed explanation for the score. The explanation must specifically mention how the user's professional and informal skills align with the key requirements in the job description and justify why the score was given. Also consider their availability.
        
User Profile:
---
Work Summary: ${profile.workSummary}
Professional Skills: ${profile.professionalSkills.join(', ')}
Informal Skills: ${profile.informalSkills.join(', ')}
Availability: ${availabilityText}
---

Job Description:
---
Title: ${job.title} at ${job.company}
Description: ${job.description}
---

Provide your response in the specified JSON format. The explanation should be detailed and insightful, directly connecting the user's skills to the job's needs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchScore: {
                type: Type.INTEGER,
                description: 'A match score from 0 to 100.'
              },
              explanation: {
                type: Type.STRING,
                description: 'A detailed explanation for the match, linking user skills to job requirements and justifying the score.'
              },
            },
          },
        },
      });
      const jsonText = response.text.trim();
      const matchResult = JSON.parse(jsonText);
      
      if (matchResult.matchScore >= 70) { // Only add high matches
          matches.push({ ...job, ...matchResult });
      }

    } catch (error) {
      console.error(`Error matching job ${job.id}:`, error);
      // Continue to the next job even if one fails
    }
  }

  // Sort matches by score in descending order
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

export async function findCandidatesForJob(job: Job): Promise<CandidateMatch[]> {
    const matches: CandidateMatch[] = [];

    for (const profile of MOCK_CANDIDATE_PROFILES) {
        try {
            const availabilityText = formatAvailabilityForPrompt(profile.availability);
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `You are an AI recruitment algorithm. Based on the candidate's profile and the job description, calculate a match score from 0 to 100. Then, provide a concise explanation for why this candidate is a good match, focusing on how their skills meet the job's key requirements.

Job Description:
---
Title: ${job.title} at ${job.company}
Description: ${job.description}
---

Candidate Profile:
---
Name: ${profile.name}
Work Summary: ${profile.workSummary}
Professional Skills: ${profile.professionalSkills.join(', ')}
Informal Skills: ${profile.informalSkills.join(', ')}
Availability: ${availabilityText}
---

Provide your response in the specified JSON format. The explanation should be concise and directly link the candidate's skills to the job needs.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            matchScore: {
                                type: Type.INTEGER,
                                description: 'A match score from 0 to 100.'
                            },
                            explanation: {
                                type: Type.STRING,
                                description: 'A concise explanation for the match.'
                            },
                        },
                    },
                },
            });

            const jsonText = response.text.trim();
            const matchResult = JSON.parse(jsonText);

            if (matchResult.matchScore >= 70) {
                matches.push({ profile, ...matchResult });
            }
        } catch (error) {
            console.error(`Error matching candidate ${profile.name} for job ${job.id}:`, error);
        }
    }

    return matches.sort((a, b) => b.matchScore - a.matchScore);
}
