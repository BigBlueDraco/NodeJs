import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./db/contacts/index.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;
    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;
    case "remove":
      const removed = await removeContact(id);
      console.log(removed);
      break;
    case "add":
      const added = await addContact(name, email, phone);
      console.log(added);
      break;
    default:
      console.log("Unknowing action");
  }
};

invokeAction(argv);
