import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import morgan from 'morgan'

const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(expressLayouts)

// built-in middleware
app.use(express.static('public'))

// third party middleware
app.use(morgan('dev'))

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
	res.render('contact', {
		layout: 'layouts/main-layouts',
		title: 'Contact Page'
	})
})

app.listen(PORT, console.log(`Server started at port ${PORT}`))
