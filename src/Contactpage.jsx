import React, { useState } from 'react';
import userimage from './addimage.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
const Contactpage = () => {


    const [inputdata, setData] = useState({ id: '1', imgsrc: '', username: '', email: '', phone: '' });
    const [image, getuserimage] = useState({ img: '', toggle: true });
    const [contactdata, updatedata] = useState([]);
    const [displaycont, updateCont] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isEditelem, setEditelem] = useState(null);
    const d = new Date();
    const getValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...inputdata, [name]: value, imgsrc: image.img, });
    }

    const getimage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            getuserimage({ ...image, img: reader.result, toggle: false });
        };
    }

    const submitcontact = () => {

        if (isEditelem) {
            updatedata(contactdata.map((el) => {
                if (el.id == isEditelem) {
                    return { ...el, username: inputdata.username, email: inputdata.email, phone: inputdata.phone, imgsrc: image.img }
                }
                return el;
            }
            )
            )
            setData({ imgsrc: '', username: '', email: '', phone: '' });
            getuserimage({ ...image, toggle: true })
            setEditelem(null)
        }
        
        else if (inputdata) {
            const ids = d.getTime();
            const arr = [{ ...inputdata, id: ids + 1 }];
            updatedata([...arr, ...contactdata]);
            setData({ imgsrc: '', username: '', email: '', phone: '' });
            getuserimage({ img: '', toggle: true });
        }

        else {
            console.log("error")
        }



    }

    const filtercontact = (id) => {
        const filterarr = contactdata.filter((el) => {
            return el.id == id;
        })
        updateCont(filterarr);
        setToggle(true);
    }


    const Editprofile = (id) => {
        console.log("editprofile");
        const filterarr = contactdata.filter((el) => {
            return el.id == id;
        })
        setData(filterarr[0]);
        getuserimage({ ...image, toggle: false, img: filterarr[0].imgsrc })
        setToggle(false);
        setEditelem(id);
    }

    const getpdf = () => {
        const doc = new jsPDF();
        doc.text("Contact List", 20, 10);
        doc.autoTable({
            columns: [
                { header: 'Username', dataKey: 'username' },
                { header: 'Email', dataKey: 'email' },
                { header: 'Phone', dataKey: 'phone' }
            ],
            body: contactdata
        })
        doc.save('contacts.pdf');
    }

    return (
        <div className='contactpagemain'>
            <div className="exportpdf" onClick={getpdf}> <span>Export pdf</span></div>

            <div className='mainBox'>
                <div className='sec1'>
                    <div className='contactheading'>Contacts</div>
                    <div className='contactlistsec'>
                        {contactdata.map((el) => {
                            return <div className='contactlist' key={el.id} onClick={() => filtercontact(el.id)}>
                                <img src={el.imgsrc} height="50px" width="50px" alt="alt" className='imageclass'></img>
                                <div className='contactname'>{el.username}</div>
                            </div>
                        })}

                    </div>
                    <div className='addcontact' onClick={() => { return setToggle(false), getuserimage({ ...image, toggle: true }), setEditelem(null), setData({ imgsrc: '', username: '', email: '', phone: '' }); }}> +Add</div>
                </div>
                {toggle === true ?
                    <>
                        {displaycont.map((el) => {

                            return <div className='sec1 sec2'>
                                <img src={el.imgsrc} height="220px" width="220px" className='imageclass'></img>
                                <div className='contactdetails'>
                                    <div className='name'>{el.username}</div>
                                    <div className='otherdetailsec'>
                                        <div>Email:</div>
                                        <div>{el.email}</div>
                                    </div>
                                    <div className='otherdetailsec'>
                                        <div>phone:</div>
                                        <div>{el.phone}</div>
                                    </div>
                                </div>
                                <button onClick={() => { Editprofile(el.id) }} className='submitcontact'>EDIT</button>
                            </div>
                        })} </> :
                    <div className='sec1 sec2'>
                        <div className='form' >
                            <div>
                                <label for="pic"><img src={image.toggle ? userimage : image.img} height="200px" width="200px" className='imageclass'></img></label>
                                <input type="file" accept="image/*" id="pic" style={{ display: "none" }} onChange={getimage}></input>
                            </div>
                            <div className='formsection'>
                                <label for="name">Name:</label>
                                <input type="text" id="name" placeholder='enter name' name="username" value={inputdata.username} onChange={getValue}></input></div>
                            <div className='formsection'> <label for="email">Email:</label>
                                <input type="text" id="email" placeholder='enter email' name="email" value={inputdata.email} onChange={getValue}></input></div>
                            <div className='formsection'>
                                <label for="phone">Phone:</label>
                                <input type="text" id="phone" placeholder='enter phone' name="phone" value={inputdata.phone} onChange={getValue}></input></div>
                            <button type='submit' onClick={submitcontact} className='submitcontact'>SUBMIT</button>
                        </div>
                    </div>}
            </div>
        </div>)
};

export default Contactpage;