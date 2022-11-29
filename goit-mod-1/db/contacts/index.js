import * as fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const contactPath = path.join(__dirname, "./contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const id = String(contactId);
  const allContacts = await listContacts();
  const contact = allContacts.find((elem) => elem.id === id);
  return contact || null;
}

async function removeContact(contactId) {
  const id = String(contactId);
  const allContacts = await listContacts();
  const index = allContacts.findIndex((elem) => elem.id === id);
  if (index === -1) {
    return null;
  }
  const removed = allContacts.splice(index, 1);
  fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return removed;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(
    (elem) => elem.email === email || elem.phone === phone
  );
  if (index !== -1) {
    return `Contact with this email or phone alredy exist.`;
  }
  const contact = { id: nanoid(), name, email, phone };
  allContacts.push(contact);
  fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return contact;
}

export { listContacts, getContactById, addContact, removeContact };
