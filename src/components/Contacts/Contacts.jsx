import propTypes from 'prop-types';
import styles from '../Contacts/Contacts.module.css';

export default function Contacts({ contacts, removeContact }) {
  const contactItem = contacts.map(({ name, number, id }) => {
    return (
      <li className={styles.listItem} key={id}>
        {name}: {number}
        <button
          className={styles.button}
          type="button"
          onClick={() => removeContact(id)}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <div className={styles.contacts}>
      <ol className={styles.contactsList}>{contactItem}</ol>
    </div>
  );
}

Contacts.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      number: propTypes.string,
      id: propTypes.string,
    })
  ),
  removeContact: propTypes.func,
};
