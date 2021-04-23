import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React from 'react';
import * as ProductServices from '../Services/ProductListServices';
import ConfirmDialog from '../Components/ConfirmDialog';
import Notification from '../Components/Notification';


let defaultvalues = {
    id: 0,
    productname: '',
    price: '',
    productDescription: '',
    productimage: ''


}

const styles = makeStyles((them) => ({
    formInputWidth: {
         paddingTop:them.spacing(2),
         marginTop:them.spacing(2),
        '& .MuiFormControl-root': {
            width: '70%',
            margin: them.spacing(1)
        }
    },
    fontwidth: {
        fontSize: '15px',
        marginLeft: them.spacing(2),
        color: 'black',



    },
    textareawidth: {
        width: '70%',
        height: '60%',
        fontSize: '20px',
        fontWeight: '200',
        color: 'black',
        padding: them.spacing(3),




    },
    input: {
        display: 'none'
    },
    table:{
        minWidth:650,
    },
    margin: {
        margin: them.spacing(1),
      },

}))

export default function Mangeproduct(props) {

    const classes = styles();
    const [selectItem, setSelectItem] = React.useState(defaultvalues);
    const [records,setRecords]=React.useState(ProductServices.getallProducts());
    const [confirmDialog, setConfirmDialog] =React.useState({isOpen:false,title:'',subTitle:''})
    const [notify,setNotify] = React.useState({isOpen:false,message:'',type:''})

    console.log(selectItem.productDescription);

    const handleItem = e => {
        const { name, value } = e.target;
        setSelectItem({
            ...selectItem,
            [name]: value
        })
    }

    

    const handlefile=( e)=>{
        var file  = e.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            
            localStorage.setItem('image', reader.result);
            selectItem.productimage=localStorage.getItem('image');
        });
        reader.readAsDataURL(file);
     
    }

      const handlesubmit=(e)=>{

        if(selectItem.productname && selectItem.price){
            ProductServices.insertProduct(selectItem);
            setRecords(ProductServices.getallProducts());
            setNotify({
                isOpen:true,
                message:'Submitted Sucessfully',
                type:'success'
            })

        }else{
            alert("Plz fill the form for necessary fields")
        }

        e.preventDefault();
      }

      const onDelete= id=>{
          setConfirmDialog({
              ...confirmDialog,
              isOpen:false
          })

          ProductServices.deleteProduct(id);
          setRecords(ProductServices.getallProducts())
          setNotify({
              isOpen:true,
              message:'Deleted Sucessfully',
              type:'error'
          })
      }


    return (
        <>
            <form className={classes.formInputWidth} id='userform' onSubmit={handlesubmit}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <h6  className={classes.fontwidth}>
                            Product Name
            </h6>
                        <TextField
                            label='ProductName'
                            variant='outlined'
                            name='productname'
                            value={selectItem.productname}
                            onChange={handleItem}
                            placeholder='Enter Product name' 
                            autoComplete='off'/>



                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                            Product Price
            </h6>
                        <TextField
                            label='Price'
                            variant='outlined'
                            name='price'
                            value={selectItem.price}
                            onChange={handleItem}
                            placeholder='Enter Price' 
                            autoComplete='off'/>


                    </Grid>
                </Grid>
                <br />
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                            Product Description(optional)
            </h6>
                        <textarea rows="4" cols="50" name="productDescription" form='userform' value={selectItem.productDescription} onChange={handleItem} className={classes.textareawidth} placeholder='Enter description' />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h6  className={classes.fontwidth}>
                            Product Image(optional)
            </h6>

                        <div className="custom-file">
                            <input type="file" class="custom-file-input" id="myfile" onChange={handlefile}  name='productimage' />
                            <label class="custom-file-label">Choose file...</label>
                        </div>

                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Button variant="contained" size="large" color="primary" className={classes.margin} type="submit">
          Add Product
        </Button>
                    </Grid>

                </Grid>
            </form>

            <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records ? records.map((row)=>(
                            <TableRow key={row.id}>
                                <TableCell><img src={row.productimage}  alt="loading" width="50px" height="60px"/></TableCell>
                                <TableCell component="th" scope="row">
                                    {row.productname}
                                </TableCell>
                                <TableCell align="right">{row.productDescription}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right"><button type="button" className="btn btn-link" onClick={()=>{
                                    setConfirmDialog({
                                        isOpen:true,
                                        title:'Are you sure to delete this record?',
                                        subTitle:'You can t undo this operation',
                                        onConfirm:()=>{onDelete(row.id)}
                                    })
                                }}>Remove</button></TableCell>

                            </TableRow>

                        )):[]}
                    </TableBody>
                </Table>
            </TableContainer>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
             confirmDialog={confirmDialog}
             setConfirmDialog={setConfirmDialog}
             />
        </>
    )
}
