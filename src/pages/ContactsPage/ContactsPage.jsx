import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from '../../components/ContactList/ContactList';
import ContactsForm from '../../components/ContactsForm/ContactsForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts } from '../../redux/contacts/operations';
import { selectLoading, selectError } from '../../redux/contacts/selectors';
import s from './ContactsPage.module.css'

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.page}>
      <h1> Contact book </h1>
      <ContactsForm />
      <SearchBox />
      {loading && !error && <p>Request in progress...</p>}
      <ContactList />
    </div>
  );
};
export default ContactsPage;