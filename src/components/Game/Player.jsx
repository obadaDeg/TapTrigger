import { useState, useRef, useEffect } from 'react';
import { useGameContext } from '../../context/GameContext';
import Button from '../ui/Button';

export default function Player() {
  const nameInputRef = useRef();
  const [inputError, setInputError] = useState('');
  const { playerName, setPlayerName } = useGameContext();
  const [isEditing, setIsEditing] = useState(!playerName);
  
  useEffect(() => {
    if (isEditing) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);
  
  function handleSubmit(event) {
    event.preventDefault();
    
    const enteredValue = nameInputRef.current.value.trim();
    
    if (enteredValue === '') {
      setInputError('Please enter your name');
      return;
    }
    
    if (enteredValue.length < 2) {
      setInputError('Name must be at least 2 characters');
      return;
    }
    
    setPlayerName(enteredValue);
    setInputError('');
    setIsEditing(false);
    nameInputRef.current.value = '';
  }
  
  function handleEdit() {
    setIsEditing(true);
  }
  
  return (
    <section id="player" className="player-section">
      <div className="player-header">
        {!isEditing && playerName ? (
          <>
            <h2>Welcome, <span className="player-name">{playerName}</span>!</h2>
            <Button onClick={handleEdit} className="edit-name-button">
              Change Name
            </Button>
          </>
        ) : (
          <h2>Welcome! Please enter your name</h2>
        )}
      </div>
      
      {isEditing && (
        <form onSubmit={handleSubmit} className="player-form">
          <div className="form-control">
            <input 
              ref={nameInputRef}
              type="text" 
              placeholder="Your name"
              defaultValue={playerName}
            />
            {inputError && <p className="error-text">{inputError}</p>}
          </div>
          <Button type="submit">Set Name</Button>
        </form>
      )}
      
      {!isEditing && playerName && (
        <p className="player-instructions">
          Test your timing skills in the challenges below!
        </p>
      )}
    </section>
  );
}