const multer=require('multer')

function fileProcessor(){
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })
return upload.single('picture')
}

function textProcessor(){
    const upload=multer()
    return upload.none()
}
exports.formMultipartFile=fileProcessor()
exports.formMultipartText=textProcessor()
