import { CardContent, Grid, makeStyles, Card, Avatar, CardHeader } from '@material-ui/core';
import React from 'react';
import * as ProductService from '../Services/ProductListServices';

const styles = makeStyles(them => ({

    root: {
        maxWidth: 350,
        margin:them.spacing(2)
    },
   
    productname: {
        float: 'left',
        fontSize: '20px',
        display: 'inlineblock',
        fontWeight: '400'




    },
    price: {
        paddingLeft:'60px',
        display: 'inlineblock',
        postion:'absolute',
        fontWeight: '400'
        
    },
    avatar: {
        backgroundColor: 'red',
      },
      sectionmedia:{
          width:'100%',
          height:'300px'

      },
      
      

}))


export default function Listofproducts(props) {

    const classes = styles();
    const [products, setProducts] = React.useState(ProductService.getallProducts());


    return (
        <>


            <Grid container >
                {products ? products.map((item) => (
                    <Grid item xs={12} md={6} sc={12} lg={4}>
                        <Card className={classes.root} >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {item.productname.charAt(0).toUpperCase()}
                                   </Avatar>
                                }
                                />
                                <div className={classes.sectionmedia}>
                                    <img src={item.productimage} width="100%" height="100%" alt="loading">

                                    </img>

                                </div>
                               <br />
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.productname}>
                                           <h6> {item.productname}</h6>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6} className={classes.price}>
                                           <h6> {item.price}</h6>
                                            
                                        </Grid>
                                    </Grid>
                                
                            </CardContent>

                        </Card>

                    </Grid>
                )):[]}
                
            </Grid>
           




        </>
    )
}
