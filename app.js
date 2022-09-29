import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import {
	addContact,
	deleteContact,
	editContact,
	findContact,
	loadContact
} from './utils/contacts.js'
import { body, check, validationResult } from 'express-validator'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'

const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// configuration
app.use(cookieParser('secret'))
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
)
app.use(flash())

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

app.get('/contacts', (req, res) => {
	const contacts = loadContact()

	res.render('contacts', {
		layout: 'layouts/main-layouts',
		title: 'Contacts Page',
		contacts,
		msg: req.flash('msg')
	})
})

app.post(
	'/contacts',
	[
		body('name').custom((value) => {
			const duplicate = findContact(value)
			return duplicate ? Promise.reject('Name already in use!') : true
		}),
		check('email', 'Invalid Email!').isEmail(),
		check('noHP', 'Invalid Number Phone!').isMobilePhone('id-ID')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.render('add-contact', {
				title: 'Form Add Contact',
				layout: 'layouts/main-layouts',
				errors: errors.array()
			})
		} else {
			addContact(req.body)

			// send flash message
			req.flash('msg', 'Contact data successfully added!')
			res.redirect('/contacts')
		}
	}
)

app.get('/contacts/add', (req, res) => {
	res.render('add-contact', {
		layout: 'layouts/main-layouts',
		title: 'Add Contact Form'
	})
})

app.get('/contacts/edit/:name', (req, res) => {
	const contact = findContact(req.params.name)

	res.render('edit-contact', {
		layout: 'layouts/main-layouts',
		title: 'Contact Data Editing Form',
		contact
	})
})

app.post(
	'/contacts/update',
	[
		body('name').custom((value, { req }) => {
			const duplicate = findContact(value)
			return value.toLowerCase() !== req.body.oldName.toLowerCase() && duplicate
				? Promise.reject('Name already in use!')
				: true
		}),
		check('email', 'Invalid Email!').isEmail(),
		check('noHP', 'Invalid Number Phone!').isMobilePhone('id-ID')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.render('edit-contact', {
				title: 'Contact Data Editing Form',
				layout: 'layouts/main-layouts',
				errors: errors.array(),
				contact: req.body
			})
		} else {
			const data = {
				oldName: req.body.oldName,
				name: req.body.name,
				email: req.body.email,
				noHP: req.body.noHP
			}
			console.log(data)

			editContact(data)
			req.flash('msg', 'Contact data successfully edited!')
			res.redirect('/contacts')
		}
	}
)

app.get('/contacts/delete/:name', (req, res) => {
	const contact = findContact(req.params.name)
	if (!contact) {
		res.status(404)
		res.send('<h1>404 NOT FOUND</h1>')
	} else {
		deleteContact(req.params.name)
		req.flash('msg', 'Contact data successfully deleted!')
		res.redirect('/contacts')
	}
})

app.get('/contacts/:name', (req, res) => {
	const contact = findContact(req.params.name)

	res.render('detail', {
		layout: 'layouts/main-layouts',
		title: 'Detail Contact Page',
		contact
	})
})

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`))
