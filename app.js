import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import { detailContact, loadContact } from './utils/contacts.js'

const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))

app.get('/', (req, res) => {
	const mahasiswa = [
		{
			nama: 'sandhika',
			email: 'sandhika@gmail.com'
		},
		{
			nama: 'erika',
			email: 'erika@gmail.com'
		},
		{
			nama: 'rani',
			email: 'rani@gmail.com'
		}
	]

	res.render('index', {
		layout: 'layouts/main-layouts',
		title: 'Home Page',
		mahasiswa
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'layouts/main-layouts',
		title: 'About Page'
	})
})

app.get('/contact', (req, res) => {
	const contacts = loadContact()

	res.render('contact', {
		layout: 'layouts/main-layouts',
		title: 'Contact Page',
		contacts
	})
})

app.get('/contact/:name', (req, res) => {
	const contact = detailContact(req.params.name)

	res.render('detail', {
		layout: 'layouts/main-layouts',
		title: 'Detail Contact Page',
		contact
	})
})

app.listen(PORT, console.log(`Server started at port ${PORT}`))
