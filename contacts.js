const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) =>
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getList = async () => {
	const result = await fs.readFile(contactsPath);
	return JSON.parse(result);
};
const getContactById = async (id) => {
	const contacts = await getList();
	const contactId = String(id);
	const contactById = contacts.find((contact) => contact.id === contactId);
	return contactById || null;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await getList();
	const contactId = String(contacts.length + 1);
	const newContact = { id: contactId, name, email, phone };
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

const removeContact = async (id) => {
	const contacts = await getList();
	const contactId = String(id);
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
};

module.exports = {
	getList,
	getContactById,
	addContact,
	removeContact,
};
