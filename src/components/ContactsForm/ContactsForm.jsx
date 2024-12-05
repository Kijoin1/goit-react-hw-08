import { Field, Form, Formik } from 'formik';
import s from './ContactsForm.module.css';
import { useDispatch } from 'react-redux';
import { addContactsThunk } from '../../redux/contacts/operations';

const ContactsForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values, options) => {
    dispatch(addContactsThunk(values));
    options.resetForm();
  };
  return (
    <div>
      <Formik initialValues={{ name: '', number: '' }} onSubmit={onSubmit}>
        <Form className={s.form}>
          <Field
            className={s.input}
            name="name"
            placeholder="Enter new contact"
            required
          />
          <Field
            className={s.input}
            name="number"
            placeholder="Enter contact's number"
            required
          />
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactsForm;