import api from './api';
import { User, UserRole } from '../types';

interface AuthResponse {
    session: {
        access_token: string;
    };
    user: {
        id: string;
        email: string;
        profile: {
            full_name: string;
            user_type: UserRole;
            location?: string;
            company_name?: string;
        }
    };
}

const mapUserFromApi = (apiUser: AuthResponse['user']): User => ({
    id: apiUser.id,
    email: apiUser.email,
    fullName: apiUser.profile.full_name,
    role: apiUser.profile.user_type,
    location: apiUser.profile.location,
    companyName: apiUser.profile.company_name,
});

export const signIn = async (credentials: any): Promise<{ user: User, token: string }> => {
    const { data } = await api.post<AuthResponse>('/auth/signin', credentials);
    return {
        user: mapUserFromApi(data.user),
        token: data.session.access_token,
    };
};

export const signUp = async (userData: any): Promise<{ user: User, token: string }> => {
    // Map frontend role to backend user_type and other fields
    const apiUserData = {
        email: userData.email,
        password: userData.password,
        profile: {
            full_name: userData.fullName,
            user_type: userData.role,
            location: userData.location,
            company_name: userData.companyName,
        }
    };
    const { data } = await api.post<AuthResponse>('/auth/signup', apiUserData);
    return {
        user: mapUserFromApi(data.user),
        token: data.session.access_token,
    };
};

export const signOut = async () => {
    await api.post('/auth/signout');
};

export const getMe = async (): Promise<User> => {
    // This endpoint returns a slightly different user structure than login/signup
    const { data } = await api.get<{
        id: string;
        email: string;
        profile: {
            full_name: string;
            user_type: UserRole;
            location?: string;
            company_name?: string;
        }
    }>('/auth/me');
    
    return {
        id: data.id,
        email: data.email,
        fullName: data.profile.full_name,
        role: data.profile.user_type,
        location: data.profile.location,
        companyName: data.profile.company_name,
    };
};
