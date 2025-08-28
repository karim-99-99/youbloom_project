import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDataID, fetchUserPosts } from '../../services/fetchData';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, postsData] = await Promise.all([
        fetchDataID(id),
        fetchUserPosts(id)
      ]);
      setUser(userData);
      setPosts(postsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-opacity-50 bg-gray-50">
      {/* Header */}
      <nav className="bg-white  shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <button
              onClick={() => navigate('/main')}
              className="flex items-center text-orange-600 hover:text-orange-700"
            >
              ← Back to Users
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {user && (
            <div className="bg-white bg-opacity-50shadow rounded-lg">
              {/* User Info */}
              <div className="px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h2>
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {user.email}</p>
                      <p><span className="font-medium">Phone:</span> {user.phone}</p>
                      <p><span className="font-medium">Website:</span> {user.website}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Address</h2>
                    <div className="space-y-2">
                      <p>{user.address.street} {user.address.suite}</p>
                      <p>{user.address.city}, {user.address.zipcode}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Company</h2>
                  <p><span className="font-medium">Name:</span> {user.company.name}</p>
                  <p><span className="font-medium">Catchphrase:</span> {user.company.catchPhrase}</p>
                  <p><span className="font-medium">Business:</span> {user.company.bs}</p>
                </div>
              </div>

              {/* User Posts */}
              {posts.length > 0 && (
                <div className="border-t border-gray-200 px-6 py-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h2>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm">{post.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;