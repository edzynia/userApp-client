import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateUser } from '../redux/userSlice';
import { fetchUserIfNotCached } from '../utils/userCache';
import InputField from '../UI/InputField';
import FormWrapper from '../UI/FormWrapper';
import FormButton from '../UI/FormButton';
import Modal from '../UI/Modal';
import SuccessModal from '../UI/SuccessModal';
import {
  validateForm,
  emailValidation,
  requiredField,
} from '../utils/validationUtils';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  const [formData, setFormData] = useState({
    fullName: '',
    shortName: '',
    streetName: '',
    postalCode: '',
    city: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUserIfNotCached(parseInt(id, 10), dispatch);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!currentUser) {
      console.warn('User profile not found in state.');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const userData = {
        fullName: currentUser.name,
        shortName: currentUser.username,
        streetName: currentUser.address.street,
        postalCode: currentUser.address.zipcode,
        city: currentUser.address.city,
        email: currentUser.email,
        phone: currentUser.phone,
      };
      setFormData(userData);
    }
  }, [currentUser]);

  // Removing token when we go back to list
  useEffect(() => {
    return () => {
      localStorage.removeItem('token');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateProfileForm = () => {
    const validationErrors = validateForm(formData, {
      email: emailValidation,
      fullName: requiredField,
      shortName: requiredField,
      streetName: requiredField,
      postalCode: requiredField,
      city: requiredField,
      phone: requiredField,
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateProfileForm()) {
      setIsModalOpen(true);
    }
  };

  const handleModalConfirm = () => {
    if (currentUser) {
      dispatch(
        updateUser({
          id: currentUser.id,
          name: formData.fullName,
          username: formData.shortName,
          email: formData.email,
          phone: formData.phone,
          website: currentUser.website || 'N/A',
          address: {
            street: formData.streetName,
            city: formData.city,
            zipcode: formData.postalCode,
            suite: currentUser.address.suite || 'N/A',
            geo: currentUser.address.geo || { lat: '0', lng: '0' },
          },
          company: currentUser.company || {
            name: 'N/A',
            catchPhrase: 'N/A',
            bs: 'N/A',
          },
        }),
      )
        .unwrap()
        .then(() => {
          setShowSuccessModal(true);
          setIsModalOpen(false);
        })
        .catch(() => {
          setErrors({ form: 'Failed to update user.' });
          setIsModalOpen(false);
        });
    }
  };

  const handleModalCancel = () => {
    if (currentUser) {
      const userData = {
        fullName: currentUser.name,
        shortName: currentUser.username,
        streetName: currentUser.address.street,
        postalCode: currentUser.address.zipcode,
        city: currentUser.address.city,
        email: currentUser.email,
        phone: currentUser.phone,
      };
      setFormData(userData); // Reset form data to last saved state
    }
    setIsModalOpen(false);
  };

  return (
    <div className='min-h-screen flex justify-center items-start'>
      <div className='w-full max-w-4xl'>
        {loading && <div>Loading user data...</div>}
        {error && <div className='text-red-500'>{error}</div>}
        {!loading && !error && currentUser && (
          <FormWrapper title='Edit your profile' onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <InputField
                key={key}
                label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                name={key}
                type='text'
                value={formData[key as keyof typeof formData] || ''}
                onChange={handleInputChange}
                placeholder={`Enter ${key}`}
                error={errors[key] || ''}
              />
            ))}
            {errors.form && (
              <div className='text-red-500 mt-2 text-sm text-left pr-4'>
                {errors.form}
              </div>
            )}
            <FormButton label='Save changes' />
          </FormWrapper>
        )}
      </div>

      {isModalOpen && (
        <Modal
          title='Confirm Changes'
          content='Are you sure you want to save these changes?'
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          confirmText='Yes'
          cancelText='No'
        />
      )}

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

export default UserProfile;
