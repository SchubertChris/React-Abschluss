import React, { useState } from 'react';
import '../styles/Login.scss';

const InputField = ({ type, placeholder, required, value, onChange, error }) => (
  <div className="input-field">
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className={error ? 'input-error' : ''}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(true); // Wechselt zwischen Login & Registrierung
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (isRegistering) {
      if (!formData.firstName) newErrors.firstName = 'Vorname ist erforderlich';
      if (!formData.lastName) newErrors.lastName = 'Nachname ist erforderlich';
      if (!formData.email) newErrors.email = 'E-Mail ist erforderlich';
      if (!formData.password) newErrors.password = 'Passwort ist erforderlich';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
    } else {
      if (!formData.email) newErrors.email = 'E-Mail ist erforderlich';
      if (!formData.password) newErrors.password = 'Passwort ist erforderlich';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setIsSubmitting(true);
      console.log(isRegistering ? 'Registrierung erfolgreich' : 'Login erfolgreich', formData);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="Image-Container">
      <div className="Kontakt-Form-Text">
        <h1>{isRegistering ? 'Noch keinen Account?' : 'Willkommen zurück!'}</h1>
        <p>{isRegistering ? 'Registriere dich jetzt für exklusive Angebote!' : 'Melde dich mit deinen Zugangsdaten an.'}</p>
        <h2>{isRegistering ? 'Hast du bereits einen Account?' : 'Keinen Account?'}</h2>
        <p>{isRegistering ? 'Falls ja, dann klicke' : 'Dann registriere dich'} </p>
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'hier zum Login' : 'hier zur Registrierung'}
        </button>
      </div>

      <div className="Login-Container">
        <form className="Kontakt-Form" onSubmit={handleSubmit}>
          <h2>{isRegistering ? 'Registrieren' : 'Anmelden'}</h2>

          {isRegistering && (
            <>
              <InputField
                type="text"
                placeholder="Vorname"
                required
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
                error={errors.firstName}
              />
              <InputField
                type="text"
                placeholder="Nachname"
                required
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
                error={errors.lastName}
              />
            </>
          )}

          <InputField
            type="email"
            placeholder="E-Mail"
            required
            value={formData.email}
            onChange={handleChange}
            name="email"
            error={errors.email}
          />

          <InputField
            type="password"
            placeholder="Passwort"
            required
            value={formData.password}
            onChange={handleChange}
            name="password"
            error={errors.password}
          />

          {isRegistering && (
            <InputField
              type="password"
              placeholder="Passwort bestätigen"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              error={errors.confirmPassword}
            />
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (isRegistering ? 'Registrieren...' : 'Einloggen...') : isRegistering ? 'Registrieren' : 'Einloggen'}
          </button>
        </form>
      </div>
    </div>
  );
}
