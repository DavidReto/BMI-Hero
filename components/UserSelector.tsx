'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './UserSelector.css';

interface User {
    id: number;
    name: string;
}

interface UserSelectorProps {
    users: User[];
    onUserAdded: () => void;
    forcedNewMode?: boolean;
}

export default function UserSelector({
    users,
    onUserAdded,
    forcedNewMode = false,
}: UserSelectorProps) {
    const router = useRouter();
    const [showAddForm, setShowAddForm] = useState(Boolean(forcedNewMode));
    const [newUserName, setNewUserName] = useState('');
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const hasUsers = users.length > 0;

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserName.trim()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newUserName.trim() }),
            });

            if (response.ok) {
                const created = await response.json();
                setNewUserName('');
                setShowAddForm(false);
                onUserAdded();
                // Navigate to the menu for the newly created user
                router.push(`/menu?userId=${created.id}`);
            } else {
                const err = await response.json().catch(() => null);
                alert(err?.error || 'Error creating user. Please try again.');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error creating user.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectUser = (userId: number) => {
        setSelectedUserID(userId);
        // Navigate to the menu for the selected user
        router.push(`/menu?userId=${userId}`);
    };

    const handleOpenAddForm = () => {
        // If there are existing users, push the query that shows the "new user" focused page
        if (users.length > 0 && !forcedNewMode) {
            router.replace('?new=1');
            return;
        }

        setShowAddForm(true);
        setSelectedUserID(null);
    };

    useEffect(() => {
        if (forcedNewMode) setShowAddForm(true);
    }, [forcedNewMode]);

    if (!hasUsers) {
        return (
            <div className='user-selector new-user-mode'>
                <div className='selector-content'>
                    <h2 className='selector-title'>
                        Create your profile to begin tracking!
                    </h2>
                    <p className='selector-label'></p>

                    {!showAddForm ? (
                        <button
                            className='add-user-button add-user-square'
                            onClick={handleOpenAddForm}
                        >
                            <span className='plus-sign'>+</span>
                        </button>
                    ) : (
                        <form
                            onSubmit={handleAddUser}
                            className='add-user-form'
                        >
                            <input
                                type='text'
                                placeholder='Insert your name'
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                autoFocus
                            />
                            <div className='form-buttons'>
                                <button
                                    type='submit'
                                    className='submit-button'
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create'}
                                </button>
                                <button
                                    type='button'
                                    className='cancel-button'
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewUserName('');
                                    }}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='user-selector existing-users-mode'>
            <div className='selector-content'>
                <h2 className='selector-title'>Welcome back!</h2>
                <p className='selector-label'>
                    Select one of the already existing users
                </p>

                <div className='user-selection'>
                    <select
                        value={selectedUserID || ''}
                        onChange={(e) =>
                            handleSelectUser(Number(e.target.value))
                        }
                        className='user-dropdown'
                    >
                        <option value=''>-- Select a user --</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='add-user-button add-user-wide'
                    onClick={handleOpenAddForm}
                >
                    <span className='plus-sign'>+</span>
                    <span>Add New Profile</span>
                </button>

                {showAddForm && (
                    <form onSubmit={handleAddUser} className='add-user-form'>
                        <input
                            type='text'
                            placeholder='Insert name for new profile'
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            autoFocus
                        />
                        <div className='form-buttons'>
                            <button
                                type='submit'
                                className='submit-button'
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create'}
                            </button>
                            <button
                                type='button'
                                className='cancel-button'
                                onClick={() => {
                                    setShowAddForm(false);
                                    setNewUserName('');
                                }}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
