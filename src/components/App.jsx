import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import styles from '../components/App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`${name}:${number} is already exist!`);
    }
    setContacts(prevState => {
      const id = nanoid();
      const newContact = { name, number, id };
      return [newContact, ...prevState];
    });
  };

  const isDublicate = (name, newNumber) => {
    const nameNormalize = name.toLowerCase();
    const contact = contacts.find(({ name, number }) => {
      return nameNormalize === name.toLowerCase() && number === newNumber;
    });
    return Boolean(contact);
  };

  const removeContact = id => {
    setContacts(prevState => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return [...newContacts];
    });
  };

  const onChangeFilter = e => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterValue = filter.filter;
    const filterLowerCase = filterValue.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(filterLowerCase) ||
        number.includes(filterLowerCase)
      );
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter onChange={onChangeFilter} />
      <Contacts contacts={filteredContacts} removeContact={removeContact} />
    </div>
  );
};

export default App;
