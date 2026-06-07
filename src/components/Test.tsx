import React, { useState, useEffect } from 'react';

export default function UserProfilePage({ userId, refreshToken }) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBio, setEditedBio] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [likeCount, setLikeCount] = useState({});

    useEffect(() => {

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setEditedName(data.name);
                setEditedBio(data.company?.catchPhrase || '');
            })
            .catch(err => {
                setError(err.message);
            });
    }, [userId]);

    useEffect(() => {
        if (!user) return;

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(res => res.json())
            .then(async (postsData) => {
                setPosts(postsData);

                const allComments = [];
                for (let i = 0; i < postsData.length; i++) {
                    const postCommentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postsData[i].id}/comments`);
                    const postComments = await postCommentsRes.json();
                    allComments.push(...postComments);
                }
                setComments(allComments);

                const initialLikes = {};
                postsData.forEach(post => {
                    initialLikes[post.id] = 0;
                });
                setLikeCount(initialLikes);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [user, userId]);

    // Проблема: setTimeouts без cleanup
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('User viewed profile for 5 seconds');
        }, 5000);

    }, []);

    // Проблема: прямая мутация объекта
    const handleLike = (postId) => {
        likeCount[postId] = (likeCount[postId] || 0) + 1;
        setLikeCount(likeCount);
    };

    const handleSaveProfile = () => {

        const updatedUser = { ...user, name: editedName, bio: editedBio };

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            setUser(updatedUser);
            setIsEditing(false);
        }).catch(err => {
            console.error(err);
        });
    };

    const getAverageCommentsPerPost = () => {
        if (posts.length === 0) return 0;
        return (comments.length / posts.length).toFixed(2);
    };

    const styles = {
        container: { maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' },
        header: { backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px' },
        avatar: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' },
        card: { border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '20px' },
        input: { padding: '8px', margin: '5px 0', width: '100%', boxSizing: 'border-box' },
        button: { backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' },
        error: { color: 'red', padding: '10px', backgroundColor: '#ffeeee' },

    };

    if (loading && !user) {
        return <div style={styles.container}>Loading...</div>;
    }

    if (error) {
        return <div style={{ ...styles.container, ...styles.error }}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>User Profile</h1>
            </div>

            {isEditing ? (
                <div style={styles.card}>
                    <input
                        style={styles.input}
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Name"
                    />
                    <textarea
                        style={styles.input}
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        placeholder="Bio"
                        rows="4"
                    />
                    <button style={styles.button} onClick={handleSaveProfile}>Save</button>
                    <button style={{ ...styles.button, backgroundColor: '#ccc' }} onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div style={styles.card}>
                    <h2>{user?.name}</h2>
                    <p>Email: {user?.email}</p>
                    <p>Bio: {user?.bio || 'No bio yet'}</p>
                    <button style={styles.button} onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}

            {/* Статистика */}
            <div style={styles.card}>
                <h3>Statistics</h3>
                <p>Total posts: {posts.length}</p>
                <p>Total comments: {comments.length}</p>
                <p>Avg comments per post: {getAverageCommentsPerPost()}</p>
                <button onClick={() => setShowComments(!showComments)}>
                    {showComments ? 'Hide' : 'Show'} comments
                </button>
            </div>

            <h3>Posts</h3>
            {posts.map(post => (

                <div style={styles.card}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                    <button onClick={() => handleLike(post.id)}>
                        👍 Like ({likeCount[post.id] || 0})
                    </button>

                    {showComments && (
                        <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <h5>Comments:</h5>
                            {comments
                                .filter(c => c.postId === post.id)
                                .map(comment => (
                                    <div style={{ borderTop: '1px solid #eee', padding: '5px 0' }}>
                                        <strong>{comment.name}</strong>: {comment.body}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            ))}

            <div style={{ fontSize: '12px', color: '#999', marginTop: '30px', borderTop: '1px solid #ccc', padding: '10px' }}>
                <p>Refresh token: {refreshToken}</p>
                <p>Last updated: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
}