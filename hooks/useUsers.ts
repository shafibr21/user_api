import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};


async function fetchUserById(id: string | number): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export function useUser(id?: string | number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: ['user', String(id)],
    enabled: id != null && String(id).trim().length > 0,
    queryFn: async () => {
      // 1) Try to serve from the users list cache
      const list = qc.getQueryData<User[]>(['users']);
      const cached = list?.find(u => String(u.id) === String(id));
      if (cached) return cached;

      // 2) Fall back to fetching by id
      return fetchUserById(id as string | number);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export const useFilteredUsers = (searchTerm: string) => {
  const { data: users, ...query } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!users) {
      setFilteredUsers([]);
      return;
    }

    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  return {
    ...query,
    data: filteredUsers,
    totalUsers: users?.length || 0
  };
};