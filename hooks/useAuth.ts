
import useAuthStore from '../store/authStore';

const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, setUser } = useAuthStore();
  return { user, token, isAuthenticated, login, logout, setUser };
};

export default useAuth;
