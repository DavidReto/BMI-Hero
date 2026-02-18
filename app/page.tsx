'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import UserSelector from '@/components/UserSelector';
import './page.css';

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchParams = useSearchParams();
    const forcedNew = searchParams?.get('new') === '1';

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <main className='home-container'>
            <div className='content-wrapper'>
                <div className='header'>
                    <h1>BMI-Hero</h1>
                    <p className='subtitle'>Body Fat Percentage Calculator</p>
                </div>

                <UserSelector
                    users={users}
                    onUserAdded={fetchUsers}
                    forcedNewMode={forcedNew}
                />
            </div>
        </main>
    );
}
