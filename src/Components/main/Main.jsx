import React, { useEffect, useRef, useState } from 'react'
import { FaSave,FaEye,FaEyeSlash,FaCopy,FaRegEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
const Main = () => {
    const [visi,setvisi] = useState(true);
    const [disabled,setdisabled] = useState(true);
    const [pass,setpasss] = useState([])
    const emailRef = useRef(null), urlRef = useRef(null), passwordRef = useRef(null);
    useEffect(() => {
      const savedPasswords = JSON.parse(localStorage.getItem('PasswordCollection'));
      if (savedPasswords) {
          setpasss(savedPasswords);
      }
  }, []);
    const handleSave = () =>{
      if(disabled != true){
        const newEntry = 
            {
                URL : urlRef.current.value,  
                Email : emailRef.current.value, 
                password : passwordRef.current.value
            } 
        const NewPasses = [...pass,newEntry]
        setpasss(NewPasses)
        localStorage.setItem('PasswordCollection',JSON.stringify(NewPasses));
        toast.success('Password saved ✅', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          style: {
            fontFamily: 'Cormorant, Arial, sans-serif', 
          },
          });
        urlRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = ''; 
    }}
    
    const handleDelete =(index)=>{
       const FilteredCollection = pass.filter((_,i)=>i!==index)
      setpasss(FilteredCollection);
      localStorage.setItem('PasswordCollection',JSON.stringify(FilteredCollection));
      toast.success('Password Collection deleted ✅', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: 'Cormorant, Arial, sans-serif', 
        },
        });
    } 
    const TrackInputFields =() =>{
      let input_Fields = {
        URL : urlRef.current.value.trim(),  
        Email : emailRef.current.value.trim(), 
        password : passwordRef.current.value.trim()
      }
      if (!input_Fields.URL || !input_Fields.Email || !input_Fields.password) {
        setdisabled(true)
      }
      else{
        setdisabled(false)
      }
    }

    const handleCopy= (text) =>{
      navigator.clipboard.writeText(text)
      toast.success(`Copied to clipbord ➕`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          fontFamily: 'Cormorant, Arial, sans-serif', 
        },
        
        });
    }

    const handleEdit =(i,item)=>{
      console.log(i,item);
      setpasss(pass.filter((_,index)=>index!==i));
      urlRef.current.value = item.URL;
      emailRef.current.value = item.Email;
      passwordRef.current.value = item.password;
    }
  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
        draggable
      pauseOnHover
      theme="dark"
      style={{position : 'absolute', top: "10px", right: "10px", zIndex: 9999}}
      />
    <div className='pt-10 min-h-[67vh]'>
      <div className="PasswordInput flex justify-center">
        <form action="#" onSubmit={(e)=>{
            e.preventDefault();
            handleSave();}}>
           <input type="text" name='url' ref={urlRef} onChange={TrackInputFields} placeholder='Enter website URL' className='roughtextture max-w-[90vw] w-[100%] p-2 text-white  outline-orange-600 hover:shadow-[0_0_10px_3px_rgba(255,120,0,0.5)] '/>
           <div className='mt-3 flex'>
            <input type="text" name='email' ref={emailRef} onChange={TrackInputFields}  placeholder='username /email-emaple@gmail.com' className='roughtextture min-w-[20vw] p-2 mr-[2vw] text-white outline-orange-600 hover:shadow-[0_0_10px_3px_rgba(255,120,0,0.5)]  '/>
             <div className='flex items-center relative'>
                <input type={visi ? 'password'  : 'text'} ref={passwordRef} onChange={TrackInputFields}  name='password' placeholder='password' className='roughtextture max-w-[35vw] p-2  text-white  outline-orange-600 hover:shadow-[0_0_10px_3px_rgba(255,120,0,0.5)]  '/>
                <button type='button' className='cursor-pointer absolute right-3' onClick={()=>setvisi(!visi)}>{visi ? <FaEye size={20} color='white'/ >: <FaEyeSlash size={20} color='white' /> }</button>
             </div>
           </div>
           <div className='w-full flex justify-center'>
               <button type="submit" className = {`flex hover:shadow-[0_0_10px_3px_rgba(255,120,0,0.5)]  bg-orange-700/80  p-3 gap-2 px-[3vh] mt-[10%] text-white cursor-pointer hover:bg-orange-900 items-center ${disabled?'bg-orange-800':'bg-orange-600'}`}><FaSave size={30} color='white'/>Save</button>
           </div>
        </form>
      </div>
      <div className="showpasswordCollection mt-[2%] flex justify-center mx-5">
            <div className='showmain w-full overflow-x-auto xl:mx-[10%] scrollbar-hide' style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {
               !localStorage.getItem('PasswordCollection') || localStorage.getItem('PasswordCollection') === '[]' ? <div className='roughtextture p-4 md:w-[50%] text-center font-bold text-white m-auto'>No passwords to show 😔 Add new Password</div> 
                : 
              <div className="overflow-x-auto w-full scroll-smooth scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                <table className='text-center min-w-full'>
                  <thead>
                  <tr className='roughtextture text-white align-middle'>
                    <th className='p-2 md:p-4'>Site</th>
                    <th className='p-2 md:p-4'>Username/Email</th>
                    <th className='p-2 md:p-4'>Password</th>
                    <th className='p-2'>Actions</th>
                  </tr>
                  </thead>
                {/* here will be the map function to map the table with the state data */}
                <tbody>  
                {
                  pass.map((item,i)=>(
                    <tr className='align-middle' key={i}>
                      <td className='p-2 bg-orange-100/50 md:text-xl  max-w-[30vw] md:max-w-none truncate relative'><FaCopy width={20} className='cursor-pointer absolute xl:bottom-4 bottom-0' onClick={()=>handleCopy(item.URL)} /><a href={item.URL} className="block truncate">{item.URL}</a></td>
                      <td className='p-2 bg-orange-100/50 md:text-xl  max-w-[25vw] md:max-w-none truncate relative'>{item.Email}<FaCopy width={20} className='cursor-pointer  absolute xl:bottom-4 bottom-0' onClick={()=>handleCopy(item.Email)}/></td>
                      <td className='p-2 bg-orange-100/50 md:text-xl  max-w-[25vw] md:max-w-none truncate relative' >*********<FaCopy width={20} className='cursor-pointer absolute xl:bottom-4 bottom-0' onClick={()=>handleCopy(item.password)}/></td>
                      <td className='p-2 bg-red-400/50 flex justify-center items-center h-[56px] gap-2'><FaRegEdit className='cursor-pointer 'onClick={()=>handleEdit(i,item)}/><button className='cursor-pointer' onClick={()=>handleDelete(i)}> <MdDelete size={20}className='Curosr-pointer' /></button></td>
                    </tr>
                  ))
                }
                </tbody> 
               </table>
              </div>
              }    
            </div>
      </div>
    </div>
    </>
  )
}

export default Main