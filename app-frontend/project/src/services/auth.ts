const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Temporary mock storage
const mockUsers = new Map();
const mockTokens = new Map();

// Mock API calls until backend is ready
export async function login(email: string, password: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = mockUsers.get(email);
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  const token = crypto.randomUUID();
  mockTokens.set(token, user);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token
  };
}

export async function register(email: string, password: string, name: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (mockUsers.has(email)) {
    throw new Error('Email already registered');
  }

  const user = {
    id: crypto.randomUUID(),
    email,
    password,
    name
  };

  mockUsers.set(email, user);
  const token = crypto.randomUUID();
  mockTokens.set(token, user);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token
  };
}

export async function refreshToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const user = mockTokens.get(token);
  if (!user) {
    localStorage.removeItem('token');
    return null;
  }

  const newToken = crypto.randomUUID();
  mockTokens.set(newToken, user);
  mockTokens.delete(token);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token: newToken
  };
}

// When backend is ready, uncomment and use these real API calls:
/*
export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function register(email: string, password: string, name: string) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}

export async function refreshToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await fetch(`${API_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    localStorage.removeItem('token');
    return null;
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}
*/