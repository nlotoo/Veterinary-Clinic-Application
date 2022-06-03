const { Router } = require("express");
router = Router()

const authService = require('../services/authServices.js')
const profileService = require('../services/profileService.js')
const isAuth = require('../midlleware/isAuth.js')
const auth = require('../midlleware/auth.js')

router.post('/sign-up', async (req, res) => {
    try {
        let data = await authService.CreateUser(req.body)
        res.status(200).json(data);
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
})

router.post('/sing-in', async (req, res) => {

    try {
        let data = await authService.loginUser(req.body)
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: err });
    }

})

router.post('/user-profile', async (req, res) => {

    try {
        console.log(req.body)
        let data = await authService.getUserProfile(req.body)

        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.status(401).json({ message: err })
    }
})


router.post('/create-new-pet', async (req, res) => {

    try {
        let data = await profileService.createPet(req.body)
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ message: err })
    }

})



module.exports = router