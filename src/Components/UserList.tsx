import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import UserField from './UserField';
import { fetchUsers } from '../redux/userSlice';
import { User } from '../types/interfaces';
import Modal from '../UI/Modal';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    // Clean local storage
    localStorage.removeItem('currentUser');
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    // Move to login
    navigate('/login');
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='min-h-screen pt-12 flex justify-center items-start'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-4xl p-6'>
        <h1 className='text-3xl text-gray-700 font-bold text-center mb-6'>
          User List
        </h1>
        <div className='space-y-4'>
          {loading && <div>Loading...</div>}
          {error && <div className='text-red-500'>{error}</div>}
          {users.map((user: User) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className='cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-4 shadow-sm border border-gray-200'
            >
              <UserField
                name={user.name}
                email={user.email}
                city={`${user.address.street}, ${user.address.city}`}
              />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedUser && (
        <Modal
          title='User Action'
          content={`You selected ${selectedUser.name}: ${selectedUser.email}. Proceed to login?`}
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          confirmText='Yes'
          cancelText='No'
        />
      )}
    </div>
  );
};

export default UserList;
