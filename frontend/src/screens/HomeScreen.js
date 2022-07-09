import {useEffect} from 'react'
import { listProducts } from '../actions/productActions';
import {useDispatch,useSelector} from 'react-redux'
import { Heading,Grid } from "@chakra-ui/react";
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from "../components/ProductCard";
const HomeScreen=()=>{
    const dispatch= useDispatch();

    const productList=useSelector((state)=>state.productList);
    const {loading ,products,error}=productList;
    

    useEffect(()=>{
        dispatch(listProducts());
    },[])
    return(
        <>
            <Heading as='h2' mb='8' fontSize='3xl'>
                Latest Products
            </Heading>

            {loading ?(
                <Loader/>
            ):error ?(
                <Message type='error'>{error}</Message>
            ):(
                <Grid templateColumns='1fr 1fr 1fr 1fr' gap='6'>
                {products.map((product)=>(
                    <ProductCard product={product}/>
                ))}

            </Grid>
            )}
        </>
    )
}
export default HomeScreen;