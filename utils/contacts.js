import fs from 'fs'

// const checkData = () => {
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath)
}

const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
	fs.writeFileSync(dataPath, '[]', 'utf-8')
}
// }

const saveContact = (data) => {
	fs.writeFileSync('data/contacts.json', JSON.stringify(data))
}

const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf-8')
	const contacts = JSON.parse(file)
	return contacts
}

let contacts = loadContact()

const findContact = (name) => {
	const contact = contacts.find(
		(contact) => contact.name.toLowerCase() === name.toLowerCase()
	)
	return contact
}

const addContact = (data) => {
	contacts.push(data)
	saveContact(contacts)
}

const editContact = (data) => {
	let contact = findContact(data.oldName)
	const index = contacts.indexOf(contact)

	contact = data
	delete contact.oldName

	contacts[index] = contact
	saveContact(contacts)
}

const deleteContact = (name) => {
	const newContacts = contacts.filter((contact) => contact.name !== name)
	saveContact(newContacts)
}

export { loadContact, findContact, addContact, deleteContact, editContact }
