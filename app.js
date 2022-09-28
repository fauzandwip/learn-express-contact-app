import express from 'express'
import expressLayouts from 'express-ejs-layouts'

const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(expressLayouts)

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
	res.render('about-contact', {
		layout: 'layouts/main-layouts',
		title: 'About Page',
		page: 'About'
	})
})

app.get('/contact', (req, res) => {
	res.render('about-contact', {
		layout: 'layouts/main-layouts',
		title: 'Contact Page',
		page: 'Contact'
	})
})

app.listen(PORT, console.log(`Server started at port ${PORT}`))
