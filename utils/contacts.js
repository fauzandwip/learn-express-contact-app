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

const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf-8')
	const contacts = JSON.parse(file)
	return contacts
}

const detailContact = (name) => {
	const contacts = loadContact()
	const contact = contacts.find(
		(contact) => contact.name.toLowerCase() === name.toLowerCase()
	)
	return contact
}

export { loadContact, detailContact }
