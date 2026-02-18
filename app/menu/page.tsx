'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import '../page.css';

export default function MenuPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userId = searchParams?.get('userId');
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        // Fetch user info for display
        fetch('/api/users')
            .then((r) => r.json())
            .then((list) => {
                const u = list.find(
                    (x: any) => String(x.id) === String(userId),
                );
                if (u) setUserName(u.name);
            })
            .catch((e) => console.error(e));
    }, [userId]);

    if (!userId) {
        return (
            <main className='home-container'>
                <div className='content-wrapper'>
                    <h2>No user selected</h2>
                    <p>Please go back and choose a user.</p>
                </div>
            </main>
        );
    }

    return (
        <main className='home-container'>
            <div className='content-wrapper'>
                <div className='header'>
                    <h1>Welcome{userName ? `, ${userName}` : ''}.</h1>
                    <p className='subtitle'>Choose an action</p>
                </div>
                {/* testing git */}
                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        flexDirection: 'column',
                    }}
                >
                    <button
                        onClick={() => router.push(`/user/${userId}/entry`)}
                        className='add-user-button'
                    >
                        New Measurement Entry
                    </button>

                    <button
                        onClick={() => router.push(`/user/${userId}/graph`)}
                        className='submit-button'
                    >
                        View Progression Graph
                    </button>

                    <button
                        onClick={() => router.push('/')}
                        className='cancel-button'
                    >
                        Back to start
                    </button>
                </div>
            </div>
        </main>
    );
}
