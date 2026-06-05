import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();

        const interval = setInterval(() => {
            console.log('Polling for updates...');
        }, 5000);

    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = [...users];

        if (searchTerm) {
            result = result.filter(user =>
                user.name.includes(searchTerm) ||
                user.email.includes(searchTerm)
            );
        }

        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredUsers(result);
        setCurrentPage(1);
    }, [users, searchTerm, sortConfig]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const openUserModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(formData)

            });

            if (response.ok) {
                await fetchUsers();
                setFormData({ name: '', email: '', role: '' });
                addNotification('User created successfully!', 'success');
            }
        } catch (err) {
            addNotification('Error creating user', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        searchInput: {
            padding: '8px 12px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '250px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
        },
        th: {
            border: '1px solid #ddd',
            padding: '12px',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: '#f4f4f4'
        },
        td: {
            border: '1px solid #ddd',
            padding: '12px'
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999
        }
    };


    return (
        <div style={styles.container}>

            <div style={styles.header}>
                <h1>User Dashboard</h1>
                <button
                    style={styles.button}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                    Toggle Theme
                </button>
                <button
                    style={styles.button}
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    Notifications ({notifications.length})
                </button>
            </div>


            {showNotifications && (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                    <h3>Notifications</h3>
                    {notifications.map(notification => (
                        <div style={{
                            padding: '5px',
                            margin: '5px 0',
                            backgroundColor: notification.type === 'error' ? '#ffebee' : '#e8f5e9'
                        }}>
                            {notification.message} {/* Нет key! */}
                        </div>
                    ))}
                </div>
            )}


            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={styles.searchInput}
                />

                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.searchInput}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={styles.searchInput}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        style={styles.searchInput}
                    />
                    <button type="submit" style={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add User'}
                    </button>
                </form>
            </div>


            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}

            {!loading && !error && (
                <>
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th style={styles.th} onClick={() => handleSort('id')}>
                                ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th style={styles.th} onClick={() => handleSort('name')}>
                                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th style={styles.th} onClick={() => handleSort('email')}>
                                Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                            </th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map(user => (
                            <tr key={user.id}>
                                <td style={styles.td}>{user.id}</td>
                                <td style={styles.td}>{user.name}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, backgroundColor: '#28a745' }}
                                        onClick={() => openUserModal(user)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {currentItems.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                    No users found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>


                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={styles.button}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={styles.button}
                        >
                            Next
                        </button>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            style={styles.searchInput}
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                        </select>
                    </div>
                </>
            )}


            {isModalOpen && selectedUser && (
                <>
                    <div style={styles.overlay} onClick={closeModal} />
                    <div style={styles.modal}>
                        <h2>User Details</h2>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p><strong>Website:</strong> {selectedUser.website}</p>
                        <button onClick={closeModal} style={styles.button}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDashboard;