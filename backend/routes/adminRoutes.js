const express = require('express')
const {registerAdmin,authAdmin,  getPending, getDeclined, startProcess, declineProcess, approveProcess, recordList, viewDetails} = require('../controllers/adminControlllers')

const router = express.Router()

router.post('/admin-register',registerAdmin)

router.post('/',authAdmin)
router.get("/getPending", getPending);
router.get("/getunderProcess", getDeclined);
router.patch("/startProcess", startProcess);
router.patch("/decline", declineProcess);
router.patch("/approve", approveProcess);
router.get("/recordList", recordList);
router.get("/viewDetails/:applicationId", viewDetails);
// router.get('/admindashboard',getAllUsers)

// router.delete('/delete',deleteUser)

// router.get('/edit/:userId',getUser)
// router.patch('/edit/:userId', updateUser);



module.exports = router