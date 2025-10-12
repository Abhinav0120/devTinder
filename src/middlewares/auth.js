// const adminAuth = (req, res, next) => {
//     console.log('Admin Auth is Getting cheked');
//     let token = "XYZ"
//     const isAdminAuthorized = token === "XYZ"

//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized req");
//     } else {
//         next()
//     }
// }

// const userAuth = (req, res, next) => {
//     console.log('User Auth is Getting cheked');
//     let token = "XYZ"
//     const isUserAuthorized = token === "XYZ"

//     if(!isUserAuthorized){
//         res.status(401).send("Unauthorized req");
//     } else {
//         next()
//     }
// }

// module.exports = {adminAuth, userAuth};