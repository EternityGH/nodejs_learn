const express = require('express')

const app = express()

const http = require('http')

const server = http.Server(app)
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const {Settings,Socials} = require('./modal')


server.listen(3000)

app.set('views','./views')
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit:'50mb'}));
app.use(express.static('./public'))

app.get('/',async (req, res)=> {
    const socials = await Socials.find({display : true})
    res.render('user/index',{
        socials
    })

})

app.get('/admin/socials',async (req,res)=>{
    const socials = await Socials.find({})
    res.render('admin/socials/list',{
        adminPage : 'socials',
        data : socials
    })
})

app.get('/admin/socials/add',async (req,res)=>{
    res.render('admin/socials/add',{
        adminPage : 'socials',
    })
})

app.post('/admin/socials/add', async (req,res)=>{
    console.log(req.body);
    const {ordering, target, img, display} = req.body

    const social = new Socials({
        ordering,
        target_url : target,
        img_url : img,
        display : display === 'on' ? true : false
    })

    await social.save()

    res.redirect('/admin/socials/add')
})

app.get('/admin/socials/edit/:id', async (req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.redirect('/admin/socials')
    }
    const social = await Socials.findById(id)
    if(!social){
        return res.redirect('/admin/socials')
    }

    res.render('admin/socials/edit',{
        adminPage : 'socials',
        id,
        data: social
    })
})

app.post('/admin/socials/edit/', async (req,res)=>{
    const {id , ordering, target, img, display} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.redirect('/admin/socials')
    }

    const social = await Socials.findById(id)

    if(!social) {
        return res.redirect('/admin/socials')
    }

    social.ordering = ordering
    social.img_url = img
    social.target_url = target
    social.display = display === 'on' ? true : false

    await social.save()

    res.redirect('/admin/socials/edit/'+id)

})

app.post('/admin/socials/delete', async (req,res)=>{
    const {id} = req.body

    await Socials.findByIdAndDelete(id)

    res.redirect('/admin/socials')
})