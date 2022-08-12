import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import 'bootstrap/dist/css/bootstrap.min.css';
const Loginform = () => {
    const [date,setDate]=useState(new Date());
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
                setAccountHolderName(data.senderaccname)
                setBalanceAmount(data.senderbalance);
                setOverDraft(data.overdraft)
            })
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
            <tr><td> <label className="form__label" for="overdraft">OverDraft</label></td>
            <td>
           {/* <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>*/}
           <NativeSelect inputProps={{name: 'overdraft', id: 'uncontrolled-native' }} onChange={handleOdChange}>
    <option value={'yes'}>Yes</option>
    <option value={'no'}>No</option>
  </NativeSelect></td>
            </tr>
            </table>
            <br/>Reciever Details:<br/>
            <table align="center">
              <tr>
                <td><label className="form__label" for="recieveraccno">Account Number</label></td>
               <td> <input  type="text" id="recieveraccno" value={recieveraccno}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Acc Number"/></td>
                </tr>
            <tr>
               <td> <label className="form__label" for="recieveraccname">Account Name</label></td>
               <td> <input  type="text" id="recieveraccname" value={recieveraccname}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Acc Name"/></td>
            </tr>
            <tr>
               <td> <label className="form__label" for="recieverbic">Bic Code</label></td>
               <td> <input  type="text" id="recieverbic" value={recieveraccname}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Bic"/></td>
            </tr>
            <tr>
               <td> <label className="form__label" for="recieverinsname">Bic Institute Name</label></td>
               <td> <input  type="text" id="recieverinsname" value={recieverinsname}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Institute Name"/></td>
            </tr>
            </table>
            <br/>Transaction Type:
            <table align="center">
                <tr><td> <label className="form__label" for="transaction">Transfer Type</label></td>
                    <td>
                    <NativeSelect inputProps={{name: 'transactionType', id: 'uncontrolled-native' }} onChange={handleTranChange}>
    <option value={'customer_transfer'}>Customer Transfer</option>
    <option value={'bank_transfer'}>Bank Transfer</option>
  </NativeSelect>
                    </td>
                </tr>
                <tr>
                <td> <label className="form__label" for="amount">Amount</label></td>
                <td><input type="number" value={amount} onChange={(e) => handleInputChange(e)} id="amount"></input></td>
                </tr>
                <tr>
                <td> <label className="form__label" for="transferFee">Transfer Fee</label></td>
                <td><p name="transferFee" type="number" value={transferFee} onChange={handleInputChange}>{transferFee}</p></td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <button onClick={handleSubmit} type="submit" class="btn btn-primary">Transfer</button>
        </div>
    </div>
    )
}

export default Loginform
