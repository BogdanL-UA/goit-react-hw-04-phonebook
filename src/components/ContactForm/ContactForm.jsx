import { useState } from 'react';
import propTypes from 'prop-types';
import styles from '../ContactForm/ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [constact, setContact] = useState({
    name: '',
    number: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setContact(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(constact);

    setContact({ name: '', number: '' });
  };

  const { name, number } = constact;

  return (
    <div className={styles.phonebook}>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Name</label>
          <input
            onChange={onChange}
            className={styles.input}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Number</label>
          <input
            onChange={onChange}
            className={styles.input}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.button}>Add contact</button>
      </form>
    </div>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: propTypes.func,
};
