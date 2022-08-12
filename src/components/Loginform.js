import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
import PopUp from './PopUp';
import axios from "axios";
const Loginform = () => {
    const [date,setDate]=useState(new Date());
    const [isOpen,setIsOpen]=useState(null);
    const [senderaccno, setSenderAccNumber] = useState(null);
    const [senderaccname, setSenderAccName] = useState(null);
    const [senderbalance, setSenderBalance] = useState(null);
    const [overdraft, setOverDraft] = useState('');
    const [recieveraccno, setRecieverAccNumber] = useState(null);
    const [recieveraccname, setRecieverAccName] = useState(null);
    const [recieverbic, setRecieverBic] = useState(null);
    const [recieverinsname, setRecieverInsName] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [transferFee, setTransferFee] = useState(null);
    const [clearBalance,setClearBalance]=useState(null);
    /*const handleTranChange = (event: SelectChangeEvent) => {
        setOverDraft(event.target.value);
      };
      const handleOdChange = (event: SelectChangeEvent) => {
        setOverDraft(event.target.value);
      };
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "senderaccno"){
            setSenderAccNumber(value);
        }
        if(id === "senderaccname"){
            setSenderAccName(value);
        }
        if(id === "senderbalance"){
            setSenderBalance(value);
        }
        if(id === "recieveraccno"){
            setRecieverAccNumber(value);
        }
        if(id === "recieveraccname"){
            setRecieverAccName(value);
        }
        if(id === "recieverbic"){
            setRecieverBic(value);
        }
        if(id === "recieverinsname"){
            setRecieverInsName(value);
        }
        if(id === "amount"){
            setAmount(value);
        }
        if(id === "transferFee"){
            setTransferFee(value);
        }
    }
    const handleSubmit  = () => {
      console.log(`${transferFee},${amount},${senderaccno}`)
    }*/
    const handleinput=(e)=>{
        if(e.target.name==="senderaccno"){
            setSenderAccNumber(e.target.value);
          console.log(senderaccno);
            axios.get("http://localhost:8093/api/v1/internaldata/"+e.target.value)
            .then (response =>{
                const data=response.data;
                console.log(data)
                setSenderAccName(data.senderaccname)
                setSenderBalance(data.senderbalance);
                setOverDraft(data.overdraft)
            })
        }

        const handlerecieverinput=(e)=>{
            if(e.target.name==="recieverbic"){
                setRecieverBic(e.target.value);
              console.log(recieverbic)
                axios.get("http://localhost:8093/api/v1/receiverdata/"+e.target.value)
                .then (response =>{
                    const data=response.data;
                    console.log(data)
                    setRecieverInsName(data.recieverinsname)
                    
                })
            }
            {/*check balance amount to be transfered*/}
            const checkbalance=(e)=>{
                setAmount(e.target.value)
                console.log(amount)
                if(senderbalance<e.target.value*1.0025){
                    if(overdraft==="yes"|| overdraft==="Yes"|| overdraft==="YES"){
                        setTransferFee(e.target.value*0.0025)
                        setClearBalance(senderbalance-(e.target.value*1.0025))
                        document.getElementById("funds").innerHTML = "";
            
                    }
                    else{
                        console.log("No sufficient Balance")
                        setTransferFee("")
                        setClearBalance("")
                        document.getElementById("funds").innerHTML = "no balance!!!!!!!!!";
                    }
            
                }
                else{
                    document.getElementById("funds").innerHTML = "";
                    setTransferFee(e.target.value*0.0025)
                    setClearBalance(senderbalance-e.target.value*1.0025)
            
                }
            }
             
            const checktransfertype=(e)=>{
                let text=e.target.value
                console.log(text)
               if(senderaccname.search("HDFCBANK")>-1)
               {
                   setTransactionType(text)
                   console.log(transactionType)
               
               if(text==="Reciever Account Transfer")
               {
                   document.getElementById("type").innerHTML = "Invalid type";
               
               }
               else{
               
               document.getElementById("type").innerHTML = "";
               
               }
               }
               else
               {
                   setTransactionType(text)
               if(text==="Bank Transfer")
               {
               
               document.getElementById("type").innerHTML = "Invalid type"
               
               }
               else{
                   document.getElementById("type").innerHTML = "";
               }
               }
            }
            const updateDatabase=(e)=>{
                setIsOpen(!isOpen);
                e.preventDefault();
                const clearBalance=clearBalance
                const senderaccname=senderaccname
                const overdraft=overdraft
                const cust={senderaccname,clearBalance,overdraft}
                if(1)
                {
                    axios.put("http://localhost:8093/api/v1/internaldata/"+senderaccno,cust)
                    .then(response =>{
                        console.log(response.data)
                        //alert("transferred successfully")
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
            }

            const togglePopup = () => {
                setIsOpen(!isOpen);
            }
    return (
        
        <div className="form">
        <div className="form-body">
            
                Sender Details:<br/>
                <table align="center" border="0px">
                <tr>
                  <td> <label className="form__label">Sender Account Number</label></td>
                  <td><input  type="text" placeholder="Sender Account Number" name="senderaccno" className="form__input" value={senderaccno} onChange={handleinput}  /></td>
            </tr>

            {/*sender account name*/}
            <tr>
                  <td> <label className="form__label">Sender Account Name</label></td>
                  <td><input type="text" placeholder="Sender Account Name" name="senderaccname" className="form__input" value={senderaccname} onChange={handleinput}  disabled  /></td>
            </tr>

           {/*sender clear balance*/}
           <tr>
                  <td> <label className="form__label">Sender Account Balance</label></td>
                  <td><input type="text" placeholder="Sender Account Balance" name="senderbalance" className="form__input" value={senderbalance} onChange={handleinput}  disabled  /></td>
            </tr>

            {/*Overdraft yes or no */}
           <tr> 
               <td><label className="form__label" >Over Draft</label></td>
                  <td> <input type="text" name="overdraft" className="form__input"  onChange={ (e) => setOverDraft(e.target.value)} value={overdraft} disabled /></td>
                    </tr>
            </table>
            <br/>Reciever Details:<br/>
            <table align="center">

                {/*reciever bic code */}
             <tr><td><label className="form__label">Bic Code</label></td>
           <td> <input type="text" placeholder="Bic Code" name="recieverbic" className="form__input" value={recieverbic} onChange={handlerecieverinput} /></td>
           </tr>

           {/*reciever institution name */}
           <tr><td><label className="form__label">Institution Name</label></td>
           <td> <input type="text" placeholder="Institution Name" name="recieverinsname" className="form__input" value={recieverinsname} onChange={handlerecieverinput} /></td>
           </tr> 
            
            {/*reciever account number */}
            <tr><td><label className="form__label">Reciever Account Number</label></td>
           <td> <input type="text" placeholder="Reciever Account Number" name="recieveraccno" className="form__input" value={recieveraccno} onChange={handlerecieverinput} /></td>
           </tr>

           {/*reciever account name */}
           <tr>
           <td><label className="form__label">Receiver Account Name</label></td>
                                <p align="center" id="sdnlist" style={{color:"red"}}></p>
            <td> <input type="text" placeholder="Enter Receiver Name" name="recieveraccname" className="form__input" value={recieveraccname} /*onChange={checksdnlist}*/ /></td>
           </tr>
            </table>
            <br/>Transaction Type:
            <table align="center">

                {/*transfer type */}
            <tr>
                <td><label className="form__label">Transfer Type</label></td>
                <p id="type" style={{color:"red"}}></p>
                <td><select class="form-select" onChange={checktransfertype}>
                                <option selected disabled hidden> Select Transfer Type</option>
                                <option>Bank Transfer</option>
                                <option>Reciever Account Transfer</option>
                                </select></td>
            </tr>

            {/*message code*/}
            <tr>
            <td><label className="form__label">Message Code</label></td>
            <td><select class="form-select">
                                <option value="" selected disabled hidden> Select Message</option>
                                <option>CHQB - Beneficiary Customer must be paid by cheque only.</option>
                                <option>CORT - Payment is made in settlement for a trade.</option>
                                <option>HOLD - Beneficiary customer or claimant will call upon identification.</option>
                                <option>INTC - Payment between two companies that belongs to the same group.</option>
                                <option>PHOB - Please advise the intermediary institution by phone.</option>
                                <option>PHOI - Please advise the intermediary by phone.</option>
                                <option>PHON - Please advise the account with institution by phone.</option>
                                <option>REPA - Payments has a related e-Payments reference.</option>
                                <option>SDVA - Payment must be executed with same day value to the</option>
                                </select></td>
            </tr>
            {/*Amount */}
            <tr><td><label className="form__label" style={{marginTop:"1rem"}}>Amount to Transfer</label></td>
            <td> <input type="text" placeholder="Enter Amount" name="amount" className="form-control" value={amount} onChange={checkbalance} /></td>
             <p id="funds" style={{color:"red"}}></p>
             </tr>

             {/*Transfer fee*/}
             <tr><label className="control-label col-md-11">Transfer Fee</label>
                                <td><input  
                                    type="text"
                                    name="transferFee"
                                    className="form-control"
                                  //  onChange={ (e) => setTranferFee(e.target.value)}
                                    value={transferFee}
                                    disabled
                                   
                                /></td>
                                </tr>
            <tr>
            <td><label className="form__label">Clear Balance</label></td>
                               <td> <input  
                                    type="text"
                                    name="clearBalance"
                                    className="form-control"
                                    
                                    value={clearBalance}
                                   disabled
                                /></td>
            </tr>
            </table>
        </div>

        <button type="button" align="center" class="btn btn-dark" style={{marginBottom:"5rem"}}onClick={updateDatabase} >Transfer</button>
                            {isOpen && <PopUp
                                    content={<>
                                        <b style={{ marginLeft: "5rem" }}>Transfer Successful</b><br />
                                        <b>Reciever Name:{recieveraccname}</b><br/>
                                        <b>Reciever AccountNumber: {recieveraccno}</b><br/>
                                        <b>Reciever Bank:{recieverinsname}</b><br/>
                                        <b>Transfer Amount:{amount*1.0025}</b><br/>
                                        <b>Remaining balance:{clearBalance}</b><br/>
                                        <button className="btn btn-dark">ok</button><br/>
                                    </>}
                                    handleClose={togglePopup}
                                />}
    </div>
    )
}
    }}
export default Loginform