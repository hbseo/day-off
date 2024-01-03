import { fetchUserData } from '@/lib/data';
import { fetchTypeData } from '@/lib/off/data';
import CreateForm from './create-form';

const Form = async () => {
  const users = await fetchUserData();
  const types = fetchTypeData();
  return <CreateForm users={users} types={types} />;
};

export default Form;
