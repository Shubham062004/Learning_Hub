// Auto-detect the correct API URL based on current port
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to localhost:3000 regardless of frontend port
  return 'http://localhost:3000/api';
};

const API_BASE_URL = getApiUrl();

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
    console.log('🔧 API Client initialized:', this.baseURL);
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      credentials: 'include', // Important for CORS with credentials
      ...options,
    };

    console.log(`🔗 API Request: ${config.method || 'GET'} ${url}`);
    console.log('🔗 Request headers:', config.headers);
    
    try {
      const response = await fetch(url, config);
      
      console.log(`📡 Response status: ${response.status}`);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ 
          message: `HTTP ${response.status}: ${response.statusText}` 
        }));
        console.error(`❌ API Error: ${response.status}`, error);
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API Success: ${config.method || 'GET'} ${url}`);
      return data;
    } catch (error) {
      console.error(`❌ API Request Failed: ${url}`, error);
      throw error;
    }
  }

  // Auth methods  
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response.user;
  }

  async register(userData: any) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    this.setToken(response.token);
    return response.user;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: any) {
    const response = await this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.user;
  }

  // Course methods
  async getCourses(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    const response = await this.request(`/courses${queryString}`);
    return response.courses || response;
  }

  async getCourseById(id: string) {
    return this.request(`/courses/${id}`);
  }

  async getFeaturedCourses() {
    return this.request('/courses/featured');
  }

  async getCategories() {
    return this.request('/courses/categories');
  }

  async enrollInCourse(courseId: string) {
    return this.request(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  // Learning methods
  async getDashboard() {
    return this.request('/learning/dashboard');
  }

  async getAssignments() {
    return this.request('/learning/assignments');
  }

  async getQuizzes() {
    return this.request('/learning/quizzes');
  }

  async getSupportTickets() {
    return this.request('/learning/support/tickets');
  }

  // Admin methods
  async getDashboardStats() {
    return this.request('/admin/dashboard');
  }

  async getUsers() {
    return this.request('/admin/users');
  }

  async getAdminCourses(params?: any) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`/admin/courses${queryString}`);
  }

  // Course management methods
  async createCourse(courseData: any) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id: string, courseData: any) {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id: string) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  logout() {
    this.setToken(null);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
