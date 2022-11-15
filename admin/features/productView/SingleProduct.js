import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { SpinnerLoader } from '../../General'
import { changeApiState, saveBookThunk } from './singleProductSlice';
import { BackButton } from '../../app/App';
const inputtest = /input|textarea/i;
export const EditView = () => {
    const { bookId } = useParams();
    const dispatch=useDispatch()
    const [loader, setLoader] = React.useState(false)
    const [image, setImage] = React.useState({ element: null, filename: null })
    const inventory = useSelector(s => s.inventory.initialInventory)
    const navigate = useNavigate()
    let book = {};
    if (bookId !== 'new') book = inventory.find(v => v._id === bookId);
    const { title, description, quantity,picture, img ,unit_price} = book;
    const [inputs, setInputs] = React.useState({
        title, description, quantity,unit_price
    })
    const apiLoading= useSelector (s=>s.book.apiLoading)
React.useEffect(()=>{
    
    if(apiLoading==='pending')return setLoader(true);
    if(apiLoading!=='fulfilled')return;
    navigate('/static/admin/books')
},[apiLoading])



const onChange = (e) => {
        e.stopPropagation();
        const { target } = e;
        if (target.name === 'picture') return;
        if (!inputtest.test(target.tagName)) return;
        const { name } = target
        setInputs(s => ({ ...s, [name]: target.value }))
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        let url='/api/books/update';
        const {picture}=e.target
        if (bookId == 'new') {
            if (picture && e.target.picture.value === '') {
                url = '/api/books/create'
            }
            else url = '/api/books/create/image'
        } else {
            if (picture && e.target.picture.value === '') {
                url = '/api/books/update'
            } else url = '/api/books/update/image'

        }
        
        const form = new FormData(e.target)
        if(e.target.picture.value === '' && !e.target.picture.files.length){
            form.delete('picture')
        }
        const sendForm = async () => {
            //const headers = { ...authHeader() }
           // const res = await fetch(url, { method: 'post', headers, body: form })
            //const data = await res.json()
            dispatch(saveBookThunk({body:form,url}))
            //setLoader(false)
            /*
            {
                    let title,description,quantity;
            setInputs(s=>({...s,title,description,quantity}))
            setImage()
            }*/
            //navigate('/static/books/catalogue')
        }
        sendForm()
    }
    const onFileSelect = (e) => {
        e.stopPropagation()
        if (e.target.value === '' && !e.target.files.length) {
            return setImage({ element: null, filename: null });
        }
        const file = e.target.files[0];
        if (image.element && image.filename === file.name) return;

        const imgsrc = URL.createObjectURL(file);
        const onLoad = () => {
            URL.revokeObjectURL(imgsrc)
        }
        const img = <img onLoad={onLoad} src={imgsrc} />
        setImage(s => ({ ...s, element: img, filename: file.name }))
    }
    if (loader) return <SpinnerLoader state={'pending'} display='show' />;
    return <>
    <BackButton alone={true} page={-1} />
    <form className='w3-col m7' onSubmit={onFormSubmit}
        encType='multipart/form-data'  >
      {bookId!=='new' ? 
      <input type='hidden' name='id' value={bookId} />:null}
        <fieldset className='w3-container w3-margin'>
            <legend>Title</legend>
            <input required name='title' className='w3-input' style={{ width: '100%' }}
                value={inputs.title || ''}
                onChange={onChange} ></input>
        </fieldset>
        <fieldset className='w3-container w3-margin'>
            <legend>Description</legend>
            <textarea name='description' className='w3-input'
                value={inputs.description || ''}
                onChange={onChange} ></textarea>
        </fieldset>
        <fieldset className='w3-container w3-margin'>
            <legend>Quantity</legend>
            <input required type="number" name='quantity' className='w3-input'
                style={{ width: '100%' }}
                value={inputs.quantity || 0}
                onChange={onChange} ></input>
        </fieldset>
        <fieldset className='w3-container w3-margin'>
            <legend>Price</legend>
            <input required type="number" name='unit_price' className='w3-input'
                step="0.01"
                style={{ width: '100%' }}
                value={inputs.unit_price || 0}
                onChange={onChange} ></input>
            </fieldset>
        {bookId === 'new' && <fieldset className='w3-container w3-margin'>
            <legend>Add file</legend>
            {/*!image.element && img && <div className='w3-container w3-margin item'  >
                <img src={img} />
            </div>*/}
            {image.element && <div className='w3-container w3-margin item'  >
                {image.element}</div>}
            <input onChange={onFileSelect}
                accept='.jpg, .png, image/jpeg, image/png, image/jpg' type="file" name='picture' className='w3-input' style={{ width: '100%' }}  ></input>
        </fieldset>}
        {bookId !== 'new' && <fieldset className='w3-container w3-margin'>
            <legend>Add file</legend>
            {!image.element && picture && <div className='w3-container w3-margin item'  >
                <img src={'/api/images/'+picture} />
            </div>}
            {image.element && <div className='w3-container w3-margin item'  >
                {image.element}</div>}
            <input onChange={onFileSelect}
                accept='.jpg, .png, image/jpeg, image/png, image/jpg' type="file" name='picture' className='w3-input' style={{ width: '100%' }}  ></input>
        </fieldset>}



        <div className='w3-center'>
            <button type='submit' className='w3-btn w3-blue'>Submit</button></div>
    </form>
    </>


}