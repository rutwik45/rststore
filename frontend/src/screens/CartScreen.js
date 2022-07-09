import { useParams,useSearchParams,useNavigate,Link as RouterLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Flex,
Text,
Grid,
Heading,
Box,
Image,
Link,
Select,
Button,
Icon, } from "@chakra-ui/react";
import {IoTrashBinSharp} from 'react-icons/io5'
import Message from "../components/Message";
import { addToCart,removeFromCart } from "../actions/cartAction";


const CartScreen=()=>{
    const dispatch=useDispatch()
    const [searchParams]=useSearchParams();
    const navigate=useNavigate()
    const {id:productId}=useParams();

    let qty=searchParams.get('qty');
    const cart=useSelector((state)=>state.cart);
    const {cartItems}=cart;

    const orderDetails=useSelector((state)=>state.orderDetails)
    const {order,loading,error}=orderDetails;


    useEffect(()=>{
        if (productId){
            dispatch(addToCart(+qty,productId));
        }
        
    },[dispatch,productId,qty,order]);

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    const checkoutHandler=()=>{
        navigate(`/login?redirect=/shipping`)
    }
    return(
        <Grid>
            <Box>
                <Heading mb='8'>Shopping Cart</Heading>
                <Flex>
                    {cartItems.length===0 ?(
                        <Message>Your Cart is Empty 
                            <Link as={RouterLink} to='/'>Go Back</Link>
                        </Message>
                    ):(
                        <Grid templateColumns='4fr 2fr' gap='10' w='full'>
                            <Flex direction='column'>
                                {cartItems.map((item)=>(
                                    <Grid 
                                    key={item.product}
                                    size='100%'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    borderBottom='1px'
                                    borderColor='gray.100'
                                    py='4'
                                    px='2'
                                    rounded='lg'
                                    _hover={{bgColor:'gray.50'}}
                                    templateColumns='1fr 4fr 2fr 2fr 2fr'>
                                        <Image src={item.image}
                                        alt={item.name}
                                        borderRadius='lg'
                                        height='14'
                                        width='14'
                                        objectFit='cover'>

                                        </Image>
                                        <Text fontWeight='semibold' fontSize='lg'>
                                            <Link as={RouterLink} to={`/product/${item.product}`}>{item.name}</Link>
                                        </Text>

                                        <Text fontWeight='semibold' fontSize='lg'>
                                            {item.price}
                                        </Text>

                                        <Select value={item.qty}
                                        onChange={(e)=>
                                        dispatch(addToCart(+e.target.value,item.product))}
                                        width='20'>
                                            {[...Array(item.countInStock).keys()].map((i)=>(
                                                <option key={i+1} value={i+1}>
                                                    {i+1}
                                                </option>
                                            ))}
                                        </Select>

                                        <Button type='button'
                                        colorScheme='red'
                                        onClick={()=> removeFromCartHandler(item.product)}>
                                            <Icon as={IoTrashBinSharp}></Icon>
                                        </Button>

                                    </Grid>
                                ))}
                            </Flex>
                            <Flex direction='column'
                            border='1px'
                            borderWidth='2'
                            rounded='md'
                            padding='5'
                            height='48'
                            justifyContent='space-between'>
                                <Flex direction='column'>
                                    <Heading as='h2' fontSize='2xl' mb='2'>
                                        Subtotal(
                                            {cartItems.reduce((acc,currVal)=>acc + currVal.qty,0)} items)
                                    </Heading>
                                    <Text 
                                    fontWeight='bold'
                                    fontSize='2xl'
                                    color='black'
                                    mb='4'>
                                        {cartItems.reduce((acc,currVal)=>acc+currVal.qty*currVal.price,0)}

                                    </Text>
                                    <Button type='button'
                                    disabled={cartItems.length===0}
                                    size='lg'
                                    colorScheme='teal'
                                    bgColor='gray.600'
                                    onClick={checkoutHandler}
                                    >
                                        proceed to checkout

                                    </Button>
                                </Flex>

                            </Flex>

                        </Grid>
                    )}
                </Flex>
            </Box>

        </Grid>
    )
}
export default CartScreen