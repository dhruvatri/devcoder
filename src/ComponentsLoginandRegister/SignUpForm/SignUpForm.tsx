import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Code} from 'lucide-react';
import { style } from 'framer-motion/client';
import { SignWithGoogle } from '../../components/ui';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError( "Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: '',
      });

      setIsSubmitted(true);
      navigate('/select-role');
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className='signup-page'>
      <header className='signup-header'>
        <div className="header-content">
          <Code className="header-icon" />
          <h1>Code Editor</h1>
        </div>
      </header>
      <div className='signup-container'>
        <div className="signup-form-container">
          <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <label htmlFor='name'>
              Name:
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            
            <label htmlFor='email'>
              Email:
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            
            <label htmlFor='password'>
              Password:
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            
            <label htmlFor='confirmPassword'>
              Confirm Password:
              <input
                type='password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>    
            <button type='submit'>Register</button>
            <p>Already Registered? <Link to="/login">Login</Link></p>
            
            <SignWithGoogle />
            
          </form>
        </div>
      </div>
      <footer className='signup-footer'>
        <p>&copy; 2023 Code Editor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUpForm;